import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import PersonalInfo from "./personal_info";
import ClientLifeStyle from "./client_life_style";
import Questionnaire_picture from "../picture";
import Others from "./others";

const Stack = createNativeStackNavigator();

export const ClientQuestionnaireNavigator = () => {
  const { userDetails } = useContext(AppObjectContext);
  return (
      <Stack.Navigator
        initialRouteName="personalInfo"
        screenOptions={{
          headerShown: false,
        }}
      >
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
            <Questionnaire_picture
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
      </Stack.Navigator>
  );
};
