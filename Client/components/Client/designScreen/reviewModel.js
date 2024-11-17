import React, { useState, forwardRef, useImperativeHandle, useContext } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TextInput, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { submitReview } from '../../../apiServices/client/submitReview';
import { AppObjectContext } from '../../appNavigation/appObjectProvider';

const ModelContent = ({ handleRating, loadingReview, reviewText, rating, sendReview, setReviewText, closeModal, retrySendingReview }) => {
    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Add Review</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.closeButton}>×</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                            <FontAwesome
                                name={star <= rating ? 'star' : 'star-o'}
                                size={30}
                                color={star <= rating ? '#FFD700' : '#CCC'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Write your review..."
                    multiline={true}
                    value={reviewText}
                    onChangeText={setReviewText}
                />
                {loadingReview ? (
                    <ActivityIndicator size="large" color="#BA8EF7" />
                ) : (
                    <Button
                        mode="contained"
                        onPress={sendReview}
                        disabled={rating === 0 || reviewText.trim() === ''}
                        style={[styles.addButton, (rating === 0 || reviewText.trim() === '') && styles.disabledButton]}
                    >
                        Add
                    </Button>
                )}
                {!loadingReview && !rating && reviewText.trim() === '' && (
                    <Button
                        mode="contained"
                        onPress={retrySendingReview}
                        style={styles.retryButton}
                    >
                        Retry
                    </Button>
                )}
            </View>
        </View>
    );
};

const ReviewModal = forwardRef((props, ref) => {
    const {updateReview} = props
    const { userDetails: { token } } = useContext(AppObjectContext);
    // Initializing state based on the presence of the review prop
    const [isModalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState(null); // Store any error message for retries
    const [designerUsername, setDesignerUsername] = useState('')    
    const [loadingReview, setLoadingReview] = useState(null); 
    const openModal = (reviewData) => {
        setModalVisible(true);
        if (reviewData == null) {
            return
        }
        const { review, number, designerUsername } = reviewData
        setRating(number)
        setReviewText(review)
        setDesignerUsername(designerUsername)
    };

    const closeModal = () => {
        setModalVisible(false);
        setRating(0);
        setReviewText('');
        setError(null); // Reset error on closing modal
    };

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
    };

    const sendReview = async () => {
        const reviewData = { token, review: reviewText, number: rating, designerUsername: designerUsername }
        setLoadingReview(true);
        try {
            const success = await submitReview(token, reviewData);
            if (success) {
                closeModal(); 
                updateReview(reviewData)
            }
        } catch (e) {
            setError('Failed to submit review. Please try again.');
        } finally {
            setLoadingReview(false);
        }
    };

    const retrySendingReview = () => {
        setError(null);
        review = 
        sendReview({ token, review: reviewText, number: rating, designerUsername: designerUsername }); // Retry the submission
        console.log(reviewText, token, rating, designerUsername)
    };


    useImperativeHandle(ref, () => ({
        openModal,
    }));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
        >
            <ModelContent
                handleRating={handleRating}
                reviewText={reviewText}
                rating={rating}
                sendReview={sendReview}
                setReviewText={setReviewText}
                closeModal={closeModal}
                retrySendingReview={retrySendingReview}
                loadingReview={loadingReview}
            />
        </Modal>
    );
});

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Example: lighter background color
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 24,
        color: '#000',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 15,
    },
    textInput: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#F8F8F8',
    },
    addButton: {
        backgroundColor: '#BA8EF7',
        borderRadius: 20,
    },
    disabledButton: {
        backgroundColor: '#CCC',
    },
    retryButton: {
        backgroundColor: '#FF6347',
        borderRadius: 20,
        marginTop: 10,
    },
});

export default ReviewModal;
