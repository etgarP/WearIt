import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import PersonalInfo from "./personal_info";
import ClientLifeStyle from "./client_life_style";
import Questionnaire_picture from "../picture";
import Others from "./others";
import { SafeAreaView, StyleSheet } from "react-native";
import Measurements from "./measurements";

const Stack = createNativeStackNavigator();

const ScreenWrapper = ({ children }) => (
  <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
);

export const ClientQuestionnaireNavigator = () => {
  const { userDetails } = useContext(AppObjectContext);
  const { questionnaireData, setQuestionnaireData } =
    useContext(AppObjectContext);
  return (
    <Stack.Navigator
      initialRouteName="personalInfo"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
        },
      }}
    >
      <Stack.Screen name="personalInfo">
        {(props) => (
          <ScreenWrapper>
            <PersonalInfo
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="clientLifeStyle">
        {(props) => (
          <ScreenWrapper>
            <ClientLifeStyle
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="QuestionnairePicture">
        {(props) => (
          <ScreenWrapper>
            <Questionnaire_picture
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Measurements">
        {(props) => (
          <ScreenWrapper>
            <Measurements
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="Others">
        {(props) => (
          <ScreenWrapper>
            <Others
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%", // Adjust this value as needed for your layout
  },
});
