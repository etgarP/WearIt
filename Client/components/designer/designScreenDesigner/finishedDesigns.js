import React, { useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Divider, Avatar, Text, Button } from "react-native-paper";
import { ClientObjectContext } from "../../customer/navigation/ClientObjectProvider";
import ReviewModal from "./allDesignScreens/reviewModel";
import { Strings } from "../../../constants/strings";

const FinishedDesignsInnerPage = ({
  navigation,
  orders,
  onReview,
  setOrderIdForReview,
}) => {
  const approvedOrders = orders.filter((order) => order.status == "Finished");
  const { setOrderId } = useContext(ClientObjectContext);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Finished</Text>
      {approvedOrders.length > 0 ? (
        approvedOrders.map((order) => (
          <React.Fragment key={order._id}>
            <List.Item
              title={`Ordered from ${order.designer}`}
              description={`Status: ${order.status}`}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={
                    order.designerImage
                      ? order.designerImage.startsWith("data:")
                        ? { uri: order.designerImage }
                        : {
                            uri: `data:image/jpeg;base64,${order.designerImage}`,
                          }
                      : null // Fallback image if no image is provided
                  }
                />
              )}
              descriptionStyle={styles.statusApproved}
            />
            <View style={styles.btns}>
              <Button
                mode="contained"
                onPress={() => {
                  setOrderIdForReview(order._id);
                  onReview(order.review);
                }}
                style={styles.reviewButton}
                labelStyle={styles.buttonLabel}
              >
                {Strings.addReviewButtonLabel}
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setOrderId(order._id);
                  navigation.navigate("DesignInfo");
                }}
                style={styles.reviewButton}
                labelStyle={styles.buttonLabel}
              >
                {Strings.viewOrderButtonLabel}
              </Button>
            </View>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Text>{Strings.unApprovedOrder}</Text>
      )}
    </View>
  );
};

const FinishedDesigns = ({ navigation, orders }) => {
  // Create a reference for the ReviewModal
  const reviewModalRef = useRef(null);
  const [ordersState, setOrdersState] = useState(orders);
  const [orderId, setOrdersId] = useState("");

  const updateReview = (newReview) => {
    // Find the order with the given orderId
    const orderIndex = ordersState.findIndex((order) => order._id === orderId);
    console.log(orderIndex);
    // If order is found, update its review
    if (orderIndex !== -1) {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex].review = newReview;
      setOrdersState(updatedOrders);
      console.log(newReview);
    }
  };

  // Function to open the modal
  const showReviewModal = (reviewData) => {
    reviewModalRef.current?.openModal(reviewData);
  };

  return (
    <View>
      <FinishedDesignsInnerPage
        setOrderIdForReview={setOrdersId}
        navigation={navigation}
        orders={ordersState}
        onReview={showReviewModal}
      />
      {/* Include the ReviewModal component */}
      <ReviewModal ref={reviewModalRef} updateReview={updateReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  statusPending: {
    fontStyle: "italic",
    color: "#555",
  },
  statusApproved: {
    color: "#000",
  },
  reviewButton: {
    backgroundColor: "#6750a4",
    borderRadius: 20,
    marginLeft: 8,
  },
  buttonLabel: {
    fontSize: 14,
    color: "white",
    textTransform: "none", // This prevents automatic capitalization
  },
});

export default FinishedDesigns;
