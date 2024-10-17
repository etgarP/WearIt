import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PriceDropdownChip from './dropDownMenu';
import { categories } from '../../../data/categories';

const TopBtns = ({ setPriceFilter, setCategoryFilter, setSubcategoryFilter, setReviewFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);

    const handleItemSelected = (item, buttonName) => {
        if (buttonName === 'Price') {
            setPriceFilter(item);
        } else if (buttonName === 'Category') {
            setCategoryFilter(item);
            const selectedCategoryData = categories.find(category => category.title === item);
            if (selectedCategoryData) {
                setSubcategories(selectedCategoryData.items); // Update subcategories based on selected category
            } else {
                setSubcategories([]); // Reset if no matching category found
            }
            setSelectedCategory(item); // Save selected category
        } else if (buttonName === 'Subcategory') {
            setSubcategoryFilter(item);
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
                items={categories.map(category => category.title)}
                onItemSelected={(item) => handleItemSelected(item, 'Category')}
            />
            {selectedCategory && (
                <PriceDropdownChip
                    title="Subcategory"
                    items={subcategories}
                    onItemSelected={(item) => handleItemSelected(item, 'Subcategory')}
                />
            )}
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
