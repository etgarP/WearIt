import React, { useState, useEffect, useContext } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../questionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";
import {
  getQuestionnaireInfo,
  getQuestionnaireProfile,
} from "../../designer/apiService";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";

export default function StylistInfo({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const { userDetails } = useContext(AppObjectContext);

  const updateQuestionnaireData = async () => {
    try {
      const [infoData, profileData] = await Promise.all([
        getQuestionnaireInfo({ userDetails }),
        getQuestionnaireProfile({ userDetails }),
      ]);

      // Make sure that if the user is a new user, the data is empty
      if (
        infoData.name == "Default Designer" &&
        profileData.name == "Default Designer"
      ) {
        return;
      }
      // Merge the data from both endpoints and update state once
      setQuestionnaireData((prevData) => ({
        ...prevData,
        ...infoData,
        ...profileData,
        age: infoData.age ? infoData.age.toString() : prevData.age, // Ensure age is a string
        pricePerItem: profileData.pricePerItem
          ? profileData.pricePerItem.toString()
          : prevData.pricePerItem, // Ensure price is a string
      }));
    } catch (error) {
      Alert.alert("Error", "Failed to update questionnaire data.");
    }
  };

  useEffect(() => {
    updateQuestionnaireData();
    const onChange = ({ window }) => {
      setDimensions(window);
      calculateFontSize(window);
    };

    onChange({ window: Dimensions.get("window") });

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

  const validateInputs = () => {
    if (!questionnaireData.name.trim()) {
      Alert.alert("Validation Error", "Name is required.");
      return false;
    }
    if (
      !questionnaireData.age ||
      isNaN(questionnaireData.age) ||
      questionnaireData.age <= 0
    ) {
      Alert.alert("Validation Error", "Please enter a valid age.");
      return false;
    }
    if (!questionnaireData.gender) {
      Alert.alert("Validation Error", "Please select a gender.");
      return false;
    }

    // Check if price is empty or invalid
    if (
      !questionnaireData.pricePerItem ||
      isNaN(questionnaireData.pricePerItem) ||
      parseFloat(questionnaireData.pricePerItem) <= 0
    ) {
      Alert.alert(
        "Notice",
        "Price is empty or invalid, setting default price to $5."
      );
      setQuestionnaireData({
        ...questionnaireData,
        pricePerItem: "5", // Setting default price
      });
    }

    return true;
  };

  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate("stylistLifeStyle");
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
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

        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.stylistInfo}
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
            label={Strings.ageLabel}
            mode="outlined"
            value={questionnaireData.age}
            onChangeText={(text) =>
              setQuestionnaireData({
                ...questionnaireData,
                age: text,
              })
            }
            keyboardType="numeric"
          />

          {/* Gender Field */}
          <Text style={styles.label}>Gender</Text>
          <RadioButton.Group
            onValueChange={(value) =>
              setQuestionnaireData({
                ...questionnaireData,
                gender: value,
              })
            }
            value={questionnaireData.gender}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton.Item label="Male" value="Male" />
              <RadioButton.Item label="Female" value="Female" />
              <RadioButton.Item label="Other" value="Other" />
            </View>
          </RadioButton.Group>

          {/* Allergies Field */}
          <TextInput
            style={styles.input}
            label={Strings.pricePerItemLabel}
            mode="outlined"
            value={questionnaireData.pricePerItem}
            onChangeText={(number) =>
              setQuestionnaireData({
                ...questionnaireData,
                pricePerItem: number,
              })
            }
          />
        </View>

        <View style={styles.footer}>
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

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
