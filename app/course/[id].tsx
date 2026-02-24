import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { courseService } from '../../src/api/services/course';
import { Button } from '../../src/components/common/Button';
import { useBookmarks } from '../../src/store/BookmarkContext';
import { Product } from '../../src/types';

export default function CourseDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const [course, setCourse] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await courseService.getCourseDetails(Number(id));
                if (res.success && res.data) {
                    const productData = ('data' in res.data) ? (res.data as { data: Product }).data : (res.data as Product);
                    setCourse(productData);
                } else {
                    Alert.alert('Error', 'Failed to load course details');
                }
            } catch (error) {
                // Return silently or handle outside if needed
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    const handleEnroll = () => {
        setEnrolling(true);
        setTimeout(() => {
            setEnrolling(false);
            Alert.alert(
                'Enrollment Successful',
                `You have successfully enrolled in ${course?.title}!`,
                [{ text: 'Start Learning', onPress: () => router.push(`/webview/${encodeURIComponent('https://reactnative.dev/docs/getting-started')}`) }]
            );
        }, 1500);
    };

    if (loading || !course) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563eb" />
            </SafeAreaView>
        );
    }

    const bookmarked = isBookmarked(course.id);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    title: 'Course Details',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => toggleBookmark(course.id)} className="mr-4">
                            <MaterialIcons
                                name={bookmarked ? 'bookmark' : 'bookmark-border'}
                                size={28}
                                color={bookmarked ? '#2563eb' : '#4b5563'}
                            />
                        </TouchableOpacity>
                    )
                }}
            />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: course.thumbnail }}
                    contentFit="cover"
                    transition={300}
                    className="w-full h-64 bg-gray-100"
                />

                <View className="p-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <View className="bg-blue-100 px-3 py-1 rounded-full">
                            <Text className="text-blue-700 font-semibold text-xs uppercase tracking-wider">{course.category}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <MaterialIcons name="star" size={20} color="#fbbf24" />
                            <Text className="text-gray-700 font-bold ml-1 text-base">{course.rating}</Text>
                        </View>
                    </View>

                    <Text className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                        {course.title}
                    </Text>

                    <Text className="text-gray-500 font-medium mb-6">By {course.brand || 'Premium Instructor'}</Text>

                    <View className="bg-gray-50 rounded-2xl p-4 mb-6 flex-row justify-between items-center border border-gray-100">
                        <View>
                            <Text className="text-gray-500 text-sm font-medium mb-1">Price</Text>
                            <Text className="text-2xl font-bold text-gray-900">${course.price}</Text>
                        </View>
                        <View className="h-full w-[1px] bg-gray-200" />
                        <View>
                            <Text className="text-gray-500 text-sm font-medium mb-1">Discount</Text>
                            <Text className="text-lg font-bold text-green-600">{course.discountPercentage}% OFF</Text>
                        </View>
                        <View className="h-full w-[1px] bg-gray-200" />
                        <View>
                            <Text className="text-gray-500 text-sm font-medium mb-1">Stock</Text>
                            <Text className="text-lg font-bold text-gray-900">{course.stock} left</Text>
                        </View>
                    </View>

                    <Text className="text-xl font-bold text-gray-900 mb-3">About This Course</Text>
                    <Text className="text-base text-gray-600 leading-relaxed mb-8">
                        {course.description}
                        This highly rated course covers all the essential aspects of {course.category}.
                        With practical examples and a hands-on approach, you'll master the concepts in no time!
                    </Text>

                    <Button
                        title={enrolling ? "Enrolling..." : "Enroll Now"}
                        onPress={handleEnroll}
                        loading={enrolling}
                        className="w-full py-5 rounded-2xl"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
