import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientNavigator } from '../Client/navigation/ClientNavigator';
import { DesignerNavigator } from '../designer/navigation/designerNavigator';
import SignIn from '../auth/signIn/signIn'
import SignOut from '../auth/signUp/signUp'
import { AppObjectProvider } from './AppObjectProvider';

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
    return (
        <AppObjectProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="client"
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