import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Questionnaire2 from "./components/Questionnaire/Questionnaire_2";
import { useFonts } from "expo-font";
import Questionnaire3 from "./components/Questionnaire/Questionnaire_3"
const Stack = createStackNavigator();

// Define the HomeScreen component
function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        kalam: require("./assets/fonts/Kalam-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text>Welcome to the Home Screen</Text>
            <Button
                title="Go to Questionnaire"
                onPress={() => navigation.navigate("Questionnaire2")}
            />
            <StatusBar style="auto" />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Questionnaire2" component={Questionnaire2} />
                <Stack.Screen name="Questionnaire3" component={Questionnaire3} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
