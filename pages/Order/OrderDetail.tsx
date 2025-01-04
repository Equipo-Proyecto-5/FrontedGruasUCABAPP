import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function OrderDetail() {
  // Estado para mostrar u ocultar la sección de costos adicionales
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(false);

  // Estado para manejar la entrada de una categoría personalizada
  const [customCategory, setCustomCategory] = useState('');

  // Estado para almacenar las categorías seleccionadas junto con sus costos
  const [selectedCosts, setSelectedCosts] = useState([]);

  // Estado para manejar la selección de la categoría
  const [selectedCategory, setSelectedCategory] = useState('');

  // Alterna la visibilidad de la sección de costos adicionales
  const toggleAdditionalCosts = () => setShowAdditionalCosts(!showAdditionalCosts);

  // Agrega una categoría personalizada o seleccionada a la lista de costos seleccionados
  const addCost = () => {
    const categoryToAdd = customCategory.trim() || selectedCategory;
    if (categoryToAdd) {
      setSelectedCosts([...selectedCosts, { category: categoryToAdd, cost: '' }]);
      setCustomCategory('');
    }
  };

  // Maneja el cambio del costo asociado a una categoría
  const updateCost = (index, cost) => {
    const updatedCosts = [...selectedCosts];
    updatedCosts[index].cost = cost;
    setSelectedCosts(updatedCosts);
  };

  // Elimina una categoría de la lista de costos seleccionados
  const removeCost = (index) => {
    setSelectedCosts(selectedCosts.filter((_, i) => i !== index));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bloque de detalles de la orden */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Dirección: Calle 1, Ciudad 1</Text>
        <Text style={styles.label}>Cliente: Juan Pérez</Text>
        <Text style={styles.label}>Fecha: 02/01/2025</Text>
      </View>

      {/* Bloque de costos adicionales */}
      <View style={styles.additionalCostsBlock}>
        <TouchableOpacity style={styles.addButton} onPress={toggleAdditionalCosts}>
          <Text style={styles.addButtonText}>+ Agregar Costos Adicionales</Text>
        </TouchableOpacity>

        {showAdditionalCosts && (
          <View style={styles.additionalCostsContainer}>
            {/* Botón desplegable para seleccionar categoría */}
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione una categoría" value="" />
              <Picker.Item label="Transporte" value="Transporte" />
              <Picker.Item label="Mano de Obra" value="Mano de Obra" />
              <Picker.Item label="Materiales" value="Materiales" />
            </Picker>

            {/* Campo de entrada para una categoría personalizada */}
            <TextInput
              style={styles.input}
              placeholder="Otra categoría"
              value={customCategory}
              onChangeText={setCustomCategory}
            />

            {/* Botón para agregar la categoría */}
            <TouchableOpacity style={styles.addCostButton} onPress={addCost}>
              <Text style={styles.addCostButtonText}>Agregar</Text>
            </TouchableOpacity>

            {/* Lista de costos seleccionados con botón para eliminar y entrada de costo */}
            {selectedCosts.map((item, index) => (
              <View key={index} style={styles.costItem}>
                <Text style={styles.costText}>{item.category}</Text>
                <TextInput
                  style={styles.costInput}
                  placeholder="Costo"
                  keyboardType="numeric"
                  value={item.cost}
                  onChangeText={(value) => updateCost(index, value)}
                />
                <TouchableOpacity onPress={() => removeCost(index)}>
                  <Text style={styles.removeCostText}>-</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

       {/* Contenedor para los botones */}
          <View style={styles.buttonContainer}>
            {/* Botón de Finalizar */}
            <TouchableOpacity style={[styles.finishButton, styles.button]}>
              <Text style={styles.finishButtonText}>Finalizar</Text>
            </TouchableOpacity>

            {/* Botón de Cancelar */}
            <TouchableOpacity style={[styles.cancelButton, styles.button]}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Estilo del contenedor principal
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 150,
  },
  // Estilo del contenedor de detalles de la orden
  detailContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  // Bloque de costos adicionales
  additionalCostsBlock: {
    width: '100%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  additionalCostsContainer: {
    marginTop: 10,
  },
  picker: {
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addCostButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addCostButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  costText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  costInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    width: 80,
    marginRight: 10,
  },
  removeCostText: {
    color: '#dc3545',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Coloca los botones en línea
    justifyContent: 'space-between', // Espacio entre los botones
    paddingHorizontal: 20, // Espaciado lateral
    marginVertical: 10, // Margen vertical
  },
  button: {
    flex: 1, // Cada botón ocupa la mitad del espacio disponible
    marginHorizontal: 5, // Espaciado entre los botones
    paddingVertical: 10, // Altura del botón
    borderRadius: 8, // Bordes redondeados
    alignItems: 'center', // Centrar el texto
  },
  finishButton: {
    backgroundColor: '#28a745', // Verde para "Finalizar"
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Rojo para "Cancelar"
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
