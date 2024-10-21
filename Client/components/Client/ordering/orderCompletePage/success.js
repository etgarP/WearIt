import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper'; // Import Paper components

const SuccessImage = () => {
    return (
        <View style={styles.container}>
            {/* Checkmark Circle */}
            <View style={styles.circle}>
                <IconButton
                    icon="check"  // Paper's built-in checkmark icon
                    size={60}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SuccessImage;
