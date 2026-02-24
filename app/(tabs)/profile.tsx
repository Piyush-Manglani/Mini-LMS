import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/store/AuthContext';
import { useBookmarks } from '../../src/store/BookmarkContext';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const { bookmarkedIds } = useBookmarks();
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                    router.replace('/(auth)/login');
                }
            },
        ]);
    };

    if (!user) {
        return (
            <View className="flex-1 justify-center items-center h-full bg-gray-50">
                <Text>Please log in.</Text>
            </View>
        );
    }

    const avatarUrl = user.avatar?.url || `https://ui-avatars.com/api/?name=${user.username}&background=random`;

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                <View className="bg-white pt-12 pb-6 px-6 items-center shadow-sm border-b border-gray-100 relative">
                    <TouchableOpacity
                        className="absolute top-6 right-6 bg-gray-100 p-2 rounded-full"
                        onPress={() => Alert.alert('Edit Profile', 'Feature coming soon.')}
                    >
                        <MaterialIcons name="edit" size={20} color="#4b5563" />
                    </TouchableOpacity>

                    <View className="relative">
                        <Image
                            source={{ uri: avatarUrl }}
                            className="w-28 h-28 rounded-full border-4 border-blue-50"
                            contentFit="cover"
                            transition={300}
                        />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 mt-4 capitalize">{user.username}</Text>
                    <Text className="text-base text-gray-500">{user.email}</Text>
                    <View className="mt-2 bg-blue-100 px-3 py-1 rounded-full">
                        <Text className="text-blue-700 text-xs font-semibold uppercase">{user.role || 'Student'}</Text>
                    </View>
                </View>

                <View className="flex-row justify-around bg-white mt-4 p-4 shadow-sm border-y border-gray-100">
                    <View className="items-center">
                        <Text className="text-2xl font-extrabold text-blue-600">{bookmarkedIds.length}</Text>
                        <Text className="text-gray-500 font-medium text-sm mt-1">Bookmarked</Text>
                    </View>
                    <View className="w-[1px] bg-gray-200" />
                    <View className="items-center">
                        <Text className="text-2xl font-extrabold text-green-600">3</Text>
                        <Text className="text-gray-500 font-medium text-sm mt-1">In Progress</Text>
                    </View>
                    <View className="w-[1px] bg-gray-200" />
                    <View className="items-center">
                        <Text className="text-2xl font-extrabold text-purple-600">12</Text>
                        <Text className="text-gray-500 font-medium text-sm mt-1">Completed</Text>
                    </View>
                </View>

                <View className="bg-white mt-4 mb-8 shadow-sm border-y border-gray-100">
                    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                        <View className="bg-gray-100 p-2 rounded-full">
                            <MaterialIcons name="person-outline" size={24} color="#4b5563" />
                        </View>
                        <Text className="flex-1 ml-4 text-gray-800 font-medium text-base">Account Info</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                        <View className="bg-blue-50 p-2 rounded-full">
                            <MaterialIcons name="notifications-none" size={24} color="#2563eb" />
                        </View>
                        <Text className="flex-1 ml-4 text-gray-800 font-medium text-base">Notifications</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                        <View className="bg-gray-100 p-2 rounded-full">
                            <MaterialIcons name="help-outline" size={24} color="#4b5563" />
                        </View>
                        <Text className="flex-1 ml-4 text-gray-800 font-medium text-base">Help & Support</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout} className="flex-row items-center p-4">
                        <View className="bg-red-50 p-2 rounded-full">
                            <MaterialIcons name="logout" size={24} color="#ef4444" />
                        </View>
                        <Text className="flex-1 ml-4 text-red-600 font-bold text-base">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
