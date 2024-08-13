import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { Ionicons } from '@expo/vector-icons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateCredentials = () => {
    const validUsername = 'admin';
    const validPassword = '123'; 

    if (username === validUsername && password === validPassword) {
      navigation.navigate('InsideScreen');
    } else {
      setError('Nome de usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image 
        source={require('../assets/Logo.png')} 
        style={styles.logo}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#B0B0B0"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={validateCredentials}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  logo: {
    width: 500,  
    height: 400, 
    marginBottom: 5,  
  },
  form: {
    width: '80%',
    maxWidth: 400,
    marginTop: 100,
  },
  input: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    fontFamily: 'Jua_400Regular',
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Jua_400Regular',
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});