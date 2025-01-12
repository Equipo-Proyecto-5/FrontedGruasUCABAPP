import React, { useEffect } from "react";
import Home from "../pages/Home/Home";
import messaging from '@react-native-firebase/messaging';
import { Alert } from "react-native";

export default function index() {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    };

    const setupNotifications = async () => {
      // Solicitar permisos para notificaciones
      await requestUserPermission();


      // Manejar notificaciones mientras la app está abierta
      const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
        Alert.alert("Nueva notificación", remoteMessage.notification?.body || "Mensaje recibido");
      });

      return unsubscribeOnMessage;
    };

    // Llamar a la configuración de notificaciones
    const unsubscribe = setupNotifications();

    // Limpiar los listeners al desmontar el componente
    return () => {
      unsubscribe.then((unsub) => unsub && unsub());
    };
  }, []);

  return <Home />;
}