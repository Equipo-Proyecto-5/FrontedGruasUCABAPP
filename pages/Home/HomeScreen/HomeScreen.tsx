import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../../contexts/AuthContext';

const HomeScreen = () => {
  const { userId } = useAuth();
  const [order, setOrder] = useState(null);
  const [acceptedOrder, setAcceptedOrder] = useState(null); // Orden aceptada
  const [inProgressOrder, setInProgressOrder] = useState(null); // Orden en progreso

  const [loading, setLoading] = useState(true);

  // Fetch order on component mount
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://192.168.0.106:5101/OrdenVigente/${userId}`);
        const text = await response.text();
        console.log(text); // Debug: log response
        const data = JSON.parse(text);
        if (data.estatus==="PorAceptar")
        {
          setOrder(data);
          console.log("1");
        } 
        if (data.estatus==="Aceptado")
          {
            setAcceptedOrder(data);
            console.log("2")
          }
          if (data.estatus==="Localizado")
            {
              setInProgressOrder(data);
              console.log("3")
            }  
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleAccept = async () => {
    if (!order) return;

    try {
      await fetch(`http://192.168.0.106:5101/status/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("Actualizar"),
      });

      setAcceptedOrder(order);
      setOrder(null); // Remove the order after accepting
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleReject = async () => {
    if (!order) return;

    try {
      await fetch(`http://192.168.0.106:5101/status/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("Reasignar"),
      });

      setOrder(null); // Remove the order after rejecting
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };
  const handleLocalize = async () => {
    if (!acceptedOrder) return;

    try {
      await fetch(`http://192.168.0.106:5101/status/${acceptedOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("Actualizar"),
      });

    setInProgressOrder(acceptedOrder);
    setAcceptedOrder(null); // Remove the order after accepting
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#56ab2f" />
        <Text style={styles.loadingText}>Cargando orden...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header estilizado */}
      <LinearGradient
        colors={['#0bf3a5', '#56ab2f']}
        style={styles.header}
      >
        <Text style={styles.headerText}>¡Bienvenido, User 1!</Text>
      </LinearGradient>

      {/* Orden disponible */}
      {order ? (
        <>
          <Text style={styles.sectionTitle}>Orden Disponible:</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Origen: {order.direccionOrigen}</Text>
            <Text style={styles.cardText}>Destino: {order.direccionDestino}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={handleAccept}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={handleReject}
              >
                <Text style={styles.buttonText}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.noOrdersText}>No hay órdenes disponibles Por Aceptar</Text>
      )}

      {/* Orden aceptada */}
      {acceptedOrder && (
        <>
          <Text style={styles.sectionTitle}>Orden Aceptada:</Text>
          <View style={[styles.card, styles.acceptedCard]}>
            <Text style={styles.cardText}>Origen: {acceptedOrder.direccionOrigen}</Text>
            <Text style={styles.cardText}>Destino: {acceptedOrder.direccionDestino}</Text>
            <Text style={styles.cardTextinfo}>
              {inProgressOrder ? 'Vehículo localizado' : 'Presione cuando tenga localizado el vehículo'}
            </Text>
            {!inProgressOrder && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={handleLocalize}
                >
                  <Text style={styles.buttonText}>Localizada</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}

      {/* Orden en progreso */}
      {inProgressOrder && (
        <>
          <Text style={styles.sectionTitle}>Orden en Progreso:</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Origen: {inProgressOrder.direccionOrigen}</Text>
            <Text style={styles.cardText}>Destino: {inProgressOrder.direccionDestino}</Text>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
            >
              <Text style={styles.buttonText}>Confirmar Orden en Proceso</Text>
            </TouchableOpacity>
          </View>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#56ab2f',
  },
});

export default HomeScreen;
