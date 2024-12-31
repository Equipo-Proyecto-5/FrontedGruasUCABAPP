import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Link } from 'expo-router';
import logo from '../../assets/LogoUcab-removebg-preview.png';

export default function HomeScreen() {
  const [redirecting, setRedirecting] = useState(false);
  const scale = new Animated.Value(0); // Valor inicial de la animación (escala 0)
  const translateX = new Animated.Value(-500); // Comienza a la izquierda

  useEffect(() => {

    // Iniciar la animación de zoom in cuando el componente se monta
    // Animación de deslizamiento
  Animated.timing(translateX, {
    toValue: 0, // Mover a la posición final
    duration: 1500,
    useNativeDriver: true,
  }).start();



    // Redirigir después de 3 segundos (3000ms)
    const timer = setTimeout(() => {
      setRedirecting(true); // Cambiar estado a true para mostrar el Link
    }, 6000);

    // Limpiar el timer cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [translateX]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a nuestra app</Text>
     {/* Aplicar la animación de deslizamiento a la imagen */}
     <Animated.Image
        source={logo}
        style={[styles.image, { transform: [{ translateX }] }]} // Aplica el movimiento
      />
      
      {/* El enlace se muestra después de 6 segundos, pero la imagen permanece visible */}
      <View>
        {redirecting && (
          <Link href="/login">
            <Text style={styles.redirectText}>Ir al login</Text>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 230,
  },
  redirectText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
  },
});
