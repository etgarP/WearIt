import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

const OrderDetails = ({ navigation }) => {
    const [outfits, setOutfits] = React.useState('');
    const [occasions, setOccasions] = React.useState('');
    const [preferences, setPreferences] = React.useState('');
    const finalPrice = 20;
    const arrivalTime = 'Your order will arrive in 2-3 days';

    return (
        <View style={styles.container}>
            {/* Appbar with Back Button and Arrival Time */}
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content
                    title="Order Details"
                />
            </Appbar.Header>
            <View style={styles.textContainer}>
                {/* Informative Text */}
                <Text style={styles.informativeText}>
                    Add the final details to complete your order.
                </Text>

                {/* Order Form */}
                <TextInput
                    label="How many outfits do you want"
                    value={outfits}
                    onChangeText={text => setOutfits(text)}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="For what occasions"
                    value={occasions}
                    onChangeText={text => setOccasions(text)}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Any other preferences"
                    value={preferences}
                    onChangeText={text => setPreferences(text)}
                    mode="outlined"
                    style={styles.input}
                />
            </View>
            

            <Text style={styles.priceText}>Final price: ${finalPrice}</Text>

            {/* Arrival Time Text */}
            <Text style={styles.arrivalText}>
                {arrivalTime}
            </Text>

            <Button
                mode="contained"
                onPress={() => console.log('Purchase confirmed')}
                style={styles.button}>
                Confirm Purchase
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    informativeText: {
        fontSize: 16,
        marginVertical: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        marginBottom: 15,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
    arrivalText: {
        fontSize: 14,
        color: '#4CAF50',  // Green color for a nice touch
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'italic',
    },
    button: {
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 30,
    },
    textContainer: {
        flex: 1
    }
});

export default OrderDetails;
