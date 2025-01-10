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
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';



function Login () {

  const router = useRouter();
  const { setUserId } = useAuth();

  const navigateToTabs = async () => {
    const response = await fakeLogin(); // Reemplaza con tu lógica real de login
    const userId = response.id; // Supongamos que el login devuelve un id único
    
    setUserId(userId); 
    router.push('/tabs'); // Cambia la ruta al destino deseado
  };
   
// Simula una respuesta de login
const fakeLogin = async () => {
  return new Promise<{ id: string }>((resolve) => {
    setTimeout(() => resolve({ id: 'bde722ee-f160-4d8e-88ea-c4eaf738bcf7' }), 1000);
  });}



  return (
    <View style={styles.container}>
      {/* Imagen superior */}
      <Image
        source={logo}
        style={styles.image}
      />

      {/* Título */}
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      </View>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
      </View>

      
      <Link href="/resetpassword">  {/* Enlace hacia la ruta de "reset-password" */}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </Link>

     
      <View >
        <TouchableOpacity style={styles.button} onPress={navigateToTabs}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Enlace para registrarse */}
      <View style={styles.signUpContainer}>
        <Text>Don’t you have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
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
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#047857',
    fontWeight: 'bold',
  },
});

export default Login;
