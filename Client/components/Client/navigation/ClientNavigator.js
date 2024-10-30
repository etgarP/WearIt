import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./bottomNavigation";
import DesignerPage from "../../designerPage";
import OrderHolder from "../ordering/orderHolder";
import {
  ClientObjectContext,
  ClientObjectProvider,
} from "./ClientObjectProvider";
import DesignInfo from "../designScreen/designInfo";
import MixAndMatch from "../designScreen/mix&match";
import AILoadingScreen from "../designScreen/AILoadingScreen";
import ChooseOutfit from "../designScreen/chooseOutfit";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";

const Stack = createNativeStackNavigator();

export const ClientNavigator = () => {
  const { userDetails } = useContext(AppObjectContext);
  return (
    <ClientObjectProvider>
      <Stack.Navigator
        initialRouteName="HomeClient"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="orderDetails">
          {(props) => <OrderHolder {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="HomeClient">
          {(props) => <BottomNav {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileDetails">
          {(props) => <DesignerPage {...props} userDetails={userDetails} />}
        </Stack.Screen>
        {/* Design screens */}
        <Stack.Screen name="DesignInfo">
          {(props) => <DesignInfo {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="mixAndMatch">
          {(props) => <MixAndMatch {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="ChooseOutfit">
          {(props) => <ChooseOutfit {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="AILoadingScreen">
          {(props) => <AILoadingScreen {...props} userDetails={userDetails} />}
        </Stack.Screen>
      </Stack.Navigator>
    </ClientObjectProvider>
  );
};
