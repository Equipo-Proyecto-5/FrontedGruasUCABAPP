import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

const cancelledOrders = [
  { id: '1', name: 'Denunciante: Juan Perez', lugar: 'Plaza Venezuela ...', status: 'Cancelada' },
  { id: '2', name: 'Denunciante: Maria Ibarra', lugar: 'Las Mercedes ...', status: 'Cancelada' },
  // Agrega más órdenes canceladas aquí
];

export default function OrderCancelled() {
  const renderItem = (item) => (
    <View key={item.id} style={styles.item}>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.descriptionText}>Direccion: {item.lugar}</Text>
        <Text style={styles.itemText}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} >
      <View style={styles.topSection}>
        <View style={styles.diagonal} />
      </View>
      <View style={styles.bottomSection}>
        {cancelledOrders.map(renderItem)}
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
});
