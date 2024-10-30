import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DesignerObjectProvider } from "./designerObjectProvider";
import DesignerBottomNav from "./designerbottomNavigation";

const Stack = createNativeStackNavigator();

export const DesignerNavigator = () => {
  return (
    <DesignerObjectProvider>
      <Stack.Navigator
        initialRouteName="HomeClient"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "white" }, // Adjust as needed
        }}
      >
        <Stack.Screen name="HomeClient" component={DesignerBottomNav} />
      </Stack.Navigator>
    </DesignerObjectProvider>
  );
};
