import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const [nome, setnome] = useState('');
  const [sobrenome, setsobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setsenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [datanascimento, setdatanascimento] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCreate = async () => {
    if (!email || !senha || !nome || !sobrenome || !datanascimento) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, nome, sobrenome, datanascimento }),
      });
      const data = await response.json();
      if (data.sucess) {
        Alert.alert('Conta criada com sucesso!');
      } else {
        Alert.alert('Falha ao registrar');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro na conexão');
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

  const handleBirthDateChange = (text) => {
    let formattedDate = text.replace(/\D/g, '');
    if (formattedDate.length >= 2) {
      formattedDate = `${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`;
    }
    if (formattedDate.length >= 5) {
      formattedDate = `${formattedDate.slice(0, 5)}/${formattedDate.slice(5)}`;
    }
    setdatanascimento(formattedDate);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Criar conta</Text>
      <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>Falta pouco para criar sua conta!</Text>

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Nome"
        value={nome}
        onChangeText={setnome}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setsobrenome}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />

      <TextInput
        style={[styles.input, email !== confirmEmail && confirmEmail.length > 0 && styles.inputError, isDarkMode && styles.darkInput]}
        placeholder="Confirmar Email"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
      />

      <View style={[styles.passwordContainer, isDarkMode && styles.darkInput]}>
        <TextInput
          style={[styles.inputPassword, senha !== confirmPassword && confirmPassword.length > 0 && styles.inputError, isDarkMode && styles.darkInput]}
          placeholder="Senha"
          value={senha}
          onChangeText={setsenha}
          secureTextEntry={!showPassword}
          placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
        />
      </View>

      <View style={[styles.passwordContainer, isDarkMode && styles.darkInput]}>
        <TextInput
          style={[styles.inputPassword, senha !== confirmPassword && confirmPassword.length > 0 && styles.inputError, isDarkMode && styles.darkInput]}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
        />
      </View>

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={datanascimento}
        onChangeText={handleBirthDateChange}
        placeholderTextColor={isDarkMode ? '#aaa' : '#aaa'}
        keyboardType="numeric"
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.themeSwitch} onPress={toggleTheme}>
        <Icon name={isDarkMode ? 'sun' : 'moon'} size={24} color={isDarkMode ? '#FFF' : '#000'} />
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: '#ffa726', // Laranja suave para as bordas
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
  inputPassword: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 15,
    borderRadius: 15, // Bordas arredondadas
  },
  inputError: {
    borderColor: '#FF0000', // Cor de erro
    borderWidth: 1,
  },
  passwordContainer: {
    marginBottom: 20,
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
  themeSwitch: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});

export default SignUpScreen;
