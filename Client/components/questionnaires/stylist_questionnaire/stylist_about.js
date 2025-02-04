import React, { useState, useEffect, useContext } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../questionnaireStyles";
import { Strings } from "../../../constants/strings";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { constants } from "../../../constants/api";
import BackgroundWrapper from "../../backgroundWrapper";

export default function StylistAbout({
  appNavigator,
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [charCount, setCharCount] = useState(
    questionnaireData?.bio?.length || 0
  );
  const charLimit = 250;

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

  // Function to handle text input change with character limit validation
  const handleStylistAboutChange = (text) => {
    if (text.length <= charLimit) {
      setQuestionnaireData({
        ...questionnaireData,
        bio: text,
      });
      setCharCount(text.length); // Update character count
    }
  };

  const sendRequests = async () => {
    // Prepare data to be sent to the server
    const info = {
      name: questionnaireData.name,
      gender: questionnaireData.gender,
      city: questionnaireData.city,
      religion: questionnaireData.religion,
      age: questionnaireData.age,
      specialization: questionnaireData.specialization,
    };

    const profile = {
      name: questionnaireData.name,
      specialization: questionnaireData.specialization,
      bio: questionnaireData.bio,
      image: questionnaireData.image,
      pricePerItem: questionnaireData.pricePerItem,
    };

    try {
      const infoResponse = await fetch(
        `${constants.designerBaseAddress}info/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      const profileResponse = await fetch(
        `${constants.designerBaseAddress}profile/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );

      // Check if the request was successful
      if (infoResponse.ok && profileResponse.ok) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // The index of the route you want to show
            routes: [{ name: "designer" }], // Replace with your home screen's name
          })
        );
      } else {
        console.error("Error sending data:", infoResponse.statusText);
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

  const handleNext = async () => {
    await sendRequests();
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
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
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.aboutTitle}
          </Text>

          {/* Label and Input for Preferences */}
          <TextInput
            style={styles.input}
            label={Strings.bioLabel}
            mode="outlined"
            placeholder="Enter your preferences"
            value={questionnaireData.bio}
            onChangeText={handleStylistAboutChange} // Update state on text change
            maxLength={charLimit} // Prevents typing more than 300 characters
          />
          <Text style={styles.charCount}>
            {charCount}/{charLimit} characters
          </Text>
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
    </BackgroundWrapper>
  );
}

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
