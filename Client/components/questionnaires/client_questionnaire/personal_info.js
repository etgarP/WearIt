import React, { useState, useEffect, useContext } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import { TextInput, RadioButton } from "react-native-paper"; // Import RadioButton from React Native Paper
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../questionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { getQuestionnaireData } from "../../../apiServices/client/getQuestionnaireData";

export default function PersonalInfo({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0); // Dynamic font size for the title
  const [dimensions, setDimensions] = useState(Dimensions.get("window")); // Current window dimensions
  const { userDetails } = useContext(AppObjectContext); // Context for user details

  // Fetch and update questionnaire data
  const updateQuestionnaireData = async () => {
    try {
      const response = await getQuestionnaireData({ userDetails });

      // Ensure valid response before updating state
      if (!response || response.status !== 200) return;

      const data = response.data;

      // Handle measurement data ensuring null values are preserved
      if (data.measurements) {
        const updatedMeasurements = {};
        Object.keys(data.measurements).forEach((key) => {
          updatedMeasurements[key] =
            data.measurements[key] !== null
              ? data.measurements[key].toString()
              : null;
        });
        data.measurements = updatedMeasurements;
      }

      // Update state with merged data
      setQuestionnaireData((prevData) => ({
        ...prevData,
        ...data,
        age: data.age ? data.age.toString() : prevData.age, // Ensure age is a string
      }));
    } catch (error) {
      Alert.alert(Strings.errorUpdatingData);
    }
  };

  useEffect(() => {
    // Fetch data and set up dimension listener
    updateQuestionnaireData();
    const onChange = ({ window }) => {
      setDimensions(window);
      calculateFontSize(window);
    };

    // Initial setup
    onChange({ window: Dimensions.get("window") });

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove(); // Clean up listener
    };
  }, []);

  // Calculate font size as a percentage of the smaller dimension
  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1; // Dynamic icon size

  // Validate that all required inputs are filled
  const validateInputs = () => {
    if (!questionnaireData.name.trim()) {
      Alert.alert(Strings.validationErrorTitle, Strings.validationNameRequired);
      return false;
    }
    if (
      !questionnaireData.age ||
      isNaN(questionnaireData.age) ||
      questionnaireData.age <= 0
    ) {
      Alert.alert(Strings.validationErrorTitle, Strings.validationAgeRequired);
      return false;
    }
    if (!questionnaireData.gender) {
      Alert.alert(
        Strings.validationErrorTitle,
        Strings.validationGenderRequired
      );
      return false;
    }
    return true;
  };

  // Navigate to the next screen if inputs are valid
  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate("clientLifeStyle");
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Progress indicators */}
        <View style={styles.head}>
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
            {Strings.personalInfo}
          </Text>

          {/* Name Field */}
          <TextInput
            style={styles.input}
            label={Strings.nameLabel}
            mode="outlined"
            value={questionnaireData.name}
            onChangeText={(text) =>
              setQuestionnaireData({
                ...questionnaireData,
                name: text,
              })
            }
          />

          {/* Age Field */}
          <TextInput
            style={styles.input}
            value={questionnaireData.age}
            label={Strings.ageLabel}
            mode="outlined"
            onChangeText={(text) =>
              setQuestionnaireData({
                ...questionnaireData,
                age: text,
              })
            }
            keyboardType="numeric"
          />

          {/* Gender Field */}
          <Text style={styles.label}>{Strings.genderLabel}</Text>
          <RadioButton.Group
            onValueChange={(value) =>
              setQuestionnaireData({ ...questionnaireData, gender: value })
            }
            value={questionnaireData.gender}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton.Item label={Strings.genderMale} value="Male" />
              <RadioButton.Item label={Strings.genderFemale} value="Female" />
              <RadioButton.Item label={Strings.genderOther} value="Other" />
            </View>
          </RadioButton.Group>

          {/* Allergies Field */}
          <TextInput
            style={styles.input}
            value={questionnaireData.allergies}
            label={Strings.allergiesLabel}
            mode="outlined"
            onChangeText={(text) =>
              setQuestionnaireData({
                ...questionnaireData,
                allergies: text,
              })
            }
          />
        </View>

        {/* Footer with navigation buttons */}
        <View style={styles.footer}>
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
