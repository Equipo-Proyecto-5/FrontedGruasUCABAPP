import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "../../pages/Home/HomeScreen/HomeScreen";


export default function homescreen() {
    
        return (
            <HomeScreen />
        );
    
}


const style = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }});