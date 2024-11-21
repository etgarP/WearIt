import React, { useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { List, Divider, Avatar, Text } from "react-native-paper";
import { design } from "../../data/design";
import { ClientObjectContext } from "../Client/navigation/ClientObjectProvider";

const FinishedDesigns = ({ navigation, orders }) => {
  // Filter orders based on their status
  const approvedOrders = orders.filter((order) => order.status == "finished");
  const { setDesign } = useContext(ClientObjectContext);

  return (
    <View style={styles.container}>
      {/* Finished Section */}
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
              // Set design when item is pressed
              onPress={() => {
                setDesign(design);
                navigation.navigate("DesignInfo");
              }} // Assuming 'order.design' holds the design data
            />
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Text>No approved orders.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
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
    color: "#000", // Customize approved status color if needed
  },
});

export default FinishedDesigns;
