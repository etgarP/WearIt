import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DesignerObjectProvider } from "./designerObjectProvider";
import DesignerBottomNav from "./designerbottomNavigation";
import ClientOrderDetails from "../ClientOrderDetails";
import MixAndMatch from "../designScreenDesigner/mix&match";
import DesignInfo from "../designScreenDesigner/designInfo";
import ManageOrder from "../manageOrder";
import AILoadingScreen from "../designScreenDesigner/AILoadingScreen";
import ChooseOutfit from "../designScreenDesigner/chooseOutfit";

const Stack = createNativeStackNavigator();

// Desginer stack navigator
export const DesignerNavigator = () => {
  return (
    <DesignerObjectProvider>
      <Stack.Navigator
        initialRouteName="HomeDesigner"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeDesigner" component={DesignerBottomNav} />
        <Stack.Screen name="ClientOrderDetails">
          {(props) => <ClientOrderDetails {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DesignInfo">
          {(props) => <DesignInfo {...props} />}
        </Stack.Screen>
        <Stack.Screen name="mixAndMatch">
          {(props) => <MixAndMatch {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ManageOrder">
          {(props) => <ManageOrder {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ChooseOutfit">
          {(props) => <ChooseOutfit {...props} />}
        </Stack.Screen>
        <Stack.Screen name="AILoadingScreen">
          {(props) => <AILoadingScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </DesignerObjectProvider>
  );
};
