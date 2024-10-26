import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import RefreshErrorPage from "../../Client/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../Client/loadingPage";
import { Avatar, Badge, List, Divider } from "react-native-paper";
import axios from "axios";

export default function DesignerHome() {
  const [clientOrders, setClientOrders] = useState({});
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0); // State for pending orders count
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);

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

      // Calculate the number of pending orders
      const pendingOrders = data.filter((order) => order.status === "pending");
      setPendingOrdersCount(pendingOrders.length);

      // Process data to group only accepted orders by username
      const groupedOrders = data.reduce((acc, order) => {
        if (order.status === "accepted") {
          if (!acc[order.username]) {
            acc[order.username] = { count: 0, orders: [] };
          }
          acc[order.username].count += 1;
          acc[order.username].orders.push(order);
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
  }, [token]);

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
      {/* Order Requests section with pending orders count */}
      <View style={styles.orderRequests}>
        <Avatar.Image
          size={50}
          source={{ uri: "https://example.com/user-photo.png" }}
        />
        <Badge style={styles.badge}>{pendingOrdersCount}</Badge>
        <Text style={styles.orderText}>Order Requests</Text>
      </View>

      <Text style={styles.clientsText}>My clients</Text>
      <View style={styles.clientList}>
        {Object.keys(clientOrders).map((username, index) => (
          <React.Fragment key={index}>
            <List.Item
              title={username}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={{ uri: "https://example.com/designer-image.jpg" }} // Replace with real image
                />
              )}
              descriptionStyle={styles.orderRequests}
            />
            <Divider />
          </React.Fragment>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  orderRequests: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    left: 36,
    backgroundColor: "red",
  },
  orderText: {
    fontSize: 16,
    marginLeft: 8,
  },
  clientsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
  },
  clientList: {
    marginTop: 16,
  },
  clientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    position: "relative",
  },
  clientName: {
    fontSize: 16,
    marginLeft: 12,
  },
});
