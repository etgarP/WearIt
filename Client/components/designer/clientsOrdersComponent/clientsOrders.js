import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import RefreshErrorPage from "../../Client/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../Client/loadingPage";
import { Avatar, List, Divider } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function ClientsOrders({ status }) {
  const [clientOrders, setClientOrders] = useState({});
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://192.168.1.162:12345/api/designer/orders/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;

      const pendingOrders = data.filter((order) => order.status === "pending");
      setPendingOrdersCount(pendingOrders.length);

      const groupedOrders = data.reduce((acc, order) => {
        if (order.status === status) {
          if (!acc[order.username]) {
            acc[order.username] = [];
          }
          acc[order.username].push(order); // Group orders by username
        }
        return acc;
      }, {});

      setClientOrders(groupedOrders);
      setAlertShown(false);
    } catch (error) {
      setAlertShown(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRetry = () => {
    fetchData();
  };

  if (loading) {
    return <LoadingPage loadingText={"Fetching your orders..."} />;
  }

  if (alertShown) {
    return <RefreshErrorPage tryAgain={onRetry} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.clientList}>
        {Object.keys(clientOrders).map((username, index) => (
          <View key={index}>
            <List.Item
              title={username}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={{ uri: "https://example.com/designer-image.jpg" }}
                />
              )}
              descriptionStyle={styles.orderRequests}
            />
            <Divider />
            {clientOrders[username].map((order) => (
              <List.Item
                key={order._id}
                title={`Order ${order._id.substring(0, 6)}...`} // Shorten ID for display
                description={`Outfits: ${order.numberOfOutfits}, Occasion: ${order.occasion}`}
                onPress={() =>
                  navigation.navigate("ApproveOrDenyClient", {
                    type: "approve", // Assuming you want to navigate for approval here
                    order: order,
                  })
                }
                right={() => <List.Icon icon="chevron-right" />}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  clientList: {
    marginTop: 16,
  },
  orderRequests: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
});
