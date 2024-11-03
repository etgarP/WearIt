import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ClientObjectContext } from "./Client/navigation/ClientObjectProvider";
import DesignerProfile from "./designer/designerProfile/designerProfile";

const DesignerPage = ({ navigation, isDesigner }) => {
  const { profile } = useContext(ClientObjectContext);

  return (
    <View style={styles.container}>
      <DesignerProfile
        navigation={navigation}
        profile={profile}
        isDesigner={isDesigner}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("orderDetails")}
        style={styles.selectButton}
      >
        Select
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  selectButton: {
    alignSelf: "center",
    marginBottom: "20%",
  },
});

export default DesignerPage;
