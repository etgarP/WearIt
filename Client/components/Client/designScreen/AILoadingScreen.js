import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Card } from 'react-native-paper'
import { ClientObjectContext } from '../navigation/ClientObjectProvider';
import { AppObjectContext } from '../../appNavigation/appObjectProvider';
import { tryOn } from '../../../apiServices/client/tryOn';
import RefreshErrorPage from '../../loadingPages/refreshErrorPage';

const Star = ({ delay }) => {
    const opacity = React.useRef(new Animated.Value(0)).current;
    const animationRef = React.useRef(null); // Reference for animation

    const startFlickering = () => {
        animationRef.current = Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]);

        // Start the animation and call startFlickering again when done
        animationRef.current.start(() => startFlickering());
    };

    React.useEffect(() => {
        const timer = setTimeout(startFlickering, delay); // Start flickering with delay

        return () => {
            clearTimeout(timer); // Clear the timer
            if (animationRef.current) {
                // Stop the ongoing animation
                opacity.stopAnimation(); // Stop the current animation
            }
            opacity.setValue(0); // Reset opacity
        };
    }, [opacity, delay]);

    return (
        <Animated.View style={[styles.star, { opacity }]} />
    );
};

export const AILoadingScreen = ({ navigation }) => {
    const { userDetails: { token } } = useContext(AppObjectContext);
    const [orderFailed, setOrderFailed] = useState(false);  // To manage error state
    const { setDesign, chosenUrl, orderId } = useContext(ClientObjectContext);
    // Function to handle order submission
    const handleOrderSubmission = async () => {
        setOrderFailed(false); // Reset the error state when retrying
        try {
            console.log("hello")
            const gotten = await tryOn(token, chosenUrl, orderId);  // Make the POST request to create the order
            setDesign(gotten)
            navigation.goBack()
            navigation.goBack()
        } catch (error) {
            setOrderFailed(true);  // Set error state if an error occurred
        }
    };

    // Call handleOrderSubmission when the component mounts
    useEffect(() => {
        handleOrderSubmission();
    }, [token]);

    // Retry function for error page
    const onRetry = () => {
        handleOrderSubmission();  // Retry the order submission
    };

    if (orderFailed) {
        return <RefreshErrorPage tryAgain={onRetry} />;  // Show error page with retry option if order creation failed
    }

    return AILoadingScreenPage;  // Return nothing if no state is active
};

const AILoadingScreenPage = () => {
    const [messageIndex, setMessageIndex] = React.useState(0);
    const messages = [
        "Generating the image of you in your selected outfit...",
        "Hang tight! We're almost there...",
        "Just a moment, creating your perfect look..."
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {/* <Card style={styles.card}> */}
                {/* <View style={styles.insideContainer}> */}
                    {/* Three flickering stars with staggered delays */}
                <View style={styles.starsContainer}>
                    <Star delay={0} />
                    <Star delay={250} />
                    <Star delay={500} />
                </View>
                {/* Animated Loading Message */}
                <Text style={styles.message}>
                    {messages[messageIndex]}
                </Text>
                {/* Additional Tip to Engage Users */}
                <Text style={styles.tip}>
                    Hold tight! Great things take time.
                </Text>
                {/* </View> */}
                
            {/* </Card> */}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    insideContainer: {
        paddingVertical: 50,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    star: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
        backgroundColor: '#c49fd8',
        transform: [{ rotate: '45deg' }],
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A4A6A',
        textAlign: 'center',
        marginBottom: 10,
    },
    tip: {
        fontSize: 14,
        color: '#7a7a9f',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default AILoadingScreen;
