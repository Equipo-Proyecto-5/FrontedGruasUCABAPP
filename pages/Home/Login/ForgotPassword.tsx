import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import logo from '../../../assets/LogoUcab-removebg-preview.png';


function ForgotPassword() {
    return (
        <View style={styles.container}>
             {/* Imagen superior */}
      <Image
        source={logo}
        style={styles.image}
      />

       {/* Título */}
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.Subtitle}>Introduzca su Usuario</Text>
      
            {/* Campo de Email */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 200,
        height: 150,
        marginBottom: 20,
      },
      
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
      },
      Subtitle: {
        fontSize: 20,
        marginBottom: 20,
        alignItems: 'center',
      },
      inputContainer: {
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        width: 300,
      },
});

export default ForgotPassword;