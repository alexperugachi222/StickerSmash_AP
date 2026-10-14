import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library/legacy';
import { captureRef } from 'react-native-view-shot';
import { Link } from 'expo-router'; // Importación de Expo Router

// IMPORTANTE: Rutas actualizadas con '../' porque ahora estamos dentro de la carpeta 'app'
import Button from '../components/Button';
import EmojiPicker from '../components/EmojiPicker';
import EmojiList from '../components/EmojiList';
import EmojiSticker from '../components/EmojiSticker';

const PlaceholderImage = require('../assets/background-image.jpg');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('No seleccionaste ninguna imagen.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("¡Arte guardado exitosamente!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <Image 
            source={selectedImage ? { uri: selectedImage } : PlaceholderImage} 
            style={styles.image} 
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} sticker={pickedEmoji} />
          ) : null}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <Button label="Resetear" onPress={onReset} />
          <Button theme="primary" label="Añadir Sticker" onPress={onAddSticker} />
          <Button label="Guardar" onPress={onSaveImageAsync} />
        </View>
      ) : (
        <View style={styles.optionsContainer}>
          <Button theme="primary" label="Elegir una foto" onPress={pickImageAsync} />
          <Button label="Usar esta foto" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      
      <StatusBar style="light" />

      {/* Nuevo enlace de navegación hacia la pantalla de Acerca de */}
      <Link href="/about" style={styles.aboutLink}>
        Acerca de esta App
      </Link>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002855', // SKILL EPN: Azul Institucional
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#C8102E', // SKILL EPN: Rojo Institucional
  },
  optionsContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutLink: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 40,
  },
});