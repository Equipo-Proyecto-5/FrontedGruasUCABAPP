import {Slot, Stack} from "expo-router";
import React from 'react';
import {SafeAreaView, View, StyleSheet } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
    <SafeAreaView style={styles.container}>
    <Slot />
    </SafeAreaView>
    </AuthProvider>

    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white", // Asegúrate de que el fondo sea visible
    },
  });