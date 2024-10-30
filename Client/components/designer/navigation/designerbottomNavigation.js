import React, { useEffect, useContext } from "react";
import { BottomNavigation, Appbar, IconButton } from "react-native-paper";
import DesignerHome from "../homeScreen/designerHome";
import ClientsOrders from "../clientsOrdersComponent/clientsOrders";
import DesignerPage from "../../designerPage";
import { DesingerObjectContext } from "./designerObjectProvider";

export default function DesignerBottomNav({ route, navigation }) {
  const [index, setIndex] = React.useState(0);
  const { profile, setProfile } = useContext(DesingerObjectContext);

  const [routes] = React.useState([
    {
      key: "home",
      title: "WearIT",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "face-man-shimmer",
      unfocusedIcon: "face-man-shimmer-outline",
    },
    {
      key: "pending",
      title: "Pending",
      focusedIcon: "dots-horizontal-circle",
      unfocusedIcon: "dots-horizontal-circle-outline",
    },
  ]);

  // Set index based on navigation params if available
  useEffect(() => {
    if (route.params?.initialTab === "pending") {
      setIndex(2); // Set to "Pending" tab if passed in navigation params
    }
  }, [route.params]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <DesignerHome navigation={navigation} setProfile={setProfile} />
    ),
    profile: () => <DesignerPage navigation={navigation} profile={profile}/>,
    pending: () => <ClientsOrders status={"pending"} />,
  });

  return (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title={routes[index].title} />
        <IconButton icon="account" size={24} onPress={() => {}} />
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}
