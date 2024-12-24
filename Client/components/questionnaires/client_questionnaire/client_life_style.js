import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../questionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";

export default function ClientLifeStyle({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0); // Dynamic font size for the title
  const [dimensions, setDimensions] = useState(Dimensions.get("window")); // Current window dimensions

  const [work, setWork] = useState(questionnaireData.work || ""); // Work type input state
  const [city, setCity] = useState(questionnaireData.city || ""); // City input state
  const [religion, setReligion] = useState(questionnaireData.religion || ""); // Religion input state

  useEffect(() => {
    // Update dimensions and font size when the window size changes
    const onChange = ({ window }) => {
      setDimensions(window);
      calculateFontSize(window);
    };

    // Initial calculation
    onChange({ window: Dimensions.get("window") });

    // Listen for dimension changes
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove(); // Clean up listener
    };
  }, []);

  // Calculate font size as a percentage of the smaller screen dimension
  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1; // Dynamic icon size

  // Validate that all input fields are filled
  const validateInputs = () => {
    if (!work.trim()) {
      Alert.alert(Strings.validationErrorTitle, Strings.validationWorkRequired);
      return false;
    }
    if (!city.trim()) {
      Alert.alert(Strings.validationErrorTitle, Strings.validationCityRequired);
      return false;
    }
    if (!religion.trim()) {
      Alert.alert(
        Strings.validationErrorTitle,
        Strings.validationReligionRequired
      );
      return false;
    }
    return true;
  };

  // Handle navigation to the next screen with updated questionnaire data
  const handleNext = () => {
    if (validateInputs()) {
      setQuestionnaireData({
        ...questionnaireData,
        work,
        city,
        religion,
      });
      navigation.navigate("QuestionnairePicture", { isClient: true });
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Progress indicators */}
        <View style={styles.head}>
          <Icon
            name="check-circle"
            color={Colors.check_circle_on}
            iconSize={iconSize}
          />
          <Icon
            name="horizontal-rule"
            color={Colors.line}
            iconSize={iconSize}
          />
          <Icon
            name="check-circle-outline"
            color={Colors.check_circle_on}
            iconSize={iconSize}
          />
          <Icon
            name="horizontal-rule"
            color={Colors.line}
            iconSize={iconSize}
          />
          <Icon
            name="check-circle-outline"
            color={Colors.check_circle_off}
            iconSize={iconSize}
          />
          <Icon
            name="horizontal-rule"
            color={Colors.line}
            iconSize={iconSize}
          />
          <Icon
            name="check-circle-outline"
            color={Colors.check_circle_off}
            iconSize={iconSize}
          />
          <Icon
            name="horizontal-rule"
            color={Colors.line}
            iconSize={iconSize}
          />
          <Icon
            name="check-circle-outline"
            color={Colors.check_circle_off}
            iconSize={iconSize}
          />
        </View>

        {/* Main content */}
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.lifestyleTitle}
          </Text>

          {/* Work Type Input */}
          <TextInput
            style={styles.input}
            value={work}
            label={Strings.workLabel}
            mode="outlined"
            onChangeText={(text) => {
              setWork(text);
              setQuestionnaireData({
                ...questionnaireData,
                work: text,
              });
            }}
          />

          {/* City Input */}
          <TextInput
            style={styles.input}
            value={city}
            label={Strings.cityLabel}
            mode="outlined"
            onChangeText={(text) => {
              setCity(text);
              setQuestionnaireData({
                ...questionnaireData,
                city: text,
              });
            }}
          />

          {/* Religion Input */}
          <TextInput
            style={styles.input}
            value={religion}
            label={Strings.religionLabel}
            mode="outlined"
            onChangeText={(text) => {
              setReligion(text);
              setQuestionnaireData({
                ...questionnaireData,
                religion: text,
              });
            }}
          />
        </View>

        {/* Footer with navigation buttons */}
        <View style={styles.footer}>
          {/* Back Button */}
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("personalInfo")}
            >
              <Feather name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
          </View>
          {/* Next Button */}
          <View style={styles.nextContainer}>
            <TouchableOpacity onPress={handleNext}>
              <Feather name="arrow-right" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
}

// Reusable Icon component
const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
