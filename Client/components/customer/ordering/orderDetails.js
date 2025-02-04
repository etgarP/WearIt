import React, { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { ClientObjectContext } from '../navigation/ClientObjectProvider';
import { Strings } from '../../../constants/strings';

const { width } = Dimensions.get('window'); // Get the width of the device

const convertToOptions = (list) => {
    return list.map(item => ({ label: item, value: item.toLowerCase() }));
};

const OrderDetails = ({ navigation, onClick }) => {
    const { profile, setOrderInfo } = useContext(ClientObjectContext);
    const { pricePerItem, specialization = [] } = profile; // Include specialization field
    const options = convertToOptions(specialization);

    const [outfits, setOutfits] = React.useState('');
    const [occasions, setOccasions] = React.useState('');
    const [preferences, setPreferences] = React.useState('');
    const finalPrice = Math.min(Math.max(parseInt(outfits) || 0, 1), 100) * pricePerItem; // Calculate final price
    const arrivalTime = 'Your order will be approved in 2-3 days';

    // Condition for enabling the button (outfits between 1 and 100 and occasion selected)
    const isButtonEnabled = outfits >= 1 && outfits <= 100 && occasions;

    return (
        <>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Order Details" />
            </Appbar.Header>
            <View style={styles.container}>
                {/* Appbar with Back Button and Arrival Time */}
                <View style={styles.textContainer}>
                    {/* Informative Text */}
                    <Text style={styles.informativeText}>
                        {Strings.orderDetailsText}
                    </Text>

                    {/* Order Form */}
                    <TextInput
                        label="How many outfits do you want (1-100)"
                        value={outfits}
                        onChangeText={text => {
                            // Update outfits and ensure it's within range
                            const numOutfits = Math.min(Math.max(parseInt(text) || 0, 1), 100);
                            setOutfits(numOutfits.toString());
                        }}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric" // Numeric keyboard for input
                    />

                    <View style={styles.input}>
                        <Dropdown
                            label="For what occasions"
                            placeholder="Select occasion"
                            mode="outlined"
                            options={options}
                            value={occasions}
                            onSelect={setOccasions}
                        />
                    </View>

                    <TextInput
                        label="Any other preferences"
                        value={preferences}
                        onChangeText={text => setPreferences(text)}
                        mode="outlined"
                        style={styles.input}
                    />
                </View>

                <Text style={styles.priceText}>{Strings.finalPrice}{finalPrice}</Text>

                {/* Arrival Time Text */}
                <Text style={styles.arrivalText}>
                    {arrivalTime}
                </Text>

                <Button
                    mode="contained"
                    onPress={() => {
                        onClick()
                        setOrderInfo({
                            "numberOfOutfits": parseInt(outfits) || 1,
                            "isGroup": false,
                            "occasion": occasions,
                            "preferences": preferences,
                            "designer": profile.username,
                        })
                    }}
                    disabled={!isButtonEnabled} // Disable button based on conditions
                    style={[styles.button, !isButtonEnabled && styles.disabledButton]} // Add greyed out style if disabled
                >
                    {Strings.requestDesign}
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        padding: 20,
        backgroundColor: '#fffbfe',
    },
    appbar: {
        width: width,
        backgroundColor: '#fffbfe',
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
    disabledButton: {
        backgroundColor: '#d3d3d3', // Greyed out color for disabled button
    },
    textContainer: {
        flex: 1
    }
});

export default OrderDetails;
