import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/bottomNavigation.js'
import MyCarousel from './components/carousel.js';
import { Appbar } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Matching" />
      </Appbar.Header>
      <BottomNav />
    </PaperProvider>
  );
}