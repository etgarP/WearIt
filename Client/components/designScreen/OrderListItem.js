import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const OrderListItem = ({ order }) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainRow}>
                <View style={styles.leftContent}>
                    <Image
                        source={{ uri: order.designerImage }}
                        style={styles.avatar}
                    />
                    <Text style={styles.orderText}>
                        order from {order.designer}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {/* Handle view order */ }}
                    >
                        <Text style={styles.buttonText}>view order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {/* Handle add review */ }}
                    >
                        <Text style={styles.buttonText}>add review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    orderText: {
        fontSize: 16,
        color: '#000000',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#BA8EF7',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    buttonText: {
        color: '#000000',
        fontSize: 14,
    },
});

export default OrderListItem;