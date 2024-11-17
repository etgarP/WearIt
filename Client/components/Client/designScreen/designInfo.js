import React, { useContext } from 'react';
import { View, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';
import { ClientObjectContext } from '../navigation/ClientObjectProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';


const DesignInfo = ({ toSend = false, navigation }) => {
    const { design } = useContext(ClientObjectContext);
    const clothes = design.items;

    const handleOutfitPress = (link) => {
        Linking.openURL(link).catch((err) => console.error('Error opening URL', err));
    };

    return (
        <View style={styles.container}>

            {/* Scrollable list of outfits */}
            <View style={styles.scrollableListContainer}>
                <ScrollView contentContainerStyle={styles.listContent}>
                    {clothes.map((outfit) => (
                        <List.Item
                            key={outfit._id}
                            title={outfit.typeOfCloth}
                            left={() => <Image source={{ uri: outfit.imageOfCloth }} style={styles.outfitImage} />}
                            right={() => <List.Icon icon="chevron-right" />}
                            onPress={() => handleOutfitPress(outfit.url)}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* AI Mix & Match Section */}
            <View style={styles.aiMixMatchContainer}>
                <List.Item
                    title="AI Mix & Match"
                    titleStyle={{ fontSize: 18 }}
                    right={props => <Icon {...props} color="#FFD700" size={30} name="star" />}
                    onPress={() => navigation.navigate('mixAndMatch')}
                />
            </View>

            {/* Send to Customer Button */}
            {toSend && (
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        style={styles.selectButton}
                        onPress={() => console.log('pressed')}
                    >
                        Select
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbfe',
    },
    scrollableListContainer: {
        flex: 1, // Allows the ScrollView to take up available space
    },
    listContent: {
        paddingHorizontal: 10,
    },
    outfitImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginLeft: 20,
    },
    aiMixMatchContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    selectButton: {
        width: 200,
        paddingVertical: 10,
        borderRadius: 20,
    },
});

export default DesignInfo;
