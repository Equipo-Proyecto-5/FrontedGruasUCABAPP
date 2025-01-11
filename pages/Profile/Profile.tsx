import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BackHandler } from 'react-native';

const { width } = Dimensions.get('window');

function Profile  ({ navigation }) {
  const handleNavigation = (destination) => {
    console.log(`Navegando a ${destination}`);
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <FontAwesome name="user-circle" size={80} color="#fff" />
        </View>
        <Text style={styles.name}>Juan Hernandez</Text>
        <Text style={styles.role}>Conductor</Text>
      </View>

      {/* List of navigation items */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option} onPress={() => handleNavigation('Edit Profile')}>
          <View style={styles.optionContent}>
            <FontAwesome name="edit" size={24} color="#0F3460" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#A9A9A9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.optionContent}>
            <FontAwesome name="lock" size={24} color="#0F3460" />
            <Text style={styles.optionText}>Change Password</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#A9A9A9" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => BackHandler.exitApp()}>
          <View style={styles.optionContent}>
            <MaterialIcons name="logout" size={24} color="#E94560" />
            <Text style={[styles.optionText, { color: '#E94560' }]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    backgroundColor: '#047857',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 50,
  },
  profilePicture: {
    backgroundColor: '#0F3460',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  role: {
    fontSize: 16,
    color: '#A9A9A9',
    marginTop: 5,
  },
  options: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3460',
    marginLeft: 10,
  },
});

export default Profile;
