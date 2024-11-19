import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState(null);
  const [image, setImage] = useState(null);

  // Carregar o token do usuário
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);
      if (!storedToken) {
        console.log('Token não encontrado, redirecionando para login...');
        //terminar função para levar pro login
      }
    };

    fetchToken();
  }, []);

  // Carregar os dados do usuário
  useEffect(() => {
    if (token) {
      fetch('http://localhost:8000/:id', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setPassword(data.password); 
          setIsActive(data.isActive);
          setProfilePicture(data.profilePicture);
        })
        .catch((error) => {
          console.error('Erro ao carregar os dados do usuário:', error);
        });
    }
  }, [token]);

  // Função para selecionar imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar a galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log('Resultado do Picker:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0]; 
      console.log("Imagem selecionada:", selectedImage.uri); 
      setImage(selectedImage.uri); // Atualiza a imagem com a nova seleção
    } else {
      console.log("Seleção de imagem cancelada ou erro na seleção.");
    }
  };

  // Função para fazer upload da imagem para o Cloudinary
  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Erro', 'Selecione uma imagem para o perfil');
      return;
    }

    const formData = new FormData();
    formData.append('foto', {
      uri: image,
      type: 'image/jpeg', // Ou o tipo correto da sua imagem
      name: 'perfil.jpg',
    });
    formData.append('userId', '1'); // ID do usuário logado (substitua conforme necessário)

    try {
      const response = await fetch('http://localhost:8000/perfil/uploadFotoPerfil', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Foto de perfil atualizada!', [{ text: 'OK' }]);
      } else {
        Alert.alert('Erro', data.message, [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Erro ao enviar a imagem', error);
      Alert.alert('Erro', 'Erro ao enviar a imagem.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      ) : (
        <Text style={styles.noProfilePicture}>Sem foto de perfil</Text>
      )}

      <TouchableOpacity style={styles.changePictureButton} onPress={pickImage}>
        <Text style={styles.changePictureButtonText}>Alterar Foto</Text>
      </TouchableOpacity>

      {image && (
        <View>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>
      )}

      <TouchableOpacity style={styles.changePictureButton} onPress={uploadImage}>
        <Text style={styles.changePictureButtonText}>Salvar Foto de Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nome: {name}</Text>
      <Text style={styles.label}>Email: {email}</Text>
      <Text style={styles.label}>Senha: {password}</Text> 
      <Text style={styles.label}>Status: {isActive ? 'Ativo' : 'Inativo'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  noProfilePicture: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  changePictureButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  changePictureButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});

export default ProfileScreen;
