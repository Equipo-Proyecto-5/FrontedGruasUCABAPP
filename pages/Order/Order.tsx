import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';


const { width, height } = Dimensions.get('window');

const testData = [
  { id: '1', name: 'Denunciante: Juan Perez', lugar: 'Plaza Venezuela ...', status: 'Finalizada'  },
  { id: '2', name: 'Denunciante: Maria Ibarra', lugar: 'Las Mercedes ...', status: 'Finalizada' },
  { id: '3', name: 'Denunciante: Diego Scaloni', lugar: 'Acarigua ...', status: 'En Proceso' },
  { id: '4', name: 'Denunciante: Omar Velez', lugar: 'Aragua ...', status: 'Finalizada'  },
  { id: '5', name: 'Denunciante: Pedro Sanches', lugar: 'El Paraiso ...', status: 'Finalizada'},
  { id: '6', name: 'Denunciante: Manuel Figueroa', lugar: 'Montalban ...', status: 'Finalizada'},
  { id: '7', name: 'Denunciante: Juan Perez', lugar: 'China ...', status: 'Finalizada'},
  { id: '8', name: 'Denunciante: Juan Perez', lugar: 'Chacao ...', status: 'Finalizada'},
];

export default function Order({ navigation }) {

 

  const [activeTab, setActiveTab] = useState('Activas');

  const sortedData = testData.sort((a, b) => {
    if (a.status === 'En Proceso') return -1;
    if (b.status === 'En Proceso') return 1;
    return 0;
  });

  const renderItem = (item) => (
    <TouchableOpacity key={item.id} style={[
      styles.item, 
      item.status === 'En Proceso' && styles.enProcesoItem
    ]}
    onPress={() => {
      if (item.status === 'Finalizada') {
        navigation.navigate('OrderDetailFinish', { id: item.id });
      } else {
        navigation.navigate('OrderDetail', { id: item.id });
      }
    }} >
      <View>
        <Text style={[
          styles.itemText, 
          item.status === 'En Proceso' && styles.enProcesoText
        ]}>{item.name}</Text>
        <Text style={[
          styles.descriptionText,
          item.status === 'En Proceso' && styles.enProcesoText
        ]}>Direccion: {item.lugar}</Text>
        <Text style={[
          styles.itemText, 
          item.status === 'En Proceso' && styles.enProcesoText
        ]}>Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.topSection}>
        <View style={styles.diagonal} />
      </View>
      <View style={styles.bottomSection}>
        {activeTab === 'Activas' ? (
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
    backgroundColor: 'rgb(191, 228, 216)', 
  },
  enProcesoText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
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
});
