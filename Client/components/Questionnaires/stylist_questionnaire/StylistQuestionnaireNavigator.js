import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import StylistInfo from "./stylist_info";
import StylistLifeStyle from "./stylist_life_style";
import Questionnaire_picture from "../picture";
import StylistAbout from "./stylist_about";
import { SafeAreaView, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const ScreenWrapper = ({ children }) => (
  <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
);

export const StylistQuestionnaireNavigator = () => {
  const { questionnaireData, setQuestionnaireData } =
    useContext(AppObjectContext);

  return (
    <Stack.Navigator
      initialRouteName="stylistInfo"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
        },
      }}
    >
      <Stack.Screen name="stylistInfo">
        {(props) => (
          <ScreenWrapper>
            <StylistInfo
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          </ScreenWrapper>
        )}
      </Stack.Screen>
      <Stack.Screen name="stylistLifeStyle">
        {(props) => (
          <ScreenWrapper>
            <StylistLifeStyle
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
      <Stack.Screen name="stylistAbout">
        {(props) => (
          <ScreenWrapper>
            <StylistAbout
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
