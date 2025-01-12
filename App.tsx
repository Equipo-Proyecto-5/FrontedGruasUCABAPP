import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const requestUserPermission = async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status: ', authStatus);
    }
    return enabled;
  };

  useEffect(() => {
    const initializeMessaging = async () => {
      if (await requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => {
            console.log('FCM Token:', token);
          });
      } else {
        console.log('Permission not granted');
      }

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification
            );
          }
        });

      // Handle notification opened in the background
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log('Message handled in the background:', remoteMessage);
        }
      );

      const unsubscribe = messaging().onMessage(
        async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          Alert.alert(
            'A new FCM message arrived!',
            JSON.stringify(remoteMessage)
          );
        }
      );

      return unsubscribe;
    };

    const unsubscribe = initializeMessaging();

    return () => {
      unsubscribe.then((unsub) => unsub && unsub());
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pantalla de inicio prueba</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;