import { Strings } from "../../constants/strings";
import { categories } from "../../data/categories";

export const filterDesigners = (designers, filters) => {
    let filteredData = designers;
    let cheapPrice = 5;
    let expensivePrice = 20;
    const { priceFilter, categoryFilter, subcategoryFilter, reviewFilter, searchText } = filters;

    // Price filtering
    if (priceFilter && priceFilter !== '') {
        filteredData = filteredData.filter(item => {
            if (priceFilter === Strings.priceList[0]) return item.pricePerItem < cheapPrice;
            if (priceFilter === Strings.priceList[1])
              return item.pricePerItem >= cheapPrice && item.pricePerItem < expensivePrice;
            if (priceFilter === Strings.priceList[2])
              return item.pricePerItem >= expensivePrice;
            return true;
        });
    }

    // Category filtering
    if (categoryFilter) {
        const pickedCategory = categories.find(category => category.title === categoryFilter) || null;
        if (pickedCategory) {
            filteredData = filteredData.filter(item => {
                return item.specialization.some(specializationItem =>
                    pickedCategory.items.includes(specializationItem)
                );
            });
        }
    }

    // Subcategory filtering
    if (subcategoryFilter) {
        if (categoryFilter) {
            filteredData = filteredData.filter(item => {
                return item.specialization.some(specializationItem =>
                    subcategoryFilter === specializationItem
                );
            });
        }
    }

    // Review filtering
    if (reviewFilter && reviewFilter !== '') {
        filteredData = filteredData.filter(item => {
            let threestars = 3, fourstars = 4, fivestars = 5;
            const avgRating = calculateAverageRating(item.reviews);
            if (reviewFilter === Strings.reviewList[0]) return avgRating >= threestars;
            if (reviewFilter === Strings.reviewList[1]) return avgRating >= fourstars;
            if (reviewFilter === Strings.reviewList[2]) return avgRating === fivestars;
            return true;
        });
    }

    // Search text filtering
    if (searchText) {
        filteredData = filteredData.filter(designer =>
            designer.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    return filteredData;
};

// Function to calculate average rating
const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
};
