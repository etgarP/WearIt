import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import ExpertiseModal from "./expertise_modal";
import BackgroundWrapper from "../../backgroundWrapper";

export default function StylistLifeStyle({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  // State to manage font size and screen dimensions
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  // State to store form inputs
  const [city, setCity] = useState(questionnaireData.city || "");
  const [religion, setReligion] = useState(questionnaireData.religion || "");
  const [specialization, setSpecialization] = useState(
    questionnaireData.specialization || []
  );
  const [modalVisible, setModalVisible] = useState(false); // Controls the visibility of the Expertise modal

  // Dynamically calculate and update font size based on screen dimensions
  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
      calculateFontSize(window);
    };

    // Initialize font size and dimensions
    onChange({ window: Dimensions.get("window") });

    // Listen for changes in screen dimensions
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription?.remove(); // Cleanup listener on unmount
    };
  }, []);

  // Function to calculate a responsive font size
  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  // Calculate icon size dynamically
  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

  // Function to validate the form inputs
  const validateInputs = () => {
    if (!city.trim()) {
      Alert.alert("Validation Error", "City is required.");
      return false;
    }
    if (!religion.trim()) {
      Alert.alert("Validation Error", "Religion is required.");
      return false;
    }
    if (specialization.length === 0) {
      Alert.alert("Validation Error", "At least one expertise is required.");
      return false;
    }
    return true; // All inputs are valid
  };

  // Handle the "Next" button action
  const handleNext = () => {
    // Validate inputs before proceeding
    if (validateInputs()) {
      // Update the questionnaire data with the current form inputs
      setQuestionnaireData({
        ...questionnaireData,
        city,
        religion,
        specialization,
      });

      // Navigate to the next screen
      navigation.navigate("QuestionnairePicture", { isClient: false });
    }
  };

  // List of options for expertise/specialization
  const specializationOptions = [
    "Casual Wear",
    "Formal Wear",
    "Business Casual",
    "Streetwear",
    "Athleisure (sportswear)",
    "Evening & Cocktail Attire",
    "Wedding & Bridal",
    "Vacation & Resort Wear",
    "Plus-Size Fashion",
    "Other",
  ];

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Header: Displays progress indicators */}
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

        {/* Main body: Inputs for city, religion, and expertise */}
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.lifestyleTitle} {/* Title for the screen */}
          </Text>

          {/* City Input Field */}
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={(text) => {
              setCity(text); // Update city state
              setQuestionnaireData({
                ...questionnaireData,
                city: text, // Update questionnaire data
              });
            }}
          />

          {/* Religion Input Field */}
          <Text style={styles.label}>Religion</Text>
          <TextInput
            style={styles.input}
            value={religion}
            onChangeText={(text) => {
              setReligion(text); // Update religion state
              setQuestionnaireData({
                ...questionnaireData,
                religion: text, // Update questionnaire data
              });
            }}
          />

          {/* Expertise Selection */}
          <Text style={styles.label}>Expertise</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.expertiseText}>Select Expertise</Text>
          </TouchableOpacity>
        </View>

        {/* Expertise Modal */}
        <ExpertiseModal
          modalVisible={modalVisible} // Controls modal visibility
          setModalVisible={setModalVisible} // Function to toggle modal
          specialization={specialization} // Current selections
          setSpecialization={setSpecialization} // Function to update selections
          specializationOptions={specializationOptions} // Options to display
        />

        {/* Footer: Navigation buttons */}
        <View style={styles.footer}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("stylistInfo")}
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

// Reusable icon component for progress indicators
const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
