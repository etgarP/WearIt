import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './components/navigation/bottomNavigation'; // Adjust the import path
import DesignerPage from './components/designerPage'; // Corrected component name
import OrderHolder from './components/ordering/orderHolder';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [profile, setProfilePage] = useState(null); // Proper use of useState
    
    return (
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
                    initialParams={{ setProfilePage: setProfilePage }} // Pass setProfilePage to BottomNav
                />
                <Stack.Screen
                    name="ProfileDetails"
                    component={DesignerPage}
                    initialParams={{ designerData: profile }} // Pass profile to DesignerPage
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
