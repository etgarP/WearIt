import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import PersonalInfo from "./components/Questionnaires/client_questionnaire/personal_info";
import ClientLifeStyle from "./components/Questionnaires/client_questionnaire/client_life_style";
import QuestionnairePicture from "./components/Questionnaires/picture";
import Measurements from "./components/Questionnaires/client_questionnaire/measurements";
import Others from "./components/Questionnaires/client_questionnaire/others";
import StylistInfo from "./components/Questionnaires/stylist_questionnaire/stylist_info";
import StylistLifeStyle from "./components/Questionnaires/stylist_questionnaire/stylist_life_style";

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
          onPress={() => navigation.navigate("stylistInfo")}
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
    price: null,
    expertise: "",
    stylistAbout: "",
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="personalInfo">
          {(props) => (
            <PersonalInfo
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="clientLifeStyle">
          {(props) => (
            <ClientLifeStyle
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="QuestionnairePicture">
          {(props) => (
            <QuestionnairePicture
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Measurements">
          {(props) => (
            <Measurements
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Others">
          {(props) => (
            <Others
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="stylistInfo">
          {(props) => (
            <StylistInfo
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="stylistLifeStyle">
          {(props) => (
            <StylistLifeStyle
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="stylistAbout">
          {(props) => (
            <Others
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
