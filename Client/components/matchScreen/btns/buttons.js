import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'; 
import PriceDropdownChip from './dropDownMenu';

const TopBtns = ({ setPriceFilter, setCategoryFilter, setReviewFilter }) => {
    const handleItemSelected = (item, buttonName) => {
        if (buttonName === 'Price') {
            setPriceFilter(item);
        } else if (buttonName === 'Category') {
            setCategoryFilter(item);
        } else if (buttonName === 'Reviews') {
            setReviewFilter(item);
        }
    };

    return (
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
            <PriceDropdownChip
                title="Price"
                items={['Cheap', 'Affordable', 'Expensive']}
                onItemSelected={(item) => handleItemSelected(item, 'Price')}
            />
            <PriceDropdownChip
                title="Reviews"
                items={['3+ Stars', '4+ Stars', '5 Stars']}
                onItemSelected={(item) => handleItemSelected(item, 'Reviews')}
            />
            <PriceDropdownChip
                title="Category"
                items={['Casual Styles', 'Formal Attire', 'Specialty Fashion']}
                onItemSelected={(item) => handleItemSelected(item, 'Category')}
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
