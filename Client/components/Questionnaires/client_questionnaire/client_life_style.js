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

export default function ClientLifeStyle({
    navigation,
    setQuestionnaireData,
    questionnaireData,
}) {
    const [fontSize, setFontSize] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    const [work, setWork] = useState(questionnaireData.work || "");
    const [city, setCity] = useState(questionnaireData.city || "");
    const [religion, setReligion] = useState(questionnaireData.religion || "");

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
        if (!work.trim()) {
            Alert.alert("Validation Error", "Work type is required.");
            return false;
        }
        if (!city.trim()) {
            Alert.alert("Validation Error", "City is required.");
            return false;
        }
        if (!religion.trim()) {
            Alert.alert("Validation Error", "Religion is required.");
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateInputs()) {
            setQuestionnaireData({
                ...questionnaireData,
                work: work,
                city,
                religion,
            });
            navigation.navigate("QuestionnairePicture", { isClient: true });
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
            <View style={styles.body}>
                <Text style={[styles.title, { fontSize: fontSize }]}>
                    {Strings.lifestyleTitle}
                </Text>

                {/* Work Type Field */}
                <Text style={styles.label}>Work Type</Text>
                <TextInput
                    style={styles.input}
                    value={work}
                    onChangeText={(text) => {
                        setWork(text);
                        setQuestionnaireData({
                            ...questionnaireData,
                            work: text,
                        });
                    }}
                />

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
            </View>

            <View style={styles.footer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("personalInfo")}>
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
