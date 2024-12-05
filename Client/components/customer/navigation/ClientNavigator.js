import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./bottomNavigation";
import DesignerPage from "../../designerPage";
import OrderHolder from "../ordering/orderHolder";
import DesignInfo from "../designScreenCustomer/designInfo";
import MixAndMatch from "../designScreenCustomer/mix&match";
import AILoadingScreen from "../designScreenCustomer/AILoadingScreen";
import ChooseOutfit from "../designScreenCustomer/chooseOutfit";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import {
  ClientObjectContext,
  ClientObjectProvider,
} from "./ClientObjectProvider";
import { WithServerCall } from "../../withServerCall";
import { getDesign } from "../../../apiServices/client/getDesign";
import AppBar from "../../AppBar";

const Stack = createNativeStackNavigator();

// Client Navigator
export const ClientNavigator = () => {
  const { userDetails } = useContext(AppObjectContext);
  return (
    <ClientObjectProvider>
      <ClientObjectContext.Consumer>
        {({ setDesign, orderId }) => (
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
              {(props) => (
                <WithServerCall
                  {...props}
                  getObject={getDesign}
                  setObject={setDesign}
                  secondInput={orderId}
                  loadingText={"Loading your costume picked outfits..."}
                  top={<AppBar {...props} text={"Choosen Outfits"} />}
                >
                  <DesignInfo {...props} userDetails={userDetails} />
                </WithServerCall>
              )}
            </Stack.Screen>
            <Stack.Screen name="mixAndMatch">
              {(props) => <MixAndMatch {...props} userDetails={userDetails} />}
            </Stack.Screen>
            <Stack.Screen name="ChooseOutfit">
              {(props) => <ChooseOutfit {...props} userDetails={userDetails} />}
            </Stack.Screen>
            <Stack.Screen name="AILoadingScreen">
              {(props) => (
                <AILoadingScreen {...props} userDetails={userDetails} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </ClientObjectContext.Consumer>
    </ClientObjectProvider>
  );
};
