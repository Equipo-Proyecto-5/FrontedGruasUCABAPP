import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Console } from 'node:console';

export default function OrderDetail({ route }) {
  const { id } = route.params; 
  const [orderDetails, setOrderDetails] = useState(null); // Estado para los detalles de la orden
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loadingCosts, setLoadingCosts] = useState(true); // Estado de carga para los costos adicionales
  const [errorCosts, setErrorCosts] = useState(null); // Estado de error para los costos adicionales
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://192.168.0.106:5101/Orden/${id}`);//probar
        if (!response.ok) {
          throw new Error(`Error al obtener los detalles: ${response.status}`);
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);



  // Función para obtener los costos (GET)
  const fetchSelectedCosts = async () => {
    try {
      const response = await fetch(`http://192.168.0.106:5101/api/CostoAdicional/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener los costos adicionales: ${response.status}`);
      }
      const data = await response.json();
      setSelectedCosts(data);
    } catch (err) {
      setErrorCosts(err.message);
    } finally {
      setLoadingCosts(false);
    }
  };

  // Hook para cargar los costos al montar la pantalla o cambiar el `id`
  useEffect(() => {
    fetchSelectedCosts();
  }, [id]);













// Registrar Costo
  const sendCost = async (index) => {
    const costToSend = selectedCosts[index]; // Obtiene el costo a enviar
    // Verifica que el monto no esté vacío antes de enviar
    if (!costToSend.monto) {
      alert('Por favor, ingrese un monto antes de enviar.');
      return;
    }
   const idCosto=evaluarCosto(costToSend.nombre);
    try {
      // Realiza la solicitud POST al servidor
      const response = await fetch(`http://192.168.0.106:5101/api/CostoAdicional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idOrden:id,
          idCostoAdicional: idCosto,
          costo: costToSend.monto,
          descripcion:"Costo" // Convierte el monto a un número
        }),
      });
  
      if (!response.ok) {
        console.log(response)
        throw new Error('Error al enviar el costo');
      }
  
      // Si el envío fue exitoso, actualiza el estado local
     // const updatedCosts = [...selectedCosts];
     // updatedCosts[index].estatus = 'Por Aprobar'; // Cambia el estado a "Por Aprobar"
      //setSelectedCosts(updatedCosts);
  
      alert('Costo enviado con éxito.');
      await fetchSelectedCosts(); // Llama a la función GET para actualizar los datos

    } catch (error) {
      console.error(error.message);
      alert('Ocurrió un error al enviar el costo.');
    }
  };
  //modificar costo
  const ModifyCost = async (index, idCosto) => {
    const costToSend = selectedCosts[index];
    console.log("idcosto") 
    console.log(idCosto)// Obtiene el costo a enviar
    // Verifica que el monto no esté vacío antes de enviar
    if (!costToSend.monto) {
      alert('Por favor, ingrese un monto antes de enviar.');
      return;
    }
  
    try {
      // Realiza la solicitud POST al servidor
      const response = await fetch(`http://192.168.0.106:5101/api/CostoAdicional/${idCosto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:idCosto,
          monto: costToSend.monto,
          descripcion:"Costo" 
        }),
      });
  
      if (!response.ok) {
        console.log(response)
        throw new Error('Error al enviar el costo');
      }
  
      // Si el envío fue exitoso, actualiza el estado local
      const updatedCosts = [...selectedCosts];
      updatedCosts[index].estatus = 'Por Aprobar'; // Cambia el estado a "Por Aprobar"
      setSelectedCosts(updatedCosts);
  
      alert('Costo modificado con éxito.');
    } catch (error) {
      console.error(error.message);
      alert('Ocurrió un error al modificar el costo.');
    }
  };
