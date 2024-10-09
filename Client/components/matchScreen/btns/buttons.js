import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PriceDropdownChip from './dropDownMenu'


const TopBtns = () => {
    const handleItemSelected = (item, buttonName) => {
        console.log(`Selected item: ${item} from button: ${buttonName}`);
    };

    return (
        <ScrollView 
            horizontal contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
        >
            <PriceDropdownChip
                title="Price"
                items={['Budget', 'Premium', 'Luxury']}
                onItemSelected={handleItemSelected}
            />
            <PriceDropdownChip
                title="Category"
                items={['Cheap', 'Affordable', 'Expensive']}
                onItemSelected={handleItemSelected}
            />
            <PriceDropdownChip
                title="Price 3"
                items={['Budget', 'Premium', 'Luxury']}
                onItemSelected={handleItemSelected}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
});

export default TopBtns;
