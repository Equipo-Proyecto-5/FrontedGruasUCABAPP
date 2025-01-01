import { View, Text, StyleSheet } from "react-native";


export default function homescreen() {
    return (
        <View style={style.container}>
            <Text>Home Screen</Text>
        </View>
    );
}


const style = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }});