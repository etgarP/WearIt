import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LoadingPage } from './loadingPages/loadingPage'
import RefreshErrorPage from './loadingPages/refreshErrorPage';
import { AppObjectContext } from '../components/appNavigation/appObjectProvider';
import RefreshPage from './loadingPages/refreshPage';

export const WithServerCall = ({ getObject, setObject, children, secondInput, loadingText, top}) => {
    const { userDetails: { token } } = useContext(AppObjectContext);
    const [loading, setLoading] = useState(false);  // To manage the loading state
    const [orderSuccess, setOrderSuccess] = useState(false);  // To manage success state
    const [orderFailed, setOrderFailed] = useState(false);  // To manage error state
    // Function to handle order submission
    const handleOrderSubmission = async () => {
        setLoading(true);
        setOrderFailed(false); // Reset the error state when retrying
        try {
            console.log("hello")
            const gotten = await getObject(token, secondInput);  // Make the POST request to create the order
            setObject(gotten)
            setOrderSuccess(true);  // If successful, show success screen
        } catch (error) {
            setOrderFailed(true);  // Set error state if an error occurred
        } finally {
            setLoading(false);  // Stop the loading spinner regardless of outcome
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

    if (loading) {
        return <LoadingPage loadingText={loadingText} />;  // Show loading screen while request is processing
    }

    if (orderSuccess) {
        return (
            <View style={styles.container}>
                {children}
            </View>
        )
          // Show success page if the order was created
    }

    if (orderFailed) {
        return <RefreshErrorPage tryAgain={onRetry} />;  // Show error page with retry option if order creation failed
    }

    return null;  // Return nothing if no state is active
};

export default WithServerCall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
