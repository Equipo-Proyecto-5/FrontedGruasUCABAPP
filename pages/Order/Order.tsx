import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function Order({ navigation }) {
  const { vehiculoId } = useAuth();
  const [activeTab, setActiveTab] = useState('Activas');
  const [orders, setOrders] = useState([]);  // Estado para almacenar las órdenes
  const [loading, setLoading] = useState(true);  // Estado para controlar el loading

  

  // Llamada a la API para obtener las órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://ec2-3-145-25-111.us-east-2.compute.amazonaws.com:5101/OrdenesResumen/${vehiculoId}`);  // Reemplaza con la URL de tu API
        const data = await response.json();
        setOrders(data);  
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchOrders();
  }, []);  
  const sortedData = orders.sort((a, b) => {
    if (a.estatus === 'EnProceso') return -1;
    if (b.estatus === 'EnProceso') return 1;
    return 0;
  });

  const renderItem = (item) => (
    <TouchableOpacity key={item.id} style={[styles.item, item.estatus === 'EnProceso' && styles.enProcesoItem]}
      onPress={() => {
        if (item.estatus === 'Finalizado' || item.estatus==='Pagado') {
          navigation.navigate('OrderDetailFinish', { id: item.id });
        } else if (item.estatus==='Aceptado'||item.estatus==='Localizado'|| item.estatus==='EnProceso') {
          navigation.navigate('OrderDetail', { id: item.id });
        }
      }} >
      <View>
         <Text style={styles.cardTitle}>N.ORDEN  {item.numeroFactura}</Text>
        <Text style={[styles.itemText, item.estatus === 'EnProceso' && styles.enProcesoTextTitle]}>Denunciante: {item.denunciante}</Text>
        <Text style={[styles.descriptionText, item.estatus === 'EnProceso' && styles.enProcesoText]}>Direccion Origen: {item.direccionOrigen}</Text>
        <Text style={[styles.descriptionText, item.estatus === 'EnProceso' && styles.enProcesoText]}>Direccion Destino: {item.direccionDestino}</Text>
        <Text style={[styles.itemText, item.estatus === 'EnProceso' && styles.enProcesoTextTitle]}>Estatus: {item.estatus}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.topSection}>
        <View />
      </View>
      <View style={styles.bottomSection}>
        {loading ? (
          <Text style={styles.placeholderText}>Cargando órdenes...</Text>  // Mensaje mientras carga
        ) : activeTab === 'Activas' && orders.length > 0 ? (
          <View>
            {sortedData.map(renderItem)}
          </View>
        ) : (
          <Text style={styles.placeholderText}>No hay órdenes realizadas</Text>
        )}
      </View>
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={[styles.floatingButton, activeTab === 'Realizadas' && styles.activeFloatingButton]}
          onPress={() => navigation.navigate('OrderCancelled')}
        >
          <Text style={styles.floatingButtonText}>Canceladas</Text>
        </TouchableOpacity>
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
    paddingBottom: 125,
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
    backgroundColor: 'rgb(111, 120, 135)',
    transform: [{ rotate: '-53deg' }],
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'transparent', 
    paddingHorizontal: 20,
    marginTop: -300,
  },
  item: {
    backgroundColor: 'rgba(55, 65, 81, 1)', 
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
  enProcesoItem: {
    backgroundColor: '#047857', 
  },
  enProcesoText: {
    fontSize: 15,
    color: 'white',
  },
  enProcesoTextTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholderText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
  floatingButtons: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 190,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 3,
  },
  floatingButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  activeFloatingButton: {
    backgroundColor: '#374151',
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cardTitle: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '900',
    color: 'rgb(169, 188, 219)',
    marginVertical: 10,
  },
});
