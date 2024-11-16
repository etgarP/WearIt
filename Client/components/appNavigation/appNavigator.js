import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientNavigator } from '../Client/navigation/ClientNavigator';
import { DesignerNavigator } from '../designer/navigation/designerNavigator';
import SignIn from '../auth/signIn/signIn'
import SignOut from '../auth/signUp/signUp'
import { AppObjectProvider } from './appObjectProvider';
import { StylistQuestionnaireNavigator } from '../Questionnaires/stylist_questionnaire/StylistQuestionnaireNavigator';
import { ClientQuestionnaireNavigator } from '../Questionnaires/client_questionnaire/ClientQuestionnaireNavigator';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
        <AppObjectProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="SignIn"
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: 'white' }, // Adjust as needed
                    }}
                >
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignOut}
                    />
                    <Stack.Screen
                        name="stylistQuestionnaire"
                        component={StylistQuestionnaireNavigator} />
                    <Stack.Screen
                        name="clientQuestionnaire"
                        component={ClientQuestionnaireNavigator} />
                    <Stack.Screen
                        name="client"
                        component={ClientNavigator}
                    />
                    {/* Design screen */}
                    <Stack.Screen
                        name="designer"
                        component={DesignerNavigator}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppObjectProvider>
    );
};