import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import {
  Text,
  List,
  Divider,
  Avatar,
  IconButton,
  Button,
} from "react-native-paper";
import axios from "axios";
import { AppObjectContext } from "../appNavigation/appObjectProvider";
import { constants } from "../../constants/api";

const ClientOrderDetails = ({ navigation, route }) => {
  const { order } = route.params;
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [clientData, setClientData] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // State to track opened accordion

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `${constants.designerBaseAddress}orders/${order._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientData(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load client data.");
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
        Alert.alert("Success", "Order approved successfully.");

        // Instead of passing navigation, just use it directly
        navigation.replace(route.name, {
          order: { ...order, status: "accepted" },
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to approve the order.");
    }
  };

  const handleDeny = async () => {
    try {
      const response = await axios.post(
        `${constants.designerBaseAddress}orders/acc/${order._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        Alert.alert("Success", "Order denied successfully.");
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to deny the order.");
    }
  };

  const handleMixAndMatch = () => {
    navigation.navigate("DesignInfo", {
      design: clientData.design[0],
      orderId: order._id,});
  };

  if (!clientData) {
    return <Text>Loading...</Text>;
  }

  const clientInfo = clientData.clientInfo[0];

  const handleAccordionPress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.goBackIcon}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.headerContainer}>
        {order.status === "pending" ? (
          <Text style={styles.header}>Approve or Deny</Text>
        ) : (
          <Text style={styles.header}>Manage Client</Text>
        )}
      </View>
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
                    : {
                        uri: `data:image/jpeg;base64,${clientInfo.image}`,
                      }
                  : null // Fallback image if no image is provided
              }
            />
          )}
          descriptionStyle={styles.orderRequests}
        />
        <Divider />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Relevant Info</Text>
        {["Personal Info", "Measurements", "Preferences"].map((item, index) => (
          <List.Accordion
            key={index}
            title={item}
            expanded={expandedIndex === index}
            onPress={() => handleAccordionPress(index)}
            right={() => (
              <List.Icon
                icon={
                  expandedIndex === index ? "chevron-down" : "chevron-right"
                }
              />
            )}
            style={styles.accordion}
          >
            {item === "Personal Info" && (
              <Text>{`Age: ${clientInfo.age}\nGender: ${clientInfo.gender}\nAllergies: ${clientInfo.allergies}`}</Text>
            )}
            {item === "Measurements" && (
              <Text>{`Shoulders: ${clientInfo.measurements.shoulders}\nBust: ${clientInfo.measurements.bust}\nWaist: ${clientInfo.measurements.waist}\nHips: ${clientInfo.measurements.hips}\nThighs: ${clientInfo.measurements.thighs}\nCalves: ${clientInfo.measurements.calves}\nLegs: ${clientInfo.measurements.legs}`}</Text>
            )}
            {item === "Preferences" && <Text>{clientInfo.other}</Text>}
          </List.Accordion>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Order Details</Text>
        <List.Accordion
          title="Order Information"
          expanded={expandedIndex === "orderDetails"}
          onPress={() => handleAccordionPress("orderDetails")}
          right={() => (
            <List.Icon
              icon={
                expandedIndex === "orderDetails"
                  ? "chevron-down"
                  : "chevron-right"
              }
            />
          )}
          style={styles.accordion}
        >
          <Text>{`Order ID: ${order._id}\nNumber of Outfits: ${
            order.numberOfOutfits
          }\nIs Group: ${order.isGroup ? "Yes" : "No"}\nOccasion: ${
            order.occasion
          }\nPreferences: ${order.preferences}\nStatus: ${order.status}`}</Text>
        </List.Accordion>
      </View>

      {order.status === "pending" ? (
        <View style={styles.buttonContainer}>
          <IconButton
            icon="close-circle-outline"
            size={50}
            iconColor="red"
            onPress={() => handleDeny()}
          />
          <IconButton
            icon="check-circle-outline"
            size={50}
            iconColor="green"
            onPress={() => handleApprove()}
          />
        </View>
      ) : (
        <View style={styles.mixMatchButtonContainer}>
          <Button
            mode="contained"
            onPress={handleMixAndMatch}
            style={styles.mixMatchButton}
          >
            Manage Outfits
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 24,
    marginTop: "5%",
    marginBottom: "5%",
  },
  goBackIcon: {
    marginTop: "10%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  profileContainer: {
    marginBottom: 16,
  },
  orderRequests: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
  orderDetails: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: "10%",
  },
  approveButton: {
    backgroundColor: "#4caf50", // Green for approve
    borderRadius: 24,
  },
  denyButton: {
    backgroundColor: "#f44336", // Red for deny
    borderRadius: 24,
  },
  mixMatchButtonContainer: {
    marginTop: 20, // Add some space above the Mix and Match button
  },
  mixMatchButton: {
    backgroundColor: "#6200ea", // Example color for the Mix and Match button
  },
});

export default ClientOrderDetails;
