import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function OrderDetailFinish({ navigation }) {
  // Datos estáticos de ejemplo
  const orderDetail = {
    denunciante: "Juan Perez",
    fecha: "01/01/2025",
    direccion: "Plaza Venezuela, Caracas",
    status: "Finalizada",
    vehiculo: "Toyota Corolla, Blanco, 2015",
    montoPagado: "$150",
    costoAdicional: "$20",
    detalleIncidente: "El vehículo estaba estacionado en una zona prohibida y fue remolcado por las autoridades.",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalle de Orden Finalizada</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Denunciante:</Text>
        <Text style={styles.value}>{orderDetail.denunciante}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{orderDetail.fecha}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{orderDetail.direccion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, styles.status]}>{orderDetail.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Datos del Vehículo Remolcado:</Text>
        <Text style={styles.value}>{orderDetail.vehiculo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Monto Pagado:</Text>
        <Text style={styles.value}>{orderDetail.montoPagado}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Costo Adicional (Total):</Text>
        <Text style={styles.value}>{orderDetail.costoAdicional}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Detalle de Incidente:</Text>
        <Text style={styles.value}>{orderDetail.detalleIncidente}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingBottom: 125,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  status: {
    color: '#28a745', // Verde para status "Finalizada"
    fontWeight: 'bold',
  },
});