//Cancelar Orden
const handleCancel = async () => {

  try {
    await fetch(`http://192.168.0.106:5101/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify("Cancelar"),
    });
  } catch (error) {
    console.error('Error canceled order:', error);
  }
};
// Adquirir el id del costo adiciona seleccionado
const evaluarCosto = (nombreCosto: string): string => {
 if (nombreCosto==="Transporte"){return "bde722ee-f160-4d8e-88ea-c4eaf738bcf7"}
 if (nombreCosto==="Mano de Obra"){return "bde722ee-f160-4d8e-88ea-c4eaf738bcf8"}
 if (nombreCosto==="Materiales"){return ""}
  
};
  // Estado para mostrar u ocultar la sección de costos adicionales
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(false);

  // Estado para manejar la entrada de una categoría personalizada
  //const [customCategory, setCustomCategory] = useState('');

  // Estado para almacenar las categorías seleccionadas junto con sus costos
  const [selectedCosts, setSelectedCosts] = useState([]);

  // Estado para manejar la selección de la categoría
  const [selectedCategory, setSelectedCategory] = useState('');

  // Alterna la visibilidad de la sección de costos adicionales
  const toggleAdditionalCosts = () => setShowAdditionalCosts(!showAdditionalCosts);

  // Agrega una categoría personalizada o seleccionada a la lista de costos seleccionados
  const addCost = () => {
    const categoryToAdd = selectedCategory;
    if (categoryToAdd) {
      setSelectedCosts([...selectedCosts, { nombre: categoryToAdd, monto: '', estatus:'' }]);
     
    }
  };

  // Maneja el cambio del costo asociado a una categoría
  const updateCost = (index, monto) => {
    const updatedCosts = [...selectedCosts];
    updatedCosts[index].monto = monto;
    //updatedCosts[index].estatus='';
    setSelectedCosts(updatedCosts);
  };

  // Elimina una categoría de la lista de costos seleccionados
  const removeCost = async (index,idCosto) => {
    const costToRemove = selectedCosts[index]; // Obtiene el costo a eliminar
    console.log(idCosto)
    // Realiza la solicitud DELETE al servidor
    try {
      const response = await fetch(`http://192.168.0.106:5101/api/CostoAdicional/${costToRemove.id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el costo');
      }
  
      // Si la eliminación fue exitosa, elimina el costo de la lista local
      setSelectedCosts(selectedCosts.filter((_, i) => i !== index));
     

    } catch (error) {
      console.error(error.message); // Muestra el error si ocurre
    }
  };

  if (loading) {
    return <Text>Cargando detalles de la orden...</Text>;
  }

  // Muestra un mensaje de error si ocurrió un problema
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bloque de detalles de la orden */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Dirección Origen: {orderDetails?.direccionOrigen || 'No disponible'}</Text>
        <Text style={styles.label}>Dirección Origen: {orderDetails?.direccionDestino || 'No disponible'}</Text>
        <Text style={styles.label}>Denunciante: {orderDetails?.denunciante || 'No disponible'}</Text>
        <Text style={styles.label}>Fecha: {orderDetails?.fecha || 'No disponible'}</Text>
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
            

            {/* Botón para agregar la categoría */}
            <TouchableOpacity style={styles.addCostButton} onPress={addCost}>
              <Text style={styles.addCostButtonText}>Agregar</Text>
            </TouchableOpacity>

            {/* Lista de costos seleccionados con botón para eliminar y entrada de costo */}
            {loadingCosts ? (
              <Text>Cargando costos adicionales...</Text>
            ) : errorCosts ? (
              <Text>Error: {errorCosts}</Text>
            ) : (
              selectedCosts.map((item, index) => (
                <View key={index} style={styles.costItem}>
                  <Text style={styles.costText}>{item.nombre}</Text>
                  {item.estatus === "" && (
                  <TouchableOpacity onPress={() => sendCost(index)}>
                  <Text style={styles.removeCostText}> + </Text>
                 </TouchableOpacity>
                  )}
                  {item.estatus === "Por Aprobar" && (
                  <TouchableOpacity onPress={() => ModifyCost(index,item.id)}>
                  <Text style={styles.removeCostText}> #  </Text>
                 </TouchableOpacity>
                  )}
                  <TextInput
                    style={styles.costInput}
                    placeholder="Costo"
                    keyboardType="numeric"
                    value={item.monto.toString()}
                    onChangeText={(value) => updateCost(index, value)}
                  />
                  {item.estatus === "Por Aprobar" && (
                  <TouchableOpacity onPress={() => removeCost(index,item.id)}>
                  <Text style={styles.removeCostText}> - </Text>
                 </TouchableOpacity>
                  )}
                </View>
                
              ))
            )}
          </View>
        )}
      </View>

       {/* Contenedor para los botones */}
          <View style={styles.buttonContainer}>

            {/* Botón de Cancelar */}
            <TouchableOpacity style={[styles.cancelButton, styles.button]} onPress={handleCancel}>
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
