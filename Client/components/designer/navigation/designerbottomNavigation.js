import React, { useEffect, useRef } from "react";
import { BottomNavigation, Appbar, IconButton } from "react-native-paper";
import DesignerHome from "../homeScreen/designerHome";
import ClientsOrders from "../clientsOrdersComponent/clientsOrders";
import GetProfile from "../designerProfile/getProfile";
import Sheet from "../../sheet";
import { Image, View, StyleSheet } from "react-native";

export default function DesignerBottomNav({ route, navigation }) {
  const [index, setIndex] = React.useState(0);
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
    home: () => <DesignerHome navigation={navigation} />,
    profile: () => <GetProfile navigation={navigation} />,
    pending: () => <ClientsOrders navigation={navigation} status={"pending"} />,
  });

  const showAppBarDetails = routes[index].key !== "profile"; // Hide title for "home" tab

  const sheetRef = useRef(null);

  const openBottomSheet = () => {
    sheetRef.current?.openSheet();
  };

  return (
    <Sheet
      navigation={navigation}
      ref={sheetRef}
      isClient={false}
      onChangeInfo={() => navigation.navigate("stylistQuestionnaire")}
    >
      {showAppBarDetails && (
        <Appbar.Header mode="center-aligned">
          <View style={styles.imageContainer}>
            {/* <Appbar.Content title={routes[index].title} /> */}
            <Image
              source={require("../../../data/logo.png")} // Local image using require
              style={styles.image}
            />
          </View>
          <IconButton icon="account" size={24} onPress={openBottomSheet} />
        </Appbar.Header>
      )}

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Sheet>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the image horizontally
    alignItems: "center",
    flex: 1, // This ensures that the image is centered in the Appbar
  },
  image: {
    marginLeft: 45,
    width: 120, // Adjust the size of the image
    height: 25, // Adjust the size of the image
  },
});
