import React, { useContext } from "react";
import { View, StyleSheet, Image, ScrollView, Linking } from "react-native";
import { Appbar, List, Button } from "react-native-paper";
import { ClientObjectContext } from "../Client/navigation/ClientObjectProvider";
import { clothes } from "../../data/design";

const DesignInfo = ({ toSend = false, navigation }) => {
  const { setDesign } = useContext(ClientObjectContext);
  // Function to open the HTTPS link
  const handleOutfitPress = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Error opening URL", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Appbar */}
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Pick Clothes" />
      </Appbar.Header>

      {/* List of Outfits wrapped in a ScrollView */}
      <ScrollView style={styles.listContainer}>
        {clothes.map((outfit) => (
          <List.Item
            key={outfit.id}
            title={outfit.name}
            left={() => (
              <Image source={outfit.image} style={styles.outfitImage} />
            )}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => handleOutfitPress(outfit.link)}
          />
        ))}
      </ScrollView>

      {/* AI Mix & Match Section */}
      <View style={styles.aiMixMatchContainer}>
        <List.Item
          title="AI Mix & Match"
          right={() => (
            <View>
              <List.Icon icon="star" color="#FFD700" />
            </View>
          )}
          onPress={() => {
            // Add your functionality here
            setDesign(clothes);
            navigation.navigate("mixAndMatch");
          }}
        />
      </View>

      {/* Send to Customer Button */}
      {toSend ? (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.selectButton}
            onPress={() => "TODO" }
          >
            Select
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  outfitImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
  },
  aiMixMatchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  selectButton: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default DesignInfo;
