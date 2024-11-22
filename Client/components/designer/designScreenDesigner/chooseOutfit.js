import React, { useState, useContext } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Appbar, List, Button, RadioButton } from "react-native-paper";
import { ClientObjectContext } from "../../Client/navigation/ClientObjectProvider";

const ChooseOutfit = ({ navigation }) => {
  const { design, setChosenUrl } = useContext(ClientObjectContext);
  const clothes = design.items;
  // Filter clothes that have dont have 'imageOfWornCloth'
  const outfits = design.items.filter((item) => item.imageOfWornCloth == null);
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);

  const selectOutfit = (id) => {
    setSelectedOutfitId(id);
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
        <Appbar.Content title="Add to Mix & Match" />
      </Appbar.Header>

      {/* Outfit List */}
      <ScrollView style={styles.listContainer}>
        {outfits.map((outfit) => (
          <List.Item
            key={outfit._id}
            title={outfit.typeOfCloth}
            left={() => (
              <Image
                source={{ uri: outfit.imageOfCloth }}
                style={styles.outfitImage}
              />
            )}
            right={() => (
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  value={outfit._id}
                  status={
                    selectedOutfitId === outfit._id ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    selectOutfit(outfit._id);
                    setCurrentUrl(outfit.url);
                  }}
                />
              </View>
            )}
            onPress={() => {
              selectOutfit(outfit._id);
              setCurrentUrl(outfit.url);
            }}
          />
        ))}
      </ScrollView>

      {/* Select Button */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.selectButton}
          labelStyle={{ fontSize: 18 }}
          onPress={() => {
            setChosenUrl(currentUrl);
            navigation.navigate("AILoadingScreen");
          }}
          disabled={selectedOutfitId === null}
        >
          Select
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
  radioButtonContainer: {
    justifyContent: "center", // Vertically center the radio button
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
});

export default ChooseOutfit;
