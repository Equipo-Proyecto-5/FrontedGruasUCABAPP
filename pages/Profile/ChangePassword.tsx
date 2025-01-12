import logo from '../../assets/LogoUcab-removebg-preview.png';
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
import { useAuth } from '../../contexts/AuthContext';




function ChangePassword() {
      const { username} = useAuth();
      const [newPassword, setNewPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      

//Funcion fech para llamar al ms de keycloack y cabiar la clave
    const handleChangePassword = async () => {
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
      try {
        const response = await fetch(`http://192.168.0.106:5230/api/auth/${username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            newPassword
          ),
        });
  
        if (response.ok) {
          Alert.alert('Éxito', 'Contraseña cambiada correctamente');
          
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Ocurrió un error');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo conectar con el servidor');
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
        <Text style={styles.title}>Cambio de Contraseña</Text>
  
       
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#aaa"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>
  
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
       
  
       
        <View >
          <TouchableOpacity style={styles.button}   onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>
       
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 210,
    },
    image: {
      width: 200,
      height: 150,
      marginBottom: 10,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
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
    forgotPassword: {
      textAlign: 'right',
      color: '#047857',
      marginBottom: 40,
    },
    button: {
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

  export default ChangePassword;