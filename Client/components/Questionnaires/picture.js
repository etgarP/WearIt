import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { styles } from "./QuestionnaireStyles";
import * as ImagePicker from "expo-image-picker";
import { Strings } from "../../constants/strings";

export default function Questionnaire_picture({
  navigation,
  setQuestionnaireData,
  questionnaireData,
  route,
}) {
  const { isClient } = route.params;
  const [fontSize, setFontSize] = useState(0);
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [image, setImage] = useState(questionnaireData.image || null); // Initialize with the value from questionnaireData

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

  // Calculate font size
  const calculateFontSize = (window) => {
    const calculatedFontSize = Math.min(window.width, window.height) * 0.1;
    setFontSize(calculatedFontSize);
  };

  // Request access to gallery
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need camera roll permissions to access images!"
      );
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 6], // Aspect ratio for full-body photos
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setQuestionnaireData({
        ...questionnaireData,
        image: result.assets[0].uri,
      }); // Update questionnaireData
    }
  };

  const validateAndProceed = () => {
    // Allow user to proceed without an image, but show a message.
    if (!image) {
      Alert.alert(
        "No Image Selected",
        "You can proceed without an image, but it's recommended to upload one."
      );
    }
    // Navigate to the next screen with the image (if selected)
    console.log(isClient);
    if (isClient) {
      navigation.navigate("Measurements");
    } else {
      navigation.navigate("stylistAbout");
    }
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
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle"
          color={Colors.check_circle_on}
          iconSize={iconSize}
        />
        <Icon name="horizontal-rule" color={Colors.line} iconSize={iconSize} />
        <Icon
          name="check-circle"
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
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { fontSize: fontSize }]}>
          {Strings.pictureTitle}
        </Text>

        {/* Image Upload Label */}
        <Text style={styles.label}>Upload Full-Body Image (Optional)</Text>
        <View style={styles.previewContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text>{Strings.imagePlaceholder}</Text>
          )}
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.pictureBtn}>
          <Text style={styles.pictureBtnText}>{Strings.pictureBtn}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() =>
              isClient
                ? navigation.navigate("clientLifeStyle")
                : navigation.navigate("stylistLifeStyle")
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
    </View>
  );
}

const Icon = ({ name, color, iconSize }) => (
  <View style={styles.iconContainer}>
    <MaterialIcons name={name} size={iconSize} color={color} />
  </View>
);
