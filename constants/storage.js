
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDataToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

export const getDataFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

