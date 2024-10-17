import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native'; // Import Text
import { Chip } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedView = Animated.createAnimatedComponent(View);

const PriceDropdownChip = ({ title, items, onItemSelected }) => {
    const [selected, setSelected] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    // Shared value to control animation of each item
    const translateX = useSharedValue(-100);

    // Style for animating the chip's horizontal slide
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value, { duration: 300 }) }],
    }));

    const handleChipPress = () => {
        if (!selected) {
            setSelected(true);
            translateX.value = 0;  // Slide in to position from left
        } else {
            translateX.value = -100;  // Slide out to left before hiding options
            setTimeout(() => setSelected(false), 300); // Match the timing of the animation
        }
    };

    const handleItemPress = (item) => {
        handleChipPress();
        setSelectedItem(item);
        if (onItemSelected) {
            onItemSelected(item, title);  // Pass selected item and button name
        }
    };

    return (
        <View style={styles.container}>
            <Chip
                mode="flat"
                selected={!!selectedItem}
                showSelectedOverlay={!!selectedItem}
                onPress={handleChipPress}
                onClose={selectedItem ? () => {
                    setSelectedItem('')
                    onItemSelected("")
                } : undefined}
                closeIcon={selectedItem ? "close" : undefined}
                icon={() =>
                    selectedItem ? (
                        <Icon name="checkmark" size={16} color="#000" />
                    ) : (
                        <Icon name="chevron-down" size={16} color="#000" />
                    )
                }
            >
                {/* Wrap title in Text component */}
                <Text>{selectedItem || title}</Text>
            </Chip>

            {selected && (
                <ScrollView horizontal style={styles.optionsContainer}>
                    {items.map((item, index) => (
                        <AnimatedView key={index} style={[styles.optionChip, animatedStyle]}>
                            <Chip
                                mode="flat"
                                onPress={() => handleItemPress(item)}
                            >
                                {/* Wrap item in Text component */}
                                <Text>{item}</Text>
                            </Chip>
                        </AnimatedView>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
    },
    optionsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    optionChip: {
        marginHorizontal: 5,
    },
});

export default PriceDropdownChip;
