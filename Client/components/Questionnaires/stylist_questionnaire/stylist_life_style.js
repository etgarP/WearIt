import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    ScrollView,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { styles } from "../QuestionnaireStyles";
import { Strings } from "../../../constants/strings";
import { List, Switch } from "react-native-paper";

export default function StylistLifeStyle({
    navigation,
    setQuestionnaireData,
    questionnaireData,
}) {
    const [fontSize, setFontSize] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    const [city, setCity] = useState(questionnaireData.city || "");
    const [religion, setReligion] = useState(questionnaireData.religion || "");
    const [expertise, setExpertise] = useState(
        questionnaireData.expertise || []
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
        if (expertise.length === 0) {
            Alert.alert(
                "Validation Error",
                "At least one expertise is required."
            );
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
                expertise,
            });
            navigation.navigate("Questionnaire3");
        }
    };

    const toggleExpertise = (option) => {
        setExpertise((prev) => {
            if (prev.includes(option)) {
                return prev.filter((item) => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const expertiseOptions = [
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
                    <Text style={styles.expertiseText}>
                        {expertise.length > 0
                            ? expertise.join(", ")
                            : "Select Expertise"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("stylistInfo")}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.nextContainer}>
                    <TouchableOpacity onPress={handleNext}>
                        <Feather name="arrow-right" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for Expertise Selection */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Select Expertise</Text>
                        <ScrollView>
                            {expertiseOptions.map((option) => (
                                <List.Item
                                    key={option}
                                    title={option}
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                    }} // Set margin to zero
                                    right={(props) => (
                                        <Switch
                                            value={expertise.includes(option)}
                                            onValueChange={() =>
                                                toggleExpertise(option)
                                            }
                                        />
                                    )}
                                />
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const Icon = ({ name, color, iconSize }) => (
    <View style={styles.iconContainer}>
        <MaterialIcons name={name} size={iconSize} color={color} />
    </View>
);
