import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Button, Card } from 'react-native-paper'
import SuccessImage from './success';

const { width, height } = Dimensions.get('window');

const OrderCompletePage = ({ onGoBack }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate scaling effect for "Order Complete" text
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
                <SuccessImage />
                {/* Confetti Fireworks */}

                {/* Animated "Order Complete" Text */}
                <Animated.Text style={[styles.orderCompleteText, { transform: [{ scale: scaleValue }] }]}>
                    Order Complete!
                </Animated.Text>

                {/* Subtext */}
                <Text style={styles.subText}>Your order was successful. Thanks for shopping with us!</Text>

                {/* Back to Home Button */}
                <Button
                    mode="contained-tonal"
                    onPress={onGoBack}
                >
                    Go Back
                </Button>
            </Card>
            <ConfettiCannon count={150} origin={{ x: width / 2 - 50, y: 0 }} fadeOut={true} fallSpeed={3000} />
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
        backgroundColor: '#38c47c',
        padding: 20,
    },
    orderCompleteText: {
        fontSize: 40,
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
    buttonContainer: {
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default OrderCompletePage;
