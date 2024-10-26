import React, { useContext } from "react";
import { BottomNavigation, Appbar, IconButton } from "react-native-paper";
import DesignerHome from "../homeScreen/designerHome";

export default function DesignerBottomNav({ navigation }) {
  // const { setProfilePage } = useContext(ClientObjectContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "WearIT",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "groupMatch",
      title: "Group Match",
      focusedIcon: "account-group",
      unfocusedIcon: "account-group-outline",
    },
    // { key: 'orders', title: 'Orders', focusedIcon: 'shopping', unfocusedIcon: 'shopping-outline' },
    // { key: 'design', title: 'Design', focusedIcon: 'palette', unfocusedIcon: 'palette-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <DesignerHome />,
    groupMatch: () => <DesignerHome />,
    // orders: OrdersRoute,
    // design: () => <FinishedDesigns navigation={navigation} />,
  });

  return (
    <>
      {/* Update the Appbar title dynamically based on the selected route */}
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
