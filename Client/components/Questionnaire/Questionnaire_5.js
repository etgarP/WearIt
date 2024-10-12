import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { styles } from "./QuestionnaireStyles";
import { Strings } from "../../constants/strings";

export default function Questionnaire_5({
    navigation,
    setQuestionnaireData,
    questionnaireData,
}) {
    const [fontSize, setFontSize] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));
    const [other, setOther] = useState(
        questionnaireData.other || ""
    ); // Initialize with existing data

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

    const handleNext = () => {
        // Update questionnaireData with preferences
        setQuestionnaireData({
            ...questionnaireData,
            other: other,
        });

        // Navigate to the next screen (if applicable)
        navigation.navigate("Home"); // Replace "NextScreen" with the actual next screen name
    };

    return (
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Questionnaire4")}>
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
