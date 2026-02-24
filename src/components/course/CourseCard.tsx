import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../types';

interface CourseCardProps {
    course: Product;
    instructorName: string;
    isBookmarked: boolean;
    onPress: () => void;
    onBookmarkPress: () => void;
}

const CourseCardComponent: React.FC<CourseCardProps> = ({
    course,
    instructorName,
    isBookmarked,
    onPress,
    onBookmarkPress,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            className="bg-white rounded-2xl shadow-sm mb-4 border border-gray-100 overflow-hidden"
        >
            <Image
                source={{ uri: course.thumbnail }}
                contentFit="cover"
                transition={300}
                className="w-full h-40"
            />

            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>
                            {course.title}
                        </Text>
                        <Text className="text-sm font-medium text-gray-500 mt-1">
                            by {instructorName}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={onBookmarkPress}
                        className="p-2 -mr-2 -mt-2"
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <MaterialIcons
                            name={isBookmarked ? "bookmark" : "bookmark-border"}
                            size={24}
                            color={isBookmarked ? "#2563eb" : "#9ca3af"}
                        />
                    </TouchableOpacity>
                </View>

                <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
                    {course.description}
                </Text>

                <View className="flex-row items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <View className="flex-row items-center">
                        <MaterialIcons name="star" size={16} color="#fbbf24" />
                        <Text className="text-sm font-medium text-gray-700 ml-1">{course.rating}</Text>
                    </View>
                    <Text className="text-lg font-bold text-blue-600">${course.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const CourseCard = memo(CourseCardComponent, (prevProps, nextProps) => {
    return (
        prevProps.isBookmarked === nextProps.isBookmarked &&
        prevProps.course.id === nextProps.course.id &&
        prevProps.instructorName === nextProps.instructorName
    );
});
