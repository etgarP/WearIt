import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import BottomNav from './components/bottomNavigation.js'

export default function App() {
  return (
    <PaperProvider>
      <BottomNav />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
