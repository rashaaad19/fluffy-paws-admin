import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DynamicStack from './navigation/DynamicStack';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider
} from 'react-native-paper';

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider >
          <DynamicStack />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

