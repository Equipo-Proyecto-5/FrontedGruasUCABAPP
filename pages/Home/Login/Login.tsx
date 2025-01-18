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
import { Link } from 'expo-router';
import { useRouter} from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';


function Login () {

  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId, setVehiculoId, setUsername } = useAuth();

  const handleLogin = async () => {
    try {
      const requestBody = { userName, password };
      const response = await fetch('http://ec2-3-143-211-2.us-east-2.compute.amazonaws.com:5230/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
       console.log(response)
       if (response.status === 403)
        {
          router.push({
          pathname: '/changepassword',
          params: { username: userName }, // Paso del parámetro
        });
        }

      if (response.ok) {
        const data = await response.json();
        if (data.role==="Conductor"){
        const responseAdicional = await fetch(`http://ec2-18-219-26-230.us-east-2.compute.amazonaws.com:5163/api/Usuario/Conductor/${userName}`);  // Reemplaza con la URL de tu API
        const dataAdicional = await responseAdicional.json();
      //Setear Contexto y redirigir a la pag principal
        setUserId(dataAdicional.id);
        setVehiculoId(dataAdicional.idGrua);
        setUsername(data.username);
        router.push('/tabs');
      }
      } else {
        console.log("error")
        
      Alert.alert('Error', 'Credenciales invalidas');
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
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      
      <Link href="/resetpassword">  {/* Enlace hacia la ruta de "reset-password" */}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </Link>

     
      <View >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
