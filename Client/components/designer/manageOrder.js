import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
  Appbar,
  List,
  Button,
  IconButton,
  TextInput,
  Text,
} from "react-native-paper";
import { Strings } from "../../constants/strings";

const outfits = [
  { id: 1, name: "Outfit 1", image: require("../../assets/shirt.png") },
  { id: 2, name: "Outfit 2", image: require("../../assets/pants_black.png") },
  { id: 3, name: "Outfit 3", image: require("../../assets/pants_tan.png") },
];

const ManageOrder = ({ navigation }) => {
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);
  const [newUrl, setNewUrl] = useState(""); // State to manage the new URL input

  const selectOutfit = (id) => {
    setSelectedOutfitId(id);
  };

  const handleDelete = () => {
    // Implement delete functionality here
  };

  const handleAddUrl = () => {
    console.log(`Add new URL: ${newUrl}`);
    // Add your functionality for adding the URL here
    setNewUrl(""); // Clear input after adding
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
        <Appbar.Content title="Pick Clothes" style={styles.title} />
      </Appbar.Header>

      {/* Outfit List */}
      <ScrollView style={styles.listContainer}>
        {outfits.map((outfit) => (
          <List.Item
            key={outfit.id}
            title={outfit.name}
            left={() => (
              <Image source={outfit.image} style={styles.outfitImage} />
            )}
            right={() => (
              <View style={styles.iconButtonContainer}>
                <IconButton
                  icon="trash-can"
                  size={24}
                  onPress={() => {
                    handleDelete();
                  }}
                />
              </View>
            )}
          />
        ))}

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            placeholder="Enter new URL"
            value={newUrl}
            onChangeText={setNewUrl}
            style={styles.newUrlInput}
          />
          <IconButton
            icon="plus" // Plus icon
            size={24}
            onPress={handleAddUrl}
          />
        </View>

        <View style={styles.centeredContainer}>
          <Text style={styles.text}>Mix & Match</Text>
          <IconButton
            icon="star-four-points-outline"
            iconColor="#ffcc00"
            size={50} // Adjust size as needed
            style={styles.icon}
            onPress={() => navigation.navigate("AILoadingScreen")}
          />
        </View>
      </ScrollView>
      {/* Send Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.selectButton}
          onPress={() => navigation.navigate("AILoadingScreen")}
          disabled={outfits.length === 0}
        >
          {Strings.sendToCustomer}
        </Button>
      </View>
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
  iconButtonContainer: {
    justifyContent: "center", // Vertically center the icon button
    alignItems: "center",
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
  title: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "6%",
  },
  newUrlInput: {
    flex: 1,
    marginRight: 10, // Space between the input and the icon
  },
  centeredContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    margin: 0, // No margin to avoid space between text and icon
  },
});

export default ManageOrder;
