import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const HomeScreen = () => {
  const [orders, setOrders] = useState([
    { id: 1, origen: 'Calle 123, Ciudad A', destino: 'Av. 456, Ciudad B' },
    { id: 2, origen: 'Calle 789, Ciudad C', destino: 'Av. 101, Ciudad D' },
  ]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);

  const handleAccept = (order) => {
    setAcceptedOrders([...acceptedOrders, order]);
    setOrders(orders.filter((o) => o.id !== order.id));
  };

  const handleLocalize = (order) => {
    setInProgressOrders([...inProgressOrders, order]);
  };

  const handleReject = (orderId) => {
    setOrders(orders.filter((o) => o.id !== orderId));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header estilizado */}
      <LinearGradient
        colors={['#0bf3a5', '#56ab2f']} // Degradado de verde
        style={styles.header}
      >
        <Text style={styles.headerText}>¡Bienvenido, User 1!</Text>
      </LinearGradient>

      
        {/* Órdenes disponibles */}
        <Text style={styles.sectionTitle}>Órdenes Disponibles:</Text>
        {orders.length > 0 ? (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <Text style={styles.cardText}>Origen: {order.origen}</Text>
              <Text style={styles.cardText}>Destino: {order.destino}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={() => handleAccept(order)}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.rejectButton]}
                  onPress={() => handleReject(order.id)}
                >
                  <Text style={styles.buttonText}>Rechazar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No hay órdenes por aceptar</Text>
        )}

        {/* Órdenes aceptadas */}
        {acceptedOrders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Órdenes Aceptadas:</Text>
            {acceptedOrders.map((order) => (
              <View key={order.id} style={[styles.card, styles.acceptedCard]}>
                <Text style={styles.cardText}>Origen: {order.origen}</Text>
                <Text style={styles.cardText}>Destino: {order.destino}</Text>
                <Text style={styles.cardTextinfo}>
                  {inProgressOrders.some((o) => o.id === order.id)
                    ? 'Vehículo localizado'
                    : 'Presione cuando tenga localizado el vehículo'}
                </Text>
                {!inProgressOrders.some((o) => o.id === order.id) && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.acceptButton]}
                      onPress={() => handleLocalize(order)}
                    >
                      <Text style={styles.buttonText}>Localizada</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </>
        )}

        {/* Órdenes en proceso */}
        {inProgressOrders.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Órdenes en Proceso:</Text>
            {inProgressOrders.map((order) => (
              <View key={order.id} style={styles.card}>
                <Text style={styles.cardText}>Origen: {order.origen}</Text>
                <Text style={styles.cardText}>Destino: {order.destino}</Text>
                <TouchableOpacity
                      style={[styles.button, styles.acceptButton]}
                      //onPress={() => handleLocalize(order)}
                    >
                      <Text style={styles.buttonText}>Confirmar Orden en Proceso</Text>
                    </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 125, // Ajusta este valor según sea necesario
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  acceptedCard: {
    shadowColor: 'green', // Sombra verde para órdenes aceptadas
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 8,
    elevation: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardTextinfo: {
    fontSize: 12,
    paddingVertical: 5,
    textAlign: 'center',
    color: '#6b7280', // Agrega el color que desees
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
    marginVertical: 20,
  },
});

export default HomeScreen;