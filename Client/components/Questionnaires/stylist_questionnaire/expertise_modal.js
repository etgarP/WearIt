import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { List, Switch } from "react-native-paper";
import { styles } from "../QuestionnaireStyles"; // Adjust path as needed

export default function ExpertiseModal({
  modalVisible,
  setModalVisible,
  expertise,
  setExpertise,
  expertiseOptions,
}) {
  const toggleExpertise = (option) => {
    setExpertise((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  // Render the list of expertise options
  const renderExpertiseOptions = () => {
    return expertiseOptions.map((option) => (
      <List.Item
        key={option}
        title={option}
        style={{ margin: 0, padding: 0 }}
        right={() => (
          <Switch
            value={expertise.includes(option)}
            onValueChange={() => toggleExpertise(option)}
          />
        )}
      />
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select Expertise</Text>
          <ScrollView>{renderExpertiseOptions()}</ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
