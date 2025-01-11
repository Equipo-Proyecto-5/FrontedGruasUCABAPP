import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from "../../pages/Profile/Profile";
import ChangePassword from "../../pages/Profile/ChangePassword";
	

const Stack = createNativeStackNavigator();


export default function profile() {
    return (
            <Stack.Navigator id={undefined}>
                <Stack.Screen name="Profile" component={Profile} /> 
                <Stack.Screen name="ChangePassword" component={ChangePassword} />                     
            </Stack.Navigator> 
                     
                    );
}


const style = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }});