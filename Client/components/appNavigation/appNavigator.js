import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, ImageBackground } from "react-native"; // Import ImageBackground
import { ClientNavigator } from "../customer/navigation/ClientNavigator";
import { DesignerNavigator } from "../designer/navigation/designerNavigator";
import { AppObjectProvider } from "./appObjectProvider";
import { StylistQuestionnaireNavigator } from "../Questionnaires/stylist_questionnaire/StylistQuestionnaireNavigator";
import { ClientQuestionnaireNavigator } from "../Questionnaires/client_questionnaire/ClientQuestionnaireNavigator";
import SignInScreen from "../authentication/SignInScreen";
import SignUpScreen from "../authentication/SignUpScreen";

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
  return (
    <AppObjectProvider>
      <ImageBackground
        source={require("../../assets/background.png")} // Update the path to your image
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                gestureEnabled: false, // Disable swipe gesture
              }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="stylistQuestionnaire"
              component={StylistQuestionnaireNavigator}
            />
            <Stack.Screen
              name="clientQuestionnaire"
              component={ClientQuestionnaireNavigator}
            />
            <Stack.Screen
              name="client"
              component={ClientNavigator}
              options={{
                gestureEnabled: false, // Disable swipe gesture
              }}
            />
            {/* Design screen */}
            <Stack.Screen
              name="designer"
              component={DesignerNavigator}
              options={{
                gestureEnabled: false, // Disable swipe gesture
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </AppObjectProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "flex-start", // Ensure the content starts at the top
  },
});
