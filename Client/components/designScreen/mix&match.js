import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { ClientObjectContext } from "../Client/navigation/ClientObjectProvider";
import { clothes } from "../../data/design";

const MixAndMatch = ({ navigation }) => {
  const design = clothes;
  //   const { design } = useContext(ClientObjectContext);
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
          source={require("../../assets/model.png")}
          style={styles.modelImage}
        />
      </View>

      {/* Scrollable Clothes Section */}
      <View style={styles.scrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {design.map((item) => (
            <TouchableOpacity
              key={item.id} // Add unique key here
              style={styles.plusButton}
              onPress={() => console.log("image Pressed")}
            >
              <Image source={item.image} style={styles.clothesImage} />
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
