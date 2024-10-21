import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './bottomNavigation';
import DesignerPage from '../../designerPage';
import OrderHolder from '../ordering/orderHolder';
import { ObjectProvider } from './ObjectProvider'; 
import DesignInfo from '../designScreen/designInfo';
import MixAndMatch from '../designScreen/mix&match';
import AILoadingScreen from '../designScreen/AILoadingScreen';
import ChooseOutfit from '../designScreen/chooseOutfit';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <ObjectProvider>
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
                    {/* Design screen */}
                    <Stack.Screen
                        name="DesignInfo"
                        component={DesignInfo}
                    />
                    <Stack.Screen
                        name="mixAndMatch"
                        component={MixAndMatch}
                    />
                    <Stack.Screen
                        name="ChooseOutfit"
                        component={ChooseOutfit}
                    />
                    <Stack.Screen
                        name="AILoadingScreen"
                        component={AILoadingScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ObjectProvider>
    );
};