import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import StylistInfo from "./stylist_info";
import StylistLifeStyle from "./stylist_life_style";
import Questionnaire_picture from "../picture";
import StylistAbout from "./stylist_about";

const Stack = createNativeStackNavigator();

export const StylistQuestionnaireNavigator = () => {
  const { userDetails, questionnaireData, setQuestionnaireData } = useContext(AppObjectContext);
  return (
      <Stack.Navigator
        initialRouteName="stylistInfo"
        screenOptions={{
          headerShown: false,
        }}
      >
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
                <Stack.Screen name="QuestionnairePicture">
          {(props) => (
            <Questionnaire_picture
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="stylistAbout">
          {(props) => (
            <StylistAbout
              {...props}
              setQuestionnaireData={setQuestionnaireData}
              questionnaireData={questionnaireData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  );
};
