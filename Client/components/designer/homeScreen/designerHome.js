import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native"; // Import ScrollView
import RefreshErrorPage from "../../loadingPages/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../loadingPages/loadingPage";
import { Avatar, Badge } from "react-native-paper";
import axios from "axios";
import ClientsOrders from "../clientsOrdersComponent/clientsOrders";
import { constants } from "../../../constants/api";
import BackgroundWrapper from "../../backgroundWrapper";
import RefreshPage from "../../loadingPages/refreshPage";

export default function DesignerHome({ navigation }) {
  const [clientOrders, setClientOrders] = useState({});
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0); // State for pending orders count
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useContext(AppObjectContext);
  const [lastOrderImage, setLastOrderImage] = useState(null); // State to store the last order's image

  const clientsOrdersRequest = async () => {
    try {
      const response = await axios.get(
        `${constants.designerBaseAddress}orders/`,
        {
          headers: { Authorization: `Bearer ${userDetails.token}` },
        }
      );
      const data = response.data;

      // Calculate the number of pending orders
      const pendingOrders = data.filter((order) => order.status === "pending");
      setPendingOrdersCount(pendingOrders.length);

      // Extract the last order's image
      if (data.length > 0) {
        const lastOrder = data[data.length - 1]; // Assuming the last item is the most recent order
        setLastOrderImage(lastOrder.clientImage); // Assuming "image" is the field containing the image URL
      }

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

  const fetchData = async () => {
    setLoading(true);
    await clientsOrdersRequest();
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
    <BackgroundWrapper>
      <RefreshPage tryAgain={onRetry}>
        <View style={styles.container}>
          {/* Order Requests section with pending orders count */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeDesigner", { initialTab: "pending" });
            }}
          >
            <View style={styles.orderRequests}>
              <Avatar.Image
                size={50}
                source={
                  lastOrderImage
                    ? lastOrderImage.startsWith("data:")
                      ? { uri: lastOrderImage }
                      : { uri: `data:image/jpeg;base64,${lastOrderImage}` }
                    : null // Fallback image if no image is provided
                }
              />
              <Badge style={styles.badge}>{pendingOrdersCount}</Badge>
              <Text style={styles.orderText}>Order Requests</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.clientsText}>My clients</Text>
          {/* Use ScrollView to allow scrolling through the ClientsOrders */}
          <ScrollView style={styles.scrollView}>
            <ClientsOrders navigation={navigation} status={"accepted"} />
          </ScrollView>
        </View>
      </RefreshPage>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderRequests: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 16,
  },
});
