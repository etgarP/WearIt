import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientNavigator } from '../Client/navigation/ClientNavigator';
import { DesignerNavigator } from '../designer/navigation/designerNavigator';
import { AppObjectProvider } from './appObjectProvider';
import { StylistQuestionnaireNavigator } from '../Questionnaires/stylist_questionnaire/StylistQuestionnaireNavigator';
import { ClientQuestionnaireNavigator } from '../Questionnaires/client_questionnaire/ClientQuestionnaireNavigator';
import SignInScreen from '../Authentication/SignInScreen';
import SignUpScreen from '../Authentication/SignUpScreen';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
      <AppObjectProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="stylistQuestionnaire"
              component={StylistQuestionnaireNavigator}
            />
            <Stack.Screen
              name="clientQuestionnaire"
              component={ClientQuestionnaireNavigator}
            />
            <Stack.Screen name="client" component={ClientNavigator} />
            {/* Design screen */}
            <Stack.Screen name="designer" component={DesignerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppObjectProvider>
    );
};