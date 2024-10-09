import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Avatar, Card, Button, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('screen');

const MyCard = ({ name, image, description, score, specialization, scrollX }) => (
    <Card style={styles.card}>
        <View style={styles.avatarContainer}>
            <Avatar.Image size={100} source={{ uri: image || 'https://picsum.photos/100' }} />
            <Text style={styles.name}>{name}</Text>
        </View>

        <Card.Content>
            <Text style={styles.description}>
                {description || `Hi, I specialize in ${specialization || 'designing'}. Let's create something amazing together!`}
            </Text>

            <View style={styles.rating}>
                {/* Render stars based on score */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <MaterialCommunityIcons
                        key={index}
                        name="star"
                        size={24}
                        color={index < Math.floor(score / 20) ? "black" : "gray"}
                    />
                ))}
            </View>

            <ProgressBar progress={score / 100} color="green" style={styles.progressBar} />
            <Text style={styles.matchText}>{score}% match</Text>
        </Card.Content>

        <Card.Actions>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={() => { /* Action here */ }}>
                    Read more
                </Button>
            </View>
        </Card.Actions>
    </Card>
);


const styles = StyleSheet.create({
    card: {
        paddingTop: 25,
        padding: 20,
        height: height*0.6
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        textTransform: 'capitalize',
    },
    description: {
        textAlign: 'center',
        marginBottom: 15,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    progressBar: {
        height: 8,
        borderRadius: 5,
        marginVertical: 10,
    },
    matchText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 30,
        paddingHorizontal: 30,
    },
});

export default MyCard;
