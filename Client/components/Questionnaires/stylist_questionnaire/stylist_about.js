import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";

export default function StylistAbout({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [stylistAbout, setStylistAbout] = useState(
    questionnaireData.stylistAbout || ""
  );

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
      name: questionnaireData.name,
      gender: questionnaireData.gender,
      city: questionnaireData.city,
      religion: questionnaireData.religion,
      age: questionnaireData.age,
      specialization: questionnaireData.specialization,
      username: "stylist123",
    };
    console.log(data);

    try {
      const response = await fetch(
        "http://192.168.1.162:12345/api/designer/info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0eWxpc3QxMjMiLCJpYXQiOjE3MzAwNDM4NDF9.f4eMfjwd3yPDUCI75Wu07MN9xzMzutVMECrVBZ2BhWI",
          },
          body: JSON.stringify(data),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        // Update questionnaireData with preferences
        setQuestionnaireData({
          ...questionnaireData,
          stylistAbout: stylistAbout,
        });

        // Navigate to the next screen
        navigation.navigate("Home"); // Replace "Home" with the actual next screen name
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
          {Strings.aboutTitle}
        </Text>

        {/* Label and Input for Preferences */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your preferences"
          value={stylistAbout}
          onChangeText={setStylistAbout} // Update state on text change
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("QuestionnairePicture", { isClient: false })
            }
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
  );
}

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
