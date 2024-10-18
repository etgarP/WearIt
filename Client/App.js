import { PaperProvider, Appbar } from 'react-native-paper';
import BottomNav from './components/navigation/bottomNavigation.js'
import { StyleSheet, View, Text, EditScreenInfo, TouchableHighlight } from 'react-native';
import DesignerCard from './components/designerPage.js'
import {AppNavigator} from './components/navigation/AppNavigator.js';


export default function App() {
  return (
    <PaperProvider>

      <AppNavigator />
    </PaperProvider>
  );
}
