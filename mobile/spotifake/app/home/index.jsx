import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Escolha uma opção:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.buttonText}>Ir para o Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pagamento')}
      >
        <Text style={styles.buttonText}>Ir para Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffcc80', // Fundo mais suave (laranja claro)
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', // Cor escura para o título, mais legível
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555', // Cor mais suave para o subtítulo
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff7043', // Cor de botão mais suave
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12, // Bordas arredondadas
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#ff5722', // Sombra ainda mantém o tema, mas mais suave
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // Texto branco para contraste com o botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
