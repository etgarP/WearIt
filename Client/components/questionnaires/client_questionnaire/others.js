import React, { useState, useEffect, useContext } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { constants } from "../../../constants/api";
import BackgroundWrapper from "../../backgroundWrapper";

export default function Others({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  // States for font size and screen dimensions
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  // State for "other" preferences field
  const [other, setOther] = useState(questionnaireData.other || "");

  // Get user token from context
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);

  // Effect to handle screen size changes and font size calculation
  useEffect(() => {
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

  // Function to calculate font size dynamically based on screen size
  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  // Calculate icon size dynamically
  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

  // Function to handle the "Next" button click
  const handleNext = async () => {
    // Prepare data to be sent to the server
    const data = {
      ...questionnaireData,
      other: other,
    };

    try {
      const response = await fetch(
        `${constants.clientBaseAddress}matches/info`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include authorization token
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send data as JSON
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Update questionnaire data with "other" preferences
        setQuestionnaireData({
          ...questionnaireData,
          other: other,
        });

        // Navigate to the client screen and reset navigation stack
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // Index of the route to display
            routes: [{ name: Strings.clientScreen }], // Replace with your home screen's name
          })
        );
      } else {
        console.error("Error sending data:", response.statusText);
        Alert.alert(Strings.errorTitle, Strings.errorSendingDataMessage);
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert(Strings.errorTitle, Strings.networkErrorMessage);
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Header with progress icons */}
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
        </View>

        {/* Body with input field for preferences */}
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.othersTitle} {/* "Other Preferences" */}
          </Text>

          {/* Label and Input for Preferences */}
          <TextInput
            style={styles.input}
            label={Strings.preferencesLabel}
            mode="outlined"
            placeholder={Strings.preferencesPlaceholder}
            value={other}
            onChangeText={setOther} // Update state on text change
          />
        </View>

        {/* Footer with navigation buttons */}
        <View style={styles.footer}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Measurements")}
            >
              <Feather name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
          </View>
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

// Reusable icon component
const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
