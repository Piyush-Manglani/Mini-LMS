import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const ErrorBanner = () => {
    const { isConnected } = useNetworkStatus();

    if (isConnected) return null;

    return (
        <View className="bg-red-500 py-3 px-4 flex-row items-center justify-center absolute top-12 left-0 right-0 z-50 rounded-b-xl shadow-md">
            <MaterialIcons name="wifi-off" size={20} color="white" />
            <Text className="text-white font-bold ml-2">No Internet Connection</Text>
        </View>
    );
};
