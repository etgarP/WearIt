import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PriceDropdownChip from "./dropDownMenu";
import { categories } from "../../../../data/categories";
import { Strings } from "../../../../constants/strings";

const TopBtns = ({
  setPriceFilter,
  setCategoryFilter,
  setSubcategoryFilter,
  setReviewFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const handleItemSelected = (item, buttonName) => {
    if (buttonName === Strings.priceBtn) {
      setPriceFilter(item);
    } else if (buttonName === Strings.categoryBtn) {
      setCategoryFilter(item);
      const selectedCategoryData = categories.find(
        (category) => category.title === item
      );
      if (selectedCategoryData) {
        setSubcategories(selectedCategoryData.items); // Update subcategories based on selected category
      } else {
        setSubcategories([]); // Reset if no matching category found
      }
      setSelectedCategory(item); // Save selected category
    } else if (buttonName === Strings.subcategoryBtn) {
      setSubcategoryFilter(item);
    } else if (buttonName === Strings.reviewsBtn) {
      setReviewFilter(item);
    }
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      <PriceDropdownChip
        title={Strings.priceTitle}
        items={Strings.priceList}
        onItemSelected={(item) => handleItemSelected(item, Strings.priceBtn)}
      />
      <PriceDropdownChip
        title={Strings.reviewsTitle}
        items={Strings.reviewList}
        onItemSelected={(item) => handleItemSelected(item, Strings.reviewsBtn)}
      />
      <PriceDropdownChip
        title={Strings.categoryTitle}
        items={categories.map((category) => category.title)}
        onItemSelected={(item) => handleItemSelected(item, Strings.categoryBtn)}
      />
      {selectedCategory && (
        <PriceDropdownChip
          title={Strings.subcategoryTitle}
          items={subcategories}
          onItemSelected={(item) => handleItemSelected(item, Strings.subcategoryBtn)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default TopBtns;
