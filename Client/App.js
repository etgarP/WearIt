import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/navigation/bottomNavigation.js'
import { Appbar } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Matching" />
      </Appbar.Header>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Matching" />
      </Appbar.Header>
      <BottomNav />
    </PaperProvider>
  );
}