import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setsenha] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.sucess) {
            Alert.alert('Login realizado com sucesso!');
          } else {
            Alert.alert('Falha ao logar');
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (error) {
        console.log('Erro ao carregar o tema:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      await AsyncStorage.setItem('theme', newTheme);
      setIsDarkMode(!isDarkMode);
    } catch (error) {
      console.log('Erro ao salvar o tema:', error);
    }
  };

  const handleForgotPassword = () => {
    console.log('Redirecionar para página de recuperação de senha');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.themeSwitch} onPress={toggleTheme}>
        <Icon name={isDarkMode ? 'sun' : 'moon'} size={24} color={isDarkMode ? '#FFF' : '#000'} />
      </TouchableOpacity>

      <Text style={[styles.title, isDarkMode && styles.darkText]}>Bem-vindo de volta!</Text>
      <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>Faça login na sua conta</Text>

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
      />

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Senha"
        value={senha}
        onChangeText={setsenha}
        secureTextEntry
        placeholderTextColor={isDarkMode ? '#aaa' : '#777'}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={handleForgotPassword}>
        <Text style={[styles.linkText, isDarkMode && styles.darkText]}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <Text style={[styles.signUpText, isDarkMode && styles.darkText]}>
        Ainda não tem conta?{' '}
        <Link href="./register" style={[styles.signUpLink, isDarkMode && styles.darkLink]}>
          Cadastrar-se
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ff6f00', // Cor alaranjada de fundo
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  themeSwitch: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  darkText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ffa726', // Laranja suave para as bordas
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 15, // Bordas mais arredondadas
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#ffa726', // Sombras sutis para dar mais destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff5722', // Laranja vibrante para o botão
    paddingVertical: 15,
    borderRadius: 15, // Bordas arredondadas
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#ff5722', // Sombras sutis
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#ff5722',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: '#ff5722', // Laranja vibrante para o link
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
