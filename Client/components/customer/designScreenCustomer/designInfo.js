import React, { useContext, useRef } from "react";
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Linking,
    Alert,
} from "react-native";
import { IconButton, List, Button, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundWrapper from "../../backgroundWrapper"; // Replace with your file structure
import { ClientObjectContext } from "../navigation/ClientObjectProvider";
import { Strings } from "../../../constants/strings";

const DesignInfo = ({ toSend = false, navigation, route }) => {
    const { design } = useContext(ClientObjectContext);
    const clothes = design.items;
    const addItemModalRef = useRef(null);

    const handleOutfitPress = (link) => {
        Linking.openURL(link).catch((err) =>
            console.error("Error opening URL", err)
        );
    };

    const handleDeleteItem = async (itemId, url) => {
        Alert.alert("Delete Item", "This feature is under construction."); // Placeholder for delete logic
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* AppBar with Go Back Button */}
            <Appbar.Header style={{ height: "5%" }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />

                {/* Middle Container (Logo) */}
                <View style={styles.middleContainer}>
                    <Image
                        source={require("../../../data/logo.png")} // Local image using require
                        style={styles.image}
                    />
                </View>
                <Appbar.Action />
            </Appbar.Header>
            <View style={styles.container}>
                <BackgroundWrapper>
                    {/* Scrollable list of outfits */}
                    <View style={styles.scrollableListContainer}>
                        <ScrollView contentContainerStyle={styles.listContent}>
                            {clothes.map((item) => (
                                <List.Item
                                    key={item._id}
                                    title={item.typeOfCloth}
                                    description={item.url}
                                    titleStyle={{ fontWeight: "bold", fontSize: 16 }}
                                    left={() => (
                                        <Image
                                            source={
                                                item.imageOfCloth
                                                    ? item.imageOfCloth.startsWith("data:")
                                                        ? { uri: item.imageOfCloth }
                                                        : {
                                                            uri: `data:image/jpeg;base64,${item.imageOfCloth}`,
                                                        }
                                                    : null
                                            }
                                            style={styles.outfitImage}
                                        />
                                    )}
                                    right={() => (
                                        <View style={styles.iconButtonContainer}>
                                            <IconButton
                                                icon="arrow-right"
                                                size={24}
                                                onPress={() => handleOutfitPress(outfit.url)}
                                            />
                                            {toSend && (
                                                <IconButton
                                                    icon="trash-can"
                                                    size={24}
                                                    onPress={() => handleDeleteItem(outfit._id, outfit.url)}
                                                />
                                            )}
                                        </View>
                                    )}
                                    onPress={() => handleOutfitPress(item.url)}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* AI Mix & Match Section */}
                    <View style={styles.aiMixMatchContainer}>
                        <List.Item
                            title="AI Mix & Match"
                            titleStyle={{ fontSize: 18 }}
                            right={(props) => (
                                <Icon {...props} color="#FFD700" size={30} name="star" />
                            )}
                            onPress={() => navigation.navigate("mixAndMatch")}
                        />
                    </View>
                </BackgroundWrapper>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffbfe",
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
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    selectButton: {
        width: 200,
        paddingVertical: 10,
        borderRadius: 20,
    },
    addButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    addItemButton: {
        width: 200,
        borderRadius: 25,
    },
    addItemButtonText: {
        fontSize: 16,
        fontStyle: "italic",
        color: "#fff",
    },
    middleContainer: {
        flexGrow: 1, // This ensures the image takes the remaining space
        alignItems: "center", // Centers the image horizontally
    },
    image: {
        width: 125, // Adjust the size of the image
        height: 25, // Adjust the size of the image
    },
});


export default DesignInfo;
