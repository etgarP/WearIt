import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import axios from "axios";
import { constants } from "../../../constants/api";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import { DesingerObjectContext } from "../navigation/designerObjectProvider";
import { Strings } from "../../../constants/strings";

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
          <Text style={styles.headerText}>{Strings.addNewItem}</Text>
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
              {Strings.invalidLink}
            </Text>
          )}
        </View>
        <Text style={styles.subtitle}>{Strings.typeOfOutfit}</Text>
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
          {Strings.addItemButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const AddItemModal = forwardRef(({ orderId }, ref) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [itemLink, setItemLink] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const { userDetails } = useContext(AppObjectContext);
  const { setDesign } = useContext(DesingerObjectContext);

  // Check if the URL is valid (starts with "https://www.everlane.com/products/")
  const isLinkValid = itemLink.startsWith(Strings.everlaneUrl);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setItemLink("");
    setSelectedType(null);
  };

  const handleTypeSelection = (type) => {
    console.log(type);
    setSelectedType(type);
  };

  const addItem = async () => {
    // Your logic to handle item addition
    const requestBody = {
      orderId,
      url: itemLink,
      typeOfCloth: selectedType,
    };
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/add-design`,
        requestBody,
        { headers: { Authorization: `Bearer ${userDetails.token}` } }
      );
      if (response.status === 200) {
        const updatedItems = response.data.items;
        setDesign((prevDesign) => ({
          ...prevDesign, // Spread the previous design object
          design: [
            {
              ...prevDesign.design[0], // Spread the first design object to keep other fields intact
              items: updatedItems, // Update only the items field
            },
          ],
        }));
      } else {
        Alert.alert("Error", "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding design:", error);
    }
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
  },
});

export default AddItemModal;
