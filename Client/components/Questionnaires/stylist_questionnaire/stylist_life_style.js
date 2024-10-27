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

export default function StylistLifeStyle({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  const [city, setCity] = useState(questionnaireData.city || "");
  const [religion, setReligion] = useState(questionnaireData.religion || "");
  const [specialization, setSpecialization] = useState(
    questionnaireData.specialization || []
  );
  const [modalVisible, setModalVisible] = useState(false);

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
    return true;
  };

  const handleNext = () => {
    if (validateInputs()) {
      setQuestionnaireData({
        ...questionnaireData,
        city,
        religion,
        specialization,
      });
      navigation.navigate("QuestionnairePicture", { isClient: false });
    }
  };

  const toggleExpertise = (option) => {
    setSpecialization((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

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
    <View style={styles.container}>
      <View style={styles.head}>
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
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle-outline"
          color={Colors.check_circle_off}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle-outline"
          color={Colors.check_circle_off}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle-outline"
          color={Colors.check_circle_off}
          iconSize={iconSize}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { fontSize: fontSize }]}>
          {Strings.lifestyleTitle}
        </Text>

        {/* City Field */}
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => {
            setCity(text);
            setQuestionnaireData({
              ...questionnaireData,
              city: text,
            });
          }}
        />

        {/* Religion Field */}
        <Text style={styles.label}>Religion</Text>
        <TextInput
          style={styles.input}
          value={religion}
          onChangeText={(text) => {
            setReligion(text);
            setQuestionnaireData({
              ...questionnaireData,
              religion: text,
            });
          }}
        />

        {/* Expertise Selection */}
        <Text style={styles.label}>Expertise</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.expertiseText}>Select Expertise</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Expertise Selection */}
      <ExpertiseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        specialization={specialization}
        setSpecialization={setSpecialization}
        specializationOptions={specializationOptions}
      />

      <View style={styles.footer}>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("stylistInfo")}>
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
