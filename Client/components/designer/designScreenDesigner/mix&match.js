import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { DesingerObjectContext } from "../navigation/designerObjectProvider";

const MixAndMatch = ({ navigation }) => {
  const { design } = useContext(DesingerObjectContext);
  const [selectedImage, setSelectedImage] = useState(design?.beforeImage || null);

  // // Filter clothes that have 'imageOfWornCloth'
  const clothes = design?.items?.filter((item) => item.imageOfWornCloth) || [];
  return (
    <View style={styles.container}>
      {/* Top Appbar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Mix & Match" />
      </Appbar.Header>

      {/* Model Image */}
      <View style={styles.modelContainer}>
        <Image
          source={
            selectedImage
              ? selectedImage.startsWith("data:")
                ? { uri: selectedImage }
                : {
                    uri: `data:image/jpeg;base64,${selectedImage}`,
                  }
              : null // Fallback image if no image is provided
          }
          style={styles.modelImage}
        />
      </View>

      {/* Scrollable Clothes Section */}
      <View style={styles.scrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {clothes.map((item) => (
            <TouchableOpacity
              key={item._id} // Add unique key here
              style={styles.plusButton}
              onPress={() => {
                if (selectedImage != item.imageOfWornCloth) {
                  setSelectedImage(item.imageOfWornCloth);
                } else {
                  setSelectedImage(design.beforeImage);
                }
              }} // Update image when pressed
            >
              <Image
                source={
                  item.imageOfCloth
                    ? item.imageOfCloth.startsWith("data:")
                      ? { uri: item.imageOfCloth }
                      : {
                          uri: `data:image/jpeg;base64,${item.imageOfCloth}`,
                        }
                    : null // Fallback image if no image is provided
                }
                style={styles.clothesImage}
              />
            </TouchableOpacity>
          ))}

          {/* Plus Button */}
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigation.navigate("ChooseOutfit")}
          >
            <IconButton icon="plus" size={30} color="black" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  modelContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modelImage: {
    width: 200,
    height: 400,
    resizeMode: "contain",
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  clothesImage: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  plusButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    width: 80,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 40,
  },
});

export default MixAndMatch;
