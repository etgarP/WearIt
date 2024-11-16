import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider, Avatar, Text, Button } from 'react-native-paper';
import { ClientObjectContext } from '../navigation/ClientObjectProvider';

const FinishedDesigns = ({ navigation, orders }) => {
    const approvedOrders = orders.filter(order => order.status == 'finished');
    const { setOrderId } = useContext(ClientObjectContext);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Finished</Text>
            {approvedOrders.length > 0 ? (
                approvedOrders.map(order => (
                    <React.Fragment key={order._id}>
                        <List.Item
                            title={`Ordered from ${order.designer}`}
                            description={`Status: ${order.status}`}
                            left={() => (
                                <Avatar.Image
                                    size={50}
                                    source={{ uri: order.designerImage }}
                                />
                            )}
                            // right={() => (
                                // <Button
                                //     mode="contained"
                                //     onPress={() => {
                                //         // Handle add review navigation
                                //         setOrderId(order._id);
                                //         // navigation.navigate("AddReview");
                                //     }}
                                //     style={styles.reviewButton}
                                //     labelStyle={styles.buttonLabel}
                                // >
                                //     add review
                                // </Button>
                            // )}
                            descriptionStyle={styles.statusApproved}
                            onPress={() => {
                                setOrderId(order._id);
                                navigation.navigate("DesignInfo");
                            }}
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
        marginHorizontal: 20
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    statusPending: {
        fontStyle: 'italic',
        color: '#555',
    },
    statusApproved: {
        color: '#000',
    },
    reviewButton: {
        backgroundColor: '#BA8EF7',
        borderRadius: 20,
        marginLeft: 8,
    },
    buttonLabel: {
        fontSize: 14,
        color: '#000000',
        textTransform: 'none', // This prevents automatic capitalization
    }
});

export default FinishedDesigns;