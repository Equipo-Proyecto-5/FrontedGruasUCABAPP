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


function Login () {
   

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

      {/* Campo de Contraseña */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
      </View>

      {/* Botón de "Olvidé mi contraseña" */}
      <Link href="/resetpassword">  {/* Enlace hacia la ruta de "reset-password" */}
     {/* <TouchableOpacity>*/}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      {/* </TouchableOpacity>*/}
    </Link>

      {/* Botón de Login */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

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
