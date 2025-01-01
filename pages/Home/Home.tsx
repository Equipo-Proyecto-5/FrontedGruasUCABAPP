import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import logo from '../../assets/LogoUcab-removebg-preview.png';

export default function HomeScreen() {
  const router = useRouter();
  const translateX = new Animated.Value(-500); // Animación de la imagen (slide-in)
  const fadeAnim = new Animated.Value(0); // Animación de opacidad del texto
  const translateY = new Animated.Value(20); // Animación de movimiento del texto (slide-up)

  useEffect(() => {
    // Iniciar animaciones
    Animated.parallel([
      // Animación de deslizamiento de la imagen
      Animated.timing(translateX, {
        toValue: 0, // Mover a la posición final
        duration: 1500,
        useNativeDriver: true,
      }),
      // Animación de las letras (fade-in y slide-up)
      Animated.timing(fadeAnim, {
        toValue: 1, // Aumentar opacidad
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Mover a su posición original
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirigir después de 6 segundos (6000ms)
    const timer = setTimeout(() => {
      router.push('/login'); // Navegar al login
    }, 6000);

    // Limpiar el timer cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Texto animado */}
      <Animated.Text
        style={[
          styles.title,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        Bienvenido a nuestra app
      </Animated.Text>
      {/* Imagen animada */}
      <Animated.Image
        source={logo}
        style={[styles.image, { transform: [{ translateX }] }]} // Aplica el movimiento
      />
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
    color: '#047857',
  },
  image: {
    width: 300,
    height: 230,
  },
});
