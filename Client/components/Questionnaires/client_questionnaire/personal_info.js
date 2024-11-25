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
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import BackgroundWrapper from "../../backgroundWrapper";

export default function PersonalInfo({
    navigation,
    setQuestionnaireData,
    questionnaireData,
}) {
    const [fontSize, setFontSize] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

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
        return true;
    };

    const handleNext = () => {
        if (validateInputs()) {
            navigation.navigate("clientLifeStyle");
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
              {Strings.personalInfo}
            </Text>

            {/* Name Field */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={questionnaireData.name}
              onChangeText={(text) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  name: text,
                })
              }
            />

            {/* Age Field */}
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
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
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={questionnaireData.gender}
                onValueChange={(itemValue) =>
                  setQuestionnaireData({
                    ...questionnaireData,
                    gender: itemValue,
                  })
                }
                style={styles.picker}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            {/* Allergies Field */}
            <Text style={styles.label}>Allergies</Text>
            <TextInput
              style={styles.input}
              value={questionnaireData.allergies}
              onChangeText={(text) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  allergies: text,
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
