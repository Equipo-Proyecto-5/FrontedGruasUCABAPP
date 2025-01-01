import {Slot, Stack} from "expo-router";
import React from 'react';
import {SafeAreaView, View, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
    <Slot />
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white", // Asegúrate de que el fondo sea visible
    },
  });