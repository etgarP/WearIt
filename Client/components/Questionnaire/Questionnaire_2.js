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

export default function Questionnaire_2({ navigation }) {
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
                <TextInput style={styles.input} placeholder="Work type" />
                <TextInput style={styles.input} placeholder="City" />
                <TextInput style={styles.input} placeholder="Religion" />
            </View>
            <View style={styles.footer}>
                <View style={styles.backContainer}>
                    <TouchableOpacity onPress={null}>
                        <Feather name="arrow-left" size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.nextContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Questionnaire3")}>
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
