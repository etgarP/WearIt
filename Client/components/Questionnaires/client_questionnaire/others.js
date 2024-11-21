import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { constants } from "../../../constants/api";

export default function Others({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [other, setOther] = useState(questionnaireData.other || "");
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);

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

  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

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
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Update questionnaireData with preferences
        setQuestionnaireData({
          ...questionnaireData,
          other: other,
        });

        // Navigate to the next screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // The index of the route you want to show
            routes: [{ name: "client" }], // Replace with your home screen's name
          })
        );
      } else {
        console.error("Error sending data:", response.statusText);
        Alert.alert("Error", "Failed to send data. Please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert(
        "Error",
        "Failed to send data. Please check your network connection."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Icon
          name="check-circle"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle-outline"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { fontSize: fontSize }]}>
          {Strings.othersTitle}
        </Text>

        {/* Label and Input for Preferences */}
        <Text style={styles.label}>Preferences</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your preferences"
          value={other}
          onChangeText={setOther} // Update state on text change
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Measurements")}>
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
  );
}

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
