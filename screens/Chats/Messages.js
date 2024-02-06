// Message.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Messages = ({ sender, content, timestamp, receiverid, image }) => {
    const navigation = useNavigation();
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return timestamp ? `${hours}:${minutes}` : "";
    };

    return (
        <View style={styles.messageContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: image }} style={styles.avatarImage} />
                </View>
                <TouchableOpacity style={styles.title} onPress={() => navigation.navigate("chatdtls", {
                    recepientId: receiverid
                })}>
                    <View>
                        <Text style={styles.sender}>{sender}</Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                    <Text style={styles.timestamp}>{formatTimestamp(timestamp)}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

    },
    sender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15
    },
    avatarContainer: {
        width: 50, // Set the width and height as per your requirements for the circular avatar
        height: 50,
        borderRadius: 50, // Make it half of the width/height to create a circular shape
        overflow: 'hidden',
        borderWidth: 0.7

    },
    avatarImage: {
        flex: 1, // Ensure the image takes the full container space
        width: null, // Make sure the width and height are null to stretch the image
        height: null,
    },
});

export default Messages;
