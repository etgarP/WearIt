import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import RefreshErrorPage from "../../Client/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../Client/loadingPage";
import { Avatar, Badge } from "react-native-paper";
import axios from "axios";
import ClientsOrders from "../clientsOrdersComponent/clientsOrders";

export default function DesignerHome({ navigation, setProfile }) {
  const [clientOrders, setClientOrders] = useState({});
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0); // State for pending orders count
  const {
    userDetails: { token },
  } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const clientsOrdersRequest = async () => {
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

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.162:12345/api/designer/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      // Set the designer profile
      setProfile(data);
      setAlertShown(false);
    } catch (error) {
      setAlertShown(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await clientsOrdersRequest();
    await getProfile();
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeClient", { initialTab: "pending" });
        }}
      >
        <View style={styles.orderRequests}>
          <Avatar.Image
            size={50}
            source={{ uri: "https://example.com/user-photo.png" }}
          />
          <Badge style={styles.badge}>{pendingOrdersCount}</Badge>
          <Text style={styles.orderText}>Order Requests</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.clientsText}>My clients</Text>
      <ClientsOrders status={"accepted"}></ClientsOrders>
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
