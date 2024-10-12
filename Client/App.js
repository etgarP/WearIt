import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import Questionnaire1 from "./components/Questionnaire/Questionnaire_1";
import Questionnaire2 from "./components/Questionnaire/Questionnaire_2";
import Questionnaire3 from "./components/Questionnaire/Questionnaire_3";
import Questionnaire4 from "./components/Questionnaire/Questionnaire_4";
import Questionnaire5 from "./components/Questionnaire/Questionnaire_5";

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
        <PaperProvider>
            <View style={styles.container}>
                <Text>Welcome to the Home Screen</Text>
                <Button
                    title="Go to Questionnaire"
                    onPress={() => navigation.navigate("Questionnaire1")}
                />
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

export default function App() {
    const [questionnaireData, setQuestionnaireData] = useState({
        name: "",
        age: "",
        gender: "",
        allergies: "",
        work: "",
        city: "",
        religion: "",
        image: null,
        measurements: {
            shoulders: "",
            bust: "",
            waist: "",
            hips: "",
            thighs: "",
            calves: "",
            legs: "",
        },
        other: "",
    });
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Questionnaire1">
                    {(props) => (
                        <Questionnaire1
                            {...props}
                            setQuestionnaireData={setQuestionnaireData}
                            questionnaireData={questionnaireData}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Questionnaire2">
                    {(props) => (
                        <Questionnaire2
                            {...props}
                            setQuestionnaireData={setQuestionnaireData}
                            questionnaireData={questionnaireData}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Questionnaire3">
                    {(props) => (
                        <Questionnaire3
                            {...props}
                            setQuestionnaireData={setQuestionnaireData}
                            questionnaireData={questionnaireData}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Questionnaire4">
                    {(props) => (
                        <Questionnaire4
                            {...props}
                            setQuestionnaireData={setQuestionnaireData}
                            questionnaireData={questionnaireData}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Questionnaire5">
                    {(props) => (
                        <Questionnaire5
                            {...props}
                            setQuestionnaireData={setQuestionnaireData}
                            questionnaireData={questionnaireData}
                        />
                    )}
                </Stack.Screen>
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
