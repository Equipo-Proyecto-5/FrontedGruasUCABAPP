import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

export default function OrderDetailFinish({ route, navigation }) {
  const { id } = route.params;

  // Estados para los datos, la carga y los errores
  const [orderDetail, setOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los datos
    const fetchOrderDetail = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://ec2-3-145-25-111.us-east-2.compute.amazonaws.com:5101/Orden/${id}`);//probar
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la orden.');
        }
        const data = await response.json();
        setOrderDetail(data);
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  // Mostrar indicador de carga
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Cargando detalles de la orden...</Text>
      </View>
    );
  }

  // Mostrar mensaje de error si ocurre algún problema
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Ocurrió un error: {error}</Text>
      </View>
    );
  }

  // Renderizar la vista si los datos están disponibles
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
        <Text style={styles.label}>Dirección Origen:</Text>
        <Text style={styles.value}>{orderDetail.direccionOrigen}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Dirección Destino:</Text>
        <Text style={styles.value}>{orderDetail.direccionDestino}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, styles.status]}>{orderDetail.estatus}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Datos del Vehículo Remolcado:</Text>
        <Text style={styles.value}>{orderDetail.datosVehiculo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Monto Pagado:</Text>
        <Text style={styles.value}>{orderDetail.total}$</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Costo Adicional (Total):</Text>
        <Text style={styles.value}>{orderDetail.totalCostoAdicional}$</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Detalle de Incidente:</Text>
        <Text style={styles.value}>{orderDetail.detallesIncidente}</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
