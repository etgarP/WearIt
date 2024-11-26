import React from "react";
import { Dimensions, View, Text, ScrollView, StyleSheet } from "react-native";
import { Avatar, Chip } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");

const DesignerProfile = ({ navigation, profile, isDesigner }) => {
  const { image, name, bio, reviews = [], specialization = [] } = profile;

  let averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.number, 0) / reviews.length
      : "No reviews yet";

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        {!isDesigner && (
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            style={styles.arrowIcon}
            onPress={() => navigation.goBack()}
          />
        )}
        {isDesigner && (
          <MaterialCommunityIcons
            name="pencil"
            size={30}
            style={styles.pencilIcon}
            onPress={() => {
              navigation.navigate("stylistQuestionnaire");
            }}
          />
        )}
      </View>

      <View style={styles.banner}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={
              image
                ? image.startsWith("data:")
                  ? { uri: image }
                  : { uri: `data:image/jpeg;base64,${image}` }
                : null
            }
            style={styles.avatar}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.bio}>{bio}</Text>
        <Text style={styles.averageRating}>Specializations</Text>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="gray"
            style={styles.scrollArrow}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.specializationScroll}
          >
            {specialization.map((item, index) => (
              <View key={index} style={styles.specializationItem}>
                <Chip style={styles.chip}>{item}</Chip>
              </View>
            ))}
          </ScrollView>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="gray"
            style={styles.scrollArrow}
          />
        </View>

        <Text style={styles.averageRating}>
          Average Rating:{" "}
          {typeof averageRating === "string"
            ? averageRating
            : averageRating.toFixed(1)}
        </Text>

        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          style={styles.reviewsScroll}
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text style={styles.reviewText}>{review.review}</Text>
                <View style={styles.rating}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <MaterialCommunityIcons
                      key={idx}
                      name="star"
                      size={24}
                      color={idx < review.number ? "black" : "gray"}
                    />
                  ))}
                </View>
              </View>
            ))
          ) : (
            <Text>No reviews yet.</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    width: width,
    paddingTop: "30%",
    backgroundColor: "#eee8f4",
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    position: "absolute",
    top: 60,
    left: 10,
  },
  pencilIcon: {
    position: "absolute",
    top: 60,
    left: 340,
  },
  innerContainer: {
    flex: 1,
    padding: 13,
  },
  banner: {
    height: height * 0.08,
    backgroundColor: "#eee8f4",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: -80,
  },
  name: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bio: {
    textAlign: "center",
    marginTop: 100,
    marginVertical: 64,
  },
  specializationScroll: {
    marginTop: 10,
    marginBottom: 10,
  },
  specializationItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  chip: {
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 10,
  },
  averageRating: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: 16,
  },
  reviewsScroll: {
    marginBottom: 16,
    maxHeight: 150,
  },
  reviewItem: {
    width: 120,
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    position: "relative",  // Ensure positioning of stars is relative to this container
  },
  reviewText: {
    marginBottom: 8,
    textAlign: "center",
  },
  rating: {
    position: "absolute",  // Position the stars at the bottom of the review container
    bottom: 8,  // Adjust the distance from the bottom
    flexDirection: "row",
    justifyContent: "space-evenly", // Evenly distribute the stars
    width: "100%",  // Ensure stars span the full width of the review container
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollArrow: {
    marginHorizontal: 10,
  },
});

export default DesignerProfile;
