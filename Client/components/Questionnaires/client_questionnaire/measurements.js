import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";

export default function Measurements({
  navigation,
  setQuestionnaireData,
  questionnaireData,
}) {
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  const [shoulders, setShoulders] = useState(
    questionnaireData.measurements.shoulders || ""
  ); // Initialize with existing data
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

  const validateAndProceed = () => {
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
        "Measurements Optional",
        "You can proceed without entering measurements but you will have to do it later."
      );
    }

    // Update questionnaireData with measurements
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

    // Navigate to the next screen
    navigation.navigate("Others");
  };

  const iconSize = Math.min(dimensions.width, dimensions.height) * 0.1;

  return (
    <BackgroundWrapper>
      <ScrollView style={styles.container}>
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
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: fontSize }]}>
            {Strings.measurementTitle}
          </Text>

          {/* Labels for the measurement fields */}
          <Text style={styles.label}>Shoulders (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={shoulders}
            onChangeText={setShoulders}
          />

          <Text style={styles.label}>Bust (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={bust}
            onChangeText={setBust}
          />

          <Text style={styles.label}>Waist (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={waist}
            onChangeText={setWaist}
          />

          <Text style={styles.label}>Hips (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={hips}
            onChangeText={setHips}
          />

          <Text style={styles.label}>Thighs (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={thighs}
            onChangeText={setThighs}
          />

          <Text style={styles.label}>Calves (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={calves}
            onChangeText={setCalves}
          />

          <Text style={styles.label}>Legs (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={legs}
            onChangeText={setLegs}
          />
        </View>
      </ScrollView>
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

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
