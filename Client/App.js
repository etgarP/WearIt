import { PaperProvider } from 'react-native-paper';
import {AppNavigator} from './components/Client/navigation/AppNavigator.js';


export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
