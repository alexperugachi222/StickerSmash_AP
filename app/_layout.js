import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#002855', // SKILL EPN: Azul Institucional en la cabecera
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="about" options={{ title: 'Acerca de' }} />
    </Stack>
  );
}