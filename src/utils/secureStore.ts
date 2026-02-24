import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'mini_lms_access_token';
const REFRESH_TOKEN_KEY = 'mini_lms_refresh_token';

export async function setTokens(accessToken: string, refreshToken: string) {
    try {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, String(accessToken));
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, String(refreshToken));
    } catch (error) {
        // Ignored
    }
}

export async function getAccessToken() {
    try {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    } catch (error) {
        return null;
    }
}

export async function clearTokens() {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
        // Ignored
    }
}
