import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

// The app background image is applied to all screens
const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")} // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Adjust how the image fills the screen
  },
  overlay: {
    flex: 1,
  },
});

export default BackgroundWrapper;
