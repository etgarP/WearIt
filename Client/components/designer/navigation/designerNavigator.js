import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DesignerObjectProvider } from "./designerObjectProvider";
import DesignerBottomNav from "./designerbottomNavigation";
import ClientOrderDetails from "../ClientOrderDetails";
import MixAndMatch from "../../Client/designScreen/mix&match";
import DesignInfo from "../../Client/designScreen/designInfo";
import ChooseOutfit from "../../Client/designScreen/chooseOutfit";
import AILoadingScreen from "../../Client/designScreen/AILoadingScreen";

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
        <Stack.Screen name="ClientOrderDetails">
          {(props) => <ClientOrderDetails {...props} />}
        </Stack.Screen>
        <Stack.Screen name="DesignInfo">
          {(props) => <DesignInfo {...props} userDetails={userDetails} />}
        </Stack.Screen>
        <Stack.Screen name="mixAndMatch">
          {(props) => <MixAndMatch {...props} />}
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
