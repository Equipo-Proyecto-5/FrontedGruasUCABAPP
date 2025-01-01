import { View, Text, StyleSheet } from "react-native";


export default function profile() {
    return (
        <View style={style.container}>
            <Text>Profile</Text>
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