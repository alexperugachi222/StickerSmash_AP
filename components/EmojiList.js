import { useState } from 'react';
import { StyleSheet, FlatList, Pressable, Text } from 'react-native';

export default function EmojiList({ onSelect, onCloseModal }) {
  // Arreglo temporal de emojis para evitar descargar imágenes en este paso
  const [emoji] = useState(['🤩', '🚀', '💻', '🐺', '🔥', '⚙️']);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Text style={styles.emojiText}>{item}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emojiText: {
    fontSize: 50,
    marginRight: 20,
  },
});
import { Platform } from 'react-native';