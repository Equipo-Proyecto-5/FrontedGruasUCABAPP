import { View, Text, StyleSheet } from "react-native";


export default function order() {
    return (
        <View style={style.container}>
            <Text>Order</Text>
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