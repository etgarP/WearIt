import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';

const { width } = Dimensions.get('window');

const OrderErrorPage = ({ onRetry }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate scaling effect for "Order Unsuccessful" text
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.outerContainer}>
            <Card style={styles.container}>
                {/* Animated "Order Unsuccessful" Text */}
                <Animated.Text style={[styles.errorText, { transform: [{ scale: scaleValue }] }]}>
                    Order Unsuccessful
                </Animated.Text>

                {/* Subtext */}
                <Text style={styles.subText}>Something went wrong with your order. Please try again.</Text>

                {/* Retry Button */}
                <Button
                    mode="contained-tonal"
                    onPress={onRetry}
                    style={styles.retryButton}
                >
                    <Text style={styles.btnText}>Retry Order</Text>
                </Button>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e74c3c', // Red background to indicate error
        padding: 20,
    },
    errorText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subText: {
        fontSize: 18,
        color: '#ecf0f1',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 40,
    },
    retryButton: {
        backgroundColor: '#c0392b', // Darker red for the retry button
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    btnText: {
        color: '#fff', // White button text
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default OrderErrorPage;
