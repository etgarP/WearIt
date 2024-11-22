import React, { useRef } from "react";
import { View, StyleSheet, Image, ScrollView, Linking } from "react-native";
import { IconButton, List, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddItemModal from "../../Client/designScreen/allDesignScreens/addItemModel";
import { clothes } from "../../../data/design";

const DesignInfo = ({ navigation }) => {
  const addItemModalRef = useRef(null); // Create a ref for the modal

  const handleOutfitPress = (link) => {
    Linking.openURL(link).catch((err) =>
      console.error("Error opening URL", err)
    );
  };

  const handleAddItem = () => {
    if (addItemModalRef.current) {
      addItemModalRef.current.openModal(); // Open the modal
    }
  };

  return (
    <View style={styles.container}>
      {/* Scrollable list of outfits */}
      <View style={styles.scrollableListContainer}>
        <ScrollView contentContainerStyle={styles.listContent}>
          {clothes.map((outfit) => (
            <List.Item
              key={outfit._id}
              title={outfit.typeOfCloth}
              left={() => (
                <Image
                  source={
                    outfit.imageOfCloth
                      ? outfit.imageOfCloth.startsWith("data:")
                        ? { uri: outfit.imageOfCloth }
                        : {
                            uri: `data:image/jpeg;base64,${outfit.imageOfCloth}`,
                          }
                      : null // Fallback image if no image is provided
                  }
                  style={styles.outfitImage}
                />
              )}
              right={() => (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    icon="trash-can"
                    size={24}
                    onPress={() => {
                      console.log("Delete button pressed");
                    }}
                  />
                </View>
              )}
              onPress={() => handleOutfitPress(outfit.url)}
            />
          ))}
        </ScrollView>
      </View>
      {/* Add Item Button */}
      <View style={styles.addButtonContainer}>
        <Button
          mode="contained"
          icon="plus"
          onPress={handleAddItem}
          style={styles.addItemButton}
          labelStyle={styles.addItemButtonText}
        >
          Add Item
        </Button>
      </View>

      {/* AI Mix & Match Section */}
      <View style={styles.aiMixMatchContainer}>
        <List.Item
          title="AI Mix & Match"
          titleStyle={{ fontSize: 18 }}
          right={(props) => (
            <Icon {...props} color="#FFD700" size={30} name="star" />
          )}
          onPress={() => navigation.navigate("mixAndMatch")}
        />
      </View>

      {/* Send to Customer Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.selectButton}
          onPress={() => console.log("Select button pressed")}
        >
          Select
        </Button>
      </View>

      {/* Add Item Modal */}
      <AddItemModal ref={addItemModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  scrollableListContainer: {
    flex: 1, // Allows the ScrollView to take up available space
  },
  listContent: {
    paddingHorizontal: 10,
  },
  outfitImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
  },
  aiMixMatchContainer: {
    paddingVertical: 15,
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
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  addItemButton: {
    width: 200,
    borderRadius: 25,
    backgroundColor: "#6200ea",
  },
  addItemButtonText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
  },
});

export default DesignInfo;
