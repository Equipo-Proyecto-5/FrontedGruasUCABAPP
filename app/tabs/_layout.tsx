import react from 'react';
import { Tabs } from 'expo-router';
import { MyTabBar } from '../../components/TabBar';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="index" tabBar={props => <MyTabBar {...props} />}>
        <Tabs.Screen name="order" options={{ title: 'Order', headerShown: false }} />
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Tabs>
  );
}