import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import RefreshErrorPage from "../../loadingPages/refreshErrorPage";
import { AppObjectContext } from "../../appNavigation/appObjectProvider";
import LoadingPage from "../../loadingPages/loadingPage";
import { Avatar, List, Divider } from "react-native-paper";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { constants } from "../../../constants/api";
import BackgroundWrapper from "../../backgroundWrapper";
import { DesingerObjectContext } from "../navigation/designerObjectProvider";
import RefreshPage from "../../loadingPages/refreshPage";

export default function ClientsOrders({ navigation, status }) {
  const [clientOrders, setClientOrders] = useState({});
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const { userDetails } = useContext(AppObjectContext);
  const [alertShown, setAlertShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setOrderId } = useContext(DesingerObjectContext);

  const fetchData = async () => {
    setLoading(true);
    // Fetch orders from the server
    try {
      const response = await axios.get(
        `${constants.designerBaseAddress}orders/`,
        {
          headers: { Authorization: `Bearer ${userDetails.token}` },
        }
      );
      const data = response.data;
      
      // Filter orders by status
      console.log(data[0].status)
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

  // Use useFocusEffect to refresh data on screen focus
  useFocusEffect(
    React.useCallback(() => {
      if (!userDetails) {
        return;
      }
      fetchData();
    }, [userDetails, status]) // Add dependencies to re-fetch data when they change
  );

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
          {Object.keys(clientOrders).length === 0 ? (
            <List.Item
              title="No Pending Orders"
              description="You have no orders to review at the moment."
              left={() => <List.Icon icon="clipboard-alert-outline" />}
            />
          ) : (
            <View style={styles.clientList}>
              {Object.keys(clientOrders).map((username, index) => (
                <View key={index}>
                  <List.Item
                    title={username}
                    left={() => (
                      <Avatar.Image
                        size={50}
                        source={
                          clientOrders[username][0].clientImage
                            ? clientOrders[username][0].clientImage.startsWith(
                                "data:"
                              )
                              ? { uri: clientOrders[username][0].clientImage }
                              : {
                                  uri: `data:image/jpeg;base64,${clientOrders[username][0].clientImage}`,
                                }
                            : null
                        }
                      />
                    )}
                    descriptionStyle={styles.orderRequests}
                  />
                  <Divider />
                  {clientOrders[username].map((order) => (
                    <List.Item
                      key={order._id}
                      title={`Order ${order._id.substring(0, 6)}...`}
                      description={`Outfits: ${order.numberOfOutfits}, Occasion: ${order.occasion}`}
                      onPress={() => {
                        setOrderId(order._id);
                        navigation.navigate("ClientOrderDetails", {
                          type: "approve",
                          order: order,
                        });
                      }}
                      right={() => <List.Icon icon="chevron-right" />}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
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
