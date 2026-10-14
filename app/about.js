import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aplicación desarrollada para la EPN</Text>
      <Text style={styles.subtext}>Proyecto: StickerSmash con Identidad Visual</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#C8102E', // Rojo EPN
    fontSize: 16,
    marginTop: 10,
  },
});