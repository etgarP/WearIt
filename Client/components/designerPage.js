import React, { useContext } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Chip, Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ClientObjectContext } from './Client/navigation/ClientObjectProvider'; 

const { width, height } = Dimensions.get('screen');

const DesignerPage = ({ navigation }) => {
    const { profile } = useContext(ClientObjectContext);
    const { image, name, bio, reviews = [], specialization = [] } = profile; // Include specialization field
    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
        averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    } else {
        averageRating = "No reviews yet"; // Default message if no reviews
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>
            {/* Banner with Avatar */}
            <View style={styles.banner}>
                <View style={styles.avatarContainer}>
                    <Avatar.Image size={100} source={{ uri: image }} />
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>

            <View style={styles.innerContainer}>
                {/* Bio */}
                <Text style={styles.bio}>{bio}</Text>
                
                {/* Specializations */}
                <Text style={styles.averageRating}>
                    Specializations
                </Text>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="chevron-left" size={24} color="gray" style={styles.scrollArrow} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.specializationScroll}
                    >
                        {specialization.map((item, index) => (
                            <Chip key={index} style={styles.chip}>
                                {item}
                            </Chip>
                        ))}
                    </ScrollView>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="gray" style={styles.scrollArrow} />
                </View>

                {/* Average Rating Display */}
                <Text style={styles.averageRating}>
                    Average Rating: {typeof averageRating === "string" ? averageRating : averageRating.toFixed(1)} {/* Display rating or message */}
                </Text>

                {/* Horizontal ScrollView for Reviews */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewsScroll}>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <View key={index} style={styles.reviewContainer}>
                                <Text style={styles.reviewText}>{review.reviewText}</Text>
                                <View style={styles.rating}>
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <MaterialCommunityIcons
                                            key={idx}
                                            name="star"
                                            size={24}
                                            color={idx < review.rating ? "black" : "gray"}
                                        />
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No reviews yet.</Text>
                    )}
                </ScrollView>

                {/* Select Button */}
                <Button
                    mode="contained"
                    onPress={() =>
                        navigation.navigate("orderDetails")
                    }
                    style={styles.selectButton}
                >
                    Select
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appbar: {
        width: width,
        backgroundColor: '#eee8f4',
    },
    innerContainer: {
        flex: 1,
        padding: 13,
    },
    banner: {
        height: height * 0.08,
        backgroundColor: '#eee8f4',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    avatarContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: -80, // This will overlap the avatar on the banner
    },
    name: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bio: {
        textAlign: 'center',
        marginTop: 100,
        marginVertical: 64, // Adjusted for avatar overlap
    },
    specializationScroll: {
        marginTop: 10,
        marginBottom: 10,
    },
    chip: {
        marginHorizontal: 5,
        backgroundColor: '#e0f7fa',
    },
    averageRating: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 8,
        fontSize: 16,
    },
    reviewsScroll: {
        flexDirection: 'row',
        marginBottom: 16,
        maxHeight: 150,
    },
    reviewContainer: {
        width: width * 0.8,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    reviewText: {
        flex: 1,
        marginRight: 8,
    },
    rating: {
        flexDirection: 'row',
    },
    selectButton: {
        alignSelf: 'center',
        marginTop: 16,
    },
    row: {
        flexDirection: 'row', // Align children horizontally
        justifyContent: 'space-between', // Distribute space evenly between items
        alignItems: 'center', // Vertically align items (optional, for centering)
    },
    box1: {
        flex: 1, // Or use a specific width if needed
        // marginRight: 10, // Add space between the two boxes
    },
});

export default DesignerPage;
