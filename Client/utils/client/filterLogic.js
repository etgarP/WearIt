export const filterDesigners = (designers, filters) => {
    let filteredData = designers;

    const { priceFilter, categoryFilter, subcategoryFilter, reviewFilter, searchText } = filters;

    // Price filtering
    if (priceFilter && priceFilter !== '') {
        filteredData = filteredData.filter(item => {
            if (priceFilter === 'Cheap') return item.pricePerItem < 5;
            if (priceFilter === 'Affordable') return item.pricePerItem >= 5 && item.pricePerItem < 20;
            if (priceFilter === 'Expensive') return item.pricePerItem >= 20;
            return true;
        });
    }

    // Category filtering
    if (categoryFilter) {
        const pickedCategory = filters.categories.find(category => category.title === categoryFilter);
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
            const avgRating = calculateAverageRating(item.reviews);
            if (reviewFilter === '3+ Stars') return avgRating >= 3;
            if (reviewFilter === '4+ Stars') return avgRating >= 4;
            if (reviewFilter === '5 Stars') return avgRating === 5;
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
