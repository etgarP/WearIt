import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';
import OrderDetails from './orderDetails';
import OrderCompletePage from './orderCompletePage/orderComplete';

const { width, height } = Dimensions.get('window'); // Get the width of the device
const statusBarHeight = StatusBar.currentHeight || 0; // Fallback if currentHeight is undefined

const OrderHolder = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current; // Animated value for horizontal scroll
    const [orderComplete, setOrderComplete] = useState(false);

    const handleNextPage = () => {
        // Animate the scroll to the next page (width of the screen)
        setOrderComplete(true)
        Animated.timing(scrollX, {
            toValue: width, // move to the width of the device (next page)
            duration: 200, // animation duration (500ms)
            useNativeDriver: true,
        }).start();
    };

    handleGoBack = () => {
        navigation.navigate("HomeClient");
    }

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.innerContainer,
                    {
                        transform: [{
                            translateX: scrollX.interpolate({
                                inputRange: [0, width],
                                outputRange: [0, -width], // move content left when animating
                            })
                        }]
                    }
                ]}
            >
                {/* First Page */}
                <View style={styles.page}>
                    <OrderDetails navigation = {navigation} onClick={handleNextPage}/>
                </View>

                {/* Second Page */}
                <View style={styles.page}>
                    {orderComplete ? (
                        <OrderCompletePage onGoBack={handleGoBack} />
                    ) : (
                        <></>
                    )}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    innerContainer: {
        flexDirection: 'row',
        width: width * 2, // 2 pages width
    },
    page: {
        height: height,
        width: width, // full screen width for each page
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
});

export default OrderHolder;
