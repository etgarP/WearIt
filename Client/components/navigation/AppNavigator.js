import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './bottomNavigation';
import DesignerPage from '../designerPage';
import OrderHolder from '../ordering/orderHolder';
import { ProfileProvider } from './ProfileProvider'; 


const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <ProfileProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="HomeClient"
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: 'white' }, // Adjust as needed
                    }}
                >
                    <Stack.Screen
                        name="orderDetails"
                        component={OrderHolder}
                    />
                    <Stack.Screen
                        name="HomeClient"
                        component={BottomNav}
                    />
                    <Stack.Screen
                        name="ProfileDetails"
                        component={DesignerPage}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ProfileProvider>
    );
};