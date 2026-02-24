import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setStorageItem(key: string, value: unknown) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // Ignored
    }
}

export async function getStorageItem<T>(key: string): Promise<T | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return null;
    }
}

export async function removeStorageItem(key: string) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // Ignored
    }
}
