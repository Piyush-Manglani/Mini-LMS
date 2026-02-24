import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CourseWebViewScreen() {
    const { url } = useLocalSearchParams<{ url: string }>();
    const [loading, setLoading] = useState(true);

    if (!url) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#red-500" />
            </View>
        );
    }

    const targetUrl = decodeURIComponent(url);

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Course Content',
                    headerBackTitle: 'Back'
                }}
            />
            <View className="flex-1 bg-white">
                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#2563eb"
                        className="absolute z-10 top-1/2 left-1/2 -ml-4 -mt-4"
                    />
                )}
                <WebView
                    source={{ uri: targetUrl }}
                    className="flex-1"
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => {
                        Alert.alert('Playback Error', 'Failed to load course content. Please check your connection.');
                    }}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                />
            </View>
        </>
    );
}
