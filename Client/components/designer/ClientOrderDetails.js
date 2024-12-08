import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Text as NativeText,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  List,
  Divider,
  Avatar,
  IconButton,
  Button,
  Appbar,
} from "react-native-paper";
import axios from "axios";
import { AppObjectContext } from "../appNavigation/appObjectProvider";
import { constants } from "../../constants/api";
import { DesingerObjectContext } from "./navigation/designerObjectProvider";
import { Strings } from "../../constants/strings";

const ClientOrderDetails = ({ navigation, route }) => {
  const { order } = route.params;
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const { setDesign, design } = useContext(DesingerObjectContext);
  const [expandedIndex, setExpandedIndex] = useState(null); // For accordion
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [modalContent, setModalContent] = useState(null); // Content for modal

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `${constants.designerBaseAddress}orders/${order._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDesign(response.data);
      } catch (error) {
        Alert.alert(Strings.errorAlertTitle, Strings.errorAlertMessage);
      }
    };
    fetchClientData();
  }, [order._id, token]);

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/acc/${order._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        Alert.alert(Strings.successAlertTitle, Strings.successApproveMessage);
        navigation.replace(route.name, {
          order: { ...order, status: "accepted" },
        });
      }
    } catch (error) {
      Alert.alert(Strings.errorAlertTitle, Strings.errorAlertMessage);
    }
  };

  const handleDeny = async () => {
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/deny/${order._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        Alert.alert(Strings.successAlertTitle, Strings.successDenyMessage);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(Strings.errorAlertTitle, Strings.errorAlertMessage);
    }
  };

  const handleMixAndMatch = () => {
    navigation.navigate("DesignInfo", {
      design: design.design[0],
      orderId: order._id,
      numberOfOutfits: order.numberOfOutfits,
    });
  };

  const showModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  if (!design) {
    return <Text>{Strings.loadingText}</Text>;
  }

  const clientInfo = design.clientInfo[0];

  return (
    <>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            order.status === "pending"
              ? Strings.approveOrDenyTitle
              : Strings.manageClientTitle
          }
        />
      </Appbar.Header>

      {/* Main Content */}
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <List.Item
            title={clientInfo.name}
            left={() => (
              <Avatar.Image
                size={50}
                source={
                  clientInfo.image
                    ? clientInfo.image.startsWith("data:")
                      ? { uri: clientInfo.image }
                      : { uri: `data:image/jpeg;base64,${clientInfo.image}` }
                    : null
                }
              />
            )}
            descriptionStyle={styles.orderRequests}
          />
          <Divider />
        </View>

        {/* Accordion Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{Strings.personalInfoTitle}</Text>
          {[
            {
              title: Strings.personalInfoTitle,
              content: `Age: ${clientInfo.age}\nGender: ${clientInfo.gender}\nAllergies: ${clientInfo.allergies}`,
            },
            {
              title: Strings.measurementsTitle,
              content: `Shoulders: ${clientInfo.measurements.shoulders}\nBust: ${clientInfo.measurements.bust}\nWaist: ${clientInfo.measurements.waist}\nHips: ${clientInfo.measurements.hips}\nThighs: ${clientInfo.measurements.thighs}\nCalves: ${clientInfo.measurements.calves}\nLegs: ${clientInfo.measurements.legs}`,
            },
            { title: Strings.preferencesTitle, content: clientInfo.other },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => showModal(item.title, item.content)}
            >
              <List.Item
                title={item.title}
                right={() => <List.Icon icon="chevron-right" />}
                style={[styles.accordion, styles.orderInfoButton]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{Strings.orderDetailsTitle}</Text>
          <TouchableOpacity
            style={[styles.accordion, styles.orderInfoButton]}
            onPress={() =>
              showModal(
                Strings.orderInformationTitle,
                `${Strings.numberOfOutfitsLabel}: ${order.numberOfOutfits}\n${
                  Strings.isGroupLabel
                }: ${order.isGroup ? "Yes" : "No"}\n${Strings.occasionLabel}: ${
                  order.occasion
                }\n${Strings.statusLabel}: ${order.status}`
              )
            }
          >
            <List.Item
              title={Strings.orderInformationTitle}
              right={() => <List.Icon icon="chevron-right" />}
            />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        {order.status === "pending" ? (
          <View style={styles.buttonContainer}>
            <IconButton
              icon="close-circle-outline"
              size={50}
              iconColor="red"
              onPress={handleDeny}
            />
            <IconButton
              icon="check-circle-outline"
              size={50}
              iconColor="green"
              onPress={handleApprove}
            />
          </View>
        ) : (
          <View style={styles.mixMatchButtonContainer}>
            <Button
              mode="contained"
              onPress={handleMixAndMatch}
              style={styles.mixMatchButton}
            >
              {Strings.manageOutfitsButtonLabel}
            </Button>
          </View>
        )}
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent?.title}</Text>
            <NativeText style={styles.modalText}>
              {modalContent?.content}
            </NativeText>
            <Button onPress={() => setModalVisible(false)}>
              {Strings.closeButtonLabel}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileContainer: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  accordion: {
    backgroundColor: "#e0e0e0",
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  mixMatchButtonContainer: {
    marginTop: 20,
  },
  mixMatchButton: {
    backgroundColor: "#6200ea",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  orderInfoButton: {
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
});

export default ClientOrderDetails;
