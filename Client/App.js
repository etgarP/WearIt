import { PaperProvider } from 'react-native-paper';
import AppNavigator from './components/appNavigation/appNavigator';


export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
