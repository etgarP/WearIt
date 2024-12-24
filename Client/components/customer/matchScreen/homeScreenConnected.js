import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Search from "./Search";
import MyCarousel from "./carousel/carousel";
import TopBtns from "./btns/buttons";
import { filterDesigners } from "../../../utils/client/filterLogic"; // Import the filter logic

const { width, height } = Dimensions.get("screen");

export default function ConnectedMatchRoute({
  setProfilePage,
  navigation,
  designersData,
}) {
  const [filtered, setFiltered] = useState(designersData);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [reviewFilter, setReviewFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Combine filters into one object
    const filters = {
      priceFilter,
      categoryFilter,
      subcategoryFilter,
      reviewFilter,
      searchText,
    };

    // Use the filter logic
    const filteredData = filterDesigners(designersData, filters);
    setFiltered(filteredData); // Update filtered state
  }, [
    priceFilter,
    categoryFilter,
    subcategoryFilter,
    reviewFilter,
    searchText,
    designersData,
  ]); // Include designersData as a dependency

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Search onChange={handleSearchChange} />
      </View>
      <View style={styles.btnscontainer}>
        <TopBtns
          setPriceFilter={setPriceFilter}
          setCategoryFilter={setCategoryFilter}
          setSubcategoryFilter={setSubcategoryFilter}
          setReviewFilter={setReviewFilter}
        />
      </View>
      <View>
        <MyCarousel
          setProfilePage={setProfilePage}
          navigation={navigation}
          data={filtered}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  btnscontainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  search: {
    width: width,
    paddingHorizontal: 10,
  },
});
