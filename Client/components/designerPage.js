import React from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const DesignerPage = ({ route, navigation }) => {
    const { designerData } = route.params; // Destructure designerData from route params
    const { image, name, bio, reviews = [], score } = designerData; // Destructure relevant fields

    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
        averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    } else {
        averageRating = "No reviews yet"; // Default message if no reviews
    }

    return (
        <View style={styles.container}>
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
                        navigation.navigate("orderDetails", { designerData: profile })
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
    innerContainer: {
        flex: 1,
        padding: 13,
    },
    banner: {
        height: 150,
        backgroundColor: '#f7f3fa',
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
        // flex: 1,
        textAlign: 'center',
        marginTop: 100,
        marginVertical: 64, // Adjusted for avatar overlap
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
});

export default DesignerPage;
