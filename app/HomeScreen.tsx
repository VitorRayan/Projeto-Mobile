import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/Logo.png')} 
        style={styles.logo}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13505B',
  },
  logo: {
    width: 500,  
    height: 500, 
    marginBottom: 200,  
  },
  button: {
    width: 276,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,  
    marginTop: 20,  
  },
  buttonText: {
    fontFamily: 'Jua', 
    color: 'white',  
    fontSize: 16,  
  },
});