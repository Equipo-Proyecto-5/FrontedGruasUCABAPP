import React,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import logo from '../../../assets/LogoUcab-removebg-preview.png';


function ForgotPassword() {

  const [email, setEmail] = useState('');
  const handleForgotPaasword = async () => {
   try {
     // Cuerpo de la solicitud
     const requestBody = { email };
     // Solicitud POST
     const response = await fetch('http://192.168.0.106:5230/api/auth/password-reset', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(requestBody.email),
     });
      console.log(response)
     if (response.ok) {
       const data = await response.json();
     } else {
       console.log("error")
       
      Alert.alert('Error', 'Invalid email or password');
     }
   } catch (error) {
     console.error(error);
     Alert.alert('Error', 'Ha ocurrido un error, ingrese más tarde');
   }
 };
  












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
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View >
                    <TouchableOpacity style={styles.button} onPress={handleForgotPaasword} >
                      <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
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
      },button: {
        backgroundColor: '#047857',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: 300,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default ForgotPassword;