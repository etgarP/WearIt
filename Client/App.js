import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Questionnaire from "./components/Questionnaire/Questionnaire_2";
import { useFonts } from "expo-font";

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
                onPress={() => navigation.navigate("Questionnaire")}
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
                <Stack.Screen name="Questionnaire" component={Questionnaire} />
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
