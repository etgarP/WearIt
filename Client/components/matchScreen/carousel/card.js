import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, Button, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const MyCard = ({ profile, setProfilePage, index, navigation }) => {
    // Destructure profile properties for better readability
    const { name, image, description, specialization, score } = profile;
    

    return (
        <Card style={styles.card}>
            {/* Avatar and Name */}
            <View style={styles.avatarContainer}>
                {/* Using profile.image or a default placeholder image */}
                <Avatar.Image size={100} source={{ uri: image || 'https://picsum.photos/100' }} />
                <Text style={styles.name}>{name}</Text>
            </View>

            <Card.Content>
                {/* If description exists, display it. Otherwise, show a default message */}
                <Text style={styles.description}>
                    {description || `Hi, I specialize in ${specialization || 'designing'}. Let's create something amazing together!`}
                </Text>

                {/* Rating Stars - Map over an array to create the star icons */}
                <View style={styles.rating}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <MaterialCommunityIcons
                            key={idx}
                            name="star"
                            size={24}
                            color={idx < Math.floor(score / 20) ? "black" : "gray"} // Color based on score
                        />
                    ))}
                </View>

                {/* Progress Bar to show matching score as a percentage */}
                <ProgressBar progress={score / 100} color="green" style={styles.progressBar} />
                <Text style={styles.matchText}>{score}% match</Text>
            </Card.Content>

            {/* "Read more" Button to navigate to the profile details page */}
            <Card.Actions>
                <View style={styles.buttonContainer}>
                    {/* Correct navigation call: navigate to "ProfileDetails" */}
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => {
                            setProfilePage(profile);  // Sets the profile in the parent state
                            navigation.navigate("ProfileDetails", { designerData: profile });  // Pass profile as designerData
                        }}  
                    >
                        Read more
                    </Button>
                </View>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingTop: 25,
        padding: 20,
        height: height * 0.6, // 60% of the screen height for the card size
    },
    avatarContainer: {
        alignItems: 'center', // Center align the avatar
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold', // Bold the designer's name
        marginTop: 10,
        textTransform: 'capitalize', // Capitalize the first letter of the name
    },
    description: {
        height: height * 0.18,
        textAlign: 'center',
        marginBottom: 15, // Space between description and rating stars
    },
    rating: {
        flexDirection: 'row', // Layout stars in a row
        justifyContent: 'center', // Center the stars horizontally
        marginBottom: 10,
    },
    progressBar: {
        height: 8,
        borderRadius: 5, // Rounded edges for the progress bar
        marginVertical: 10, // Space around the progress bar
    },
    matchText: {
        textAlign: 'center',
        fontWeight: 'bold', // Make the match percentage stand out
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center', // Center the button vertically
        alignItems: 'center', // Center the button horizontally
    },
    button: {
        borderRadius: 30, // Rounded button style
        paddingHorizontal: 30, // Padding for the button
    },
});

export default MyCard;
