import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { Button, IconButton } from "react-native-paper";

const AddItemContent = ({
  closeModal,
  handleTypeSelection,
  selectedType,
  itemLink,
  setItemLink,
  addItem,
  isLinkValid,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add New Item</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Add link"
            value={itemLink}
            onChangeText={setItemLink}
          />
          {/* Show error message if URL is invalid */}
          {!isLinkValid && itemLink.length > 0 && (
            <Text style={styles.errorText}>
              You should insert a valid Everlane link
            </Text>
          )}
        </View>
        <Text style={styles.subtitle}>Type of outfit</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "shirt" && styles.selectedButton,
            ]}
            onPress={() => handleTypeSelection("shirt")}
          >
            <IconButton icon="tshirt-crew" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "pants" && styles.selectedButton,
            ]}
            onPress={() => handleTypeSelection("pants")}
          >
            <IconButton icon="dots-horizontal" size={40} />
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={addItem}
          disabled={!itemLink || !selectedType || !isLinkValid}
          style={[
            styles.addButton,
            (!itemLink || !selectedType || !isLinkValid) &&
              styles.disabledButton,
          ]}
        >
          Add Item
        </Button>
      </View>
    </View>
  );
};

const AddItemModal = forwardRef((props, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemLink, setItemLink] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  // Check if the URL is valid (starts with "https://www.everlane.com/products/")
  const isLinkValid = itemLink.startsWith("https://www.everlane.com/products/");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setItemLink("");
    setSelectedType(null);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const addItem = () => {
    // Your logic to handle item addition
    console.log({ itemLink, type: selectedType });
    closeModal();
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <AddItemContent
        closeModal={closeModal}
        handleTypeSelection={handleTypeSelection}
        selectedType={selectedType}
        itemLink={itemLink}
        setItemLink={setItemLink}
        addItem={addItem}
        isLinkValid={isLinkValid}
      />
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    color: "#000",
  },
  textInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F8F8F8",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedButton: {
    borderColor: "#BA8EF7",
  },
  addButton: {
    backgroundColor: "#BA8EF7",
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
  textInputContainer: {
    marginBottom: 30,
  }
});

export default AddItemModal;
