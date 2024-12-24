import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../questionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";

export default function Measurements({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  // States for font size and screen dimensions
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  // States for individual measurement fields, initialized with existing data
  const [shoulders, setShoulders] = useState(
    questionnaireData.measurements.shoulders || ""
  );
  const [bust, setBust] = useState(questionnaireData.measurements.bust || "");
  const [waist, setWaist] = useState(
    questionnaireData.measurements.waist || ""
  );
  const [hips, setHips] = useState(questionnaireData.measurements.hips || "");
  const [thighs, setThighs] = useState(
    questionnaireData.measurements.thighs || ""
  );
  const [calves, setCalves] = useState(
    questionnaireData.measurements.calves || ""
  );
  const [legs, setLegs] = useState(questionnaireData.measurements.legs || "");

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

  // Function to validate inputs and proceed to the next screen
  const validateAndProceed = () => {
    // Check if any measurement field is empty
    if (
      !shoulders.trim() ||
      !bust.trim() ||
      !waist.trim() ||
      !hips.trim() ||
      !thighs.trim() ||
      !calves.trim() ||
      !legs.trim()
    ) {
      Alert.alert(
        Strings.measurementOptionalTitle, // "Measurements Optional"
        Strings.measurementOptionalMessage // "You can proceed without entering measurements but you will have to do it later."
      );
    }

    // Update questionnaire data with the entered measurements
    setQuestionnaireData({
      ...questionnaireData,
      measurements: {
        shoulders,
        bust,
        waist,
        hips,
        thighs,
        calves,
        legs,
      },
    });

    // Navigate to the "Others" screen
    navigation.navigate("Others");
  };

  // Calculate icon size dynamically
  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

  return (
    <BackgroundWrapper>
      <ScrollView style={styles.container}>
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
        </View>

        {/* Body with measurement inputs */}
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.measurementTitle} {/* "Measurements" */}
          </Text>

          {/* Measurement fields */}
          <TextInput
            style={styles.input}
            label={Strings.shouldersLabel}
            mode="outlined"
            keyboardType="numeric"
            value={shoulders}
            onChangeText={setShoulders}
          />

          <TextInput
            style={styles.input}
            label={Strings.bustLabel}
            mode="outlined"
            keyboardType="numeric"
            value={bust}
            onChangeText={setBust}
          />

          <TextInput
            style={styles.input}
            label={Strings.waistLabel}
            mode="outlined"
            keyboardType="numeric"
            value={waist}
            onChangeText={setWaist}
          />

          <TextInput
            style={styles.input}
            label={Strings.hipsLabel}
            mode="outlined"
            keyboardType="numeric"
            value={hips}
            onChangeText={setHips}
          />

          <TextInput
            style={styles.input}
            label={Strings.thighsLabel}
            mode="outlined"
            keyboardType="numeric"
            value={thighs}
            onChangeText={setThighs}
          />

          <TextInput
            style={styles.input}
            label={Strings.calvesLabel}
            mode="outlined"
            keyboardType="numeric"
            value={calves}
            onChangeText={setCalves}
          />

          <TextInput
            style={styles.input}
            label={Strings.legsLabel}
            mode="outlined"
            keyboardType="numeric"
            value={legs}
            onChangeText={setLegs}
          />
          <View style={styles.padding}></View>
        </View>
      </ScrollView>

      {/* Footer with navigation buttons */}
      <View style={styles.footer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("QuestionnairePicture", { isClient: true })
            }
          >
            <Feather name="arrow-left" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.nextContainer}>
          <TouchableOpacity onPress={validateAndProceed}>
            <Feather name="arrow-right" size={40} color="black" />
          </TouchableOpacity>
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
