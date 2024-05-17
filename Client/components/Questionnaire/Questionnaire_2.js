import React from "react";
import { Text, View, Dimensions, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../colors";
import { useState } from "react";
import { styles } from "./QuestionnaireStyles";
import { useFonts } from "expo-font";

export default function Questionnaire() {
    useFonts({
        kalam: require("../../assets/fonts/Kalam-Regular.ttf"),
    });

    const [fontSize1, setFontSize1] = useState(0);
    const calculateFontSize = () => {
        const calculatedFontSize = Math.min(width, height) * 0.1;
        setFontSize1(calculatedFontSize);
    };

    const { width, height } = Dimensions.get("window");
    const iconSize = Math.min(width, height) * 0.1;
    return (
        <View style={styles.container} onLayout={calculateFontSize}>
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
                <Text
                    style={[
                        styles.title,
                        { fontSize: fontSize1 },
                        { fontFamily: "kalam" },
                    ]}>
                    LifeStyle
                </Text>
                <TextInput style={styles.input} placeholder="Work type" />
                <TextInput style={styles.input} placeholder="City" />
                <TextInput style={styles.input} placeholder="Religion" />
            </View>
            <View style={styles.footer}></View>
        </View>
    );
}

const Icon = ({ name, color, iconSize }) => (
    <View style={styles.iconContainer}>
        <MaterialIcons name={name} size={iconSize} color={color} />
    </View>
);
