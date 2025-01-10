import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OrderCancelled() {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  // Llamada a la API para obtener los datos
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await fetch('http://192.168.0.106:5101/OrdenCancelada/bde722ee-f160-4d8e-88ea-c4eaf738bcf7'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();
        setCancelledOrders(data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al obtener órdenes canceladas:', error);
      }
    };

    fetchCancelledOrders();
  }, []); // El array vacío asegura que la petición se haga solo una vez al cargar el componente

  const renderItem = (item) => (
    <View key={item.id} style={styles.item}>
      <View>
        <Text style={styles.itemText}>{item.numeroFactura}</Text>
        <Text style={styles.descriptionText}>Direccion Origen: {item.direccionOrigen}</Text>
        <Text style={styles.descriptionText}>Direccion Destino: {item.direcionDestino}</Text>
        <Text style={styles.itemText}>Status: {item.estatus}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.topSection}>
        <View style={styles.diagonal} />
      </View>
      <View style={styles.bottomSection}>
        {cancelledOrders.length > 0 ? (
          cancelledOrders.map(renderItem)
        ) : (
          <Text style={styles.loadingText}>Cargando órdenes canceladas...</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  topSection: {
    height: height / 2,
    backgroundColor: 'white'
  },
  diagonal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgb(11, 243, 165)',
    transform: [{ rotate: '53deg' }],
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'transparent', 
    paddingHorizontal: 20,
    marginTop: -300,
  },
  item: {
    backgroundColor: 'red', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionText: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});
