import React, { useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { IconButton, List, Button, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddItemModal from "../../Client/designScreen/allDesignScreens/addItemModel";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundWrapper from "../../backgroundWrapper";
import axios from "axios";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { constants } from "../../../constants/api";
import { DesingerObjectContext } from "../navigation/designerObjectProvider";

const DesignInfo = ({ navigation, route }) => {
  const { orderId, numberOfOutfits } = route.params;
  const addItemModalRef = useRef(null);
  const { design, setDesign } = useContext(DesingerObjectContext);
  const { userDetails } = useContext(AppObjectContext);

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

  const handleSendToCustomer = async () => {
    if (numberOfOutfits > design.design[0].items.length) {
      print(numberOfOutfits, design.design[0].items.length)
      Alert.alert(
        "Error",
        `Please add ${numberOfOutfits} outfits before sending to customer.`
      );
      return;
    }
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
            "Content-Type": "application/json", // Ensure Content-Type is set
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Order approved successfully.");
        navigation.pop(2);
      } else {
        Alert.alert("Error", "Failed to approve the order.");
      }
    } catch (error) {
      console.error("Error sending order to customer:", error);
    }
  };

  const handleDeleteItem = async (itemId, url) => {
    const requestBody = {
      orderId: orderId,
      url: url,
    };
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/remove-design`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
            "Content-Type": "application/json", // Ensure Content-Type is set
          },
        }
      );
      if (response.status === 200) {
        // Remove the item from the `items` array
        const updatedItems = design.design[0].items.filter(
          (item) => item._id !== itemId
        );

        // Update the design with the new items list
        setDesign((prevDesign) => ({
          ...prevDesign,
          design: [
            {
              ...prevDesign.design[0],
              items: updatedItems, // Update items
            },
          ],
        }));
      } else {
        Alert.alert("Error", "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* AppBar with Go Back Button */}
      <Appbar.Header style={{ height: "5%" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        {/* Middle Container (Logo) */}
        <View style={styles.middleContainer}>
          <Image
            source={require("../../../data/logo.png")} // Local image using require
            style={styles.image}
          />
        </View>
        <Appbar.Action />
      </Appbar.Header>

      <View style={styles.container}>
        <BackgroundWrapper>
          {/* Scrollable list of outfits */}
          <View style={styles.scrollableListContainer}>
            <ScrollView contentContainerStyle={styles.listContent}>
              {(design.design[0].items || []).map((item) => (
                <List.Item
                  key={item._id}
                  title={item.typeOfCloth}
                  description={item.url}
                  titleStyle={{ fontWeight: "bold", fontSize: 16 }}
                  left={() => (
                    <Image
                      source={
                        item.imageOfCloth
                          ? item.imageOfCloth.startsWith("data:")
                            ? { uri: item.imageOfCloth }
                            : {
                                uri: `data:image/jpeg;base64,${item.imageOfCloth}`,
                              }
                          : null
                      }
                      style={styles.outfitImage}
                    />
                  )}
                  right={() => (
                    <View style={styles.iconButtonContainer}>
                      <IconButton
                        icon="trash-can"
                        size={24}
                        onPress={() => handleDeleteItem(item._id, item.url)} // Delete item on click
                      />
                    </View>
                  )}
                  onPress={() => handleOutfitPress(item.url)}
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
              onPress={() => handleSendToCustomer()}
            >
              Send To Customer
            </Button>
          </View>

          {/* Add Item Modal */}
          <AddItemModal
            ref={addItemModalRef}
            orderId={orderId}
            items={design.design[0].items}
          />
        </BackgroundWrapper>
      </View>
    </SafeAreaView>
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
  },
  addItemButtonText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#fff",
  },
  middleContainer: {
    flexGrow: 1, // This ensures the image takes the remaining space
    alignItems: "center", // Centers the image horizontally
  },
  image: {
    width: 125, // Adjust the size of the image
    height: 25, // Adjust the size of the image
  },
});

export default DesignInfo;
