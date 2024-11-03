import React from "react";
import { Dimensions, View, Text, ScrollView, StyleSheet } from "react-native";
import { Avatar, Chip } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");

const DesignerProfile = ({ navigation, profile, isDesigner }) => {
  const { image, name, bio, reviews = [], specialization = [] } = profile;

  let averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : "No reviews yet";

  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          style={styles.arrowIcon} // Updated style reference
          onPress={() => navigation.goBack()}
        />
        {isDesigner && (
          <MaterialCommunityIcons
            name="pencil"
            size={30}
            style={styles.pencilIcon}
            onPress={() => {
              // Handle edit functionality here
              console.log("Edit pressed");
            }}
          />
        )}
      </View>

      <View style={styles.banner}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={100} source={{ uri: image }} />
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
              <Chip key={index} style={styles.chip}>
                {item}
              </Chip>
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
          showsHorizontalScrollIndicator={false}
          style={styles.reviewsScroll}
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View key={index} style={styles.reviewContainer}>
                <Text style={styles.reviewText}>{review.reviewText}</Text>
                <View style={styles.rating}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <MaterialCommunityIcons
                      key={idx}
                      name="star"
                      size={24}
                      color={idx < review.rating ? "black" : "gray"}
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
    backgroundColor: "#fff",
  },
  appbar: {
    width: width,
    paddingTop: "30%", // You might need to adjust this
    backgroundColor: "#eee8f4",
    flexDirection: "row", // Ensure the appbar has row layout
    alignItems: "center", // Center icons vertically
  },
  arrowIcon: {
    position: "absolute",
    top: 60, // Ensure the vertical alignment matches the pencil icon
    left: 10,
  },
  pencilIcon: {
    position: "absolute",
    top: 60, // Ensure the vertical alignment matches the pencil icon
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
  chip: {
    marginHorizontal: 5,
    backgroundColor: "#e0f7fa",
  },
  averageRating: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: 16,
  },
  reviewsScroll: {
    flexDirection: "row",
    marginBottom: 16,
    maxHeight: 150,
  },
  reviewContainer: {
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  reviewText: {
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DesignerProfile;
