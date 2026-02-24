import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View } from 'react-native';
import { courseService } from '../../src/api/services/course';
import { CourseCard } from '../../src/components/course/CourseCard';
import { useBookmarks } from '../../src/store/BookmarkContext';
import { Instructor, Product } from '../../src/types';

export default function CourseCatalogScreen() {
  const [courses, setCourses] = useState<Product[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const router = useRouter();

  const fetchData = async () => {
    try {
      const [coursesRes, instructorsRes] = await Promise.all([
        courseService.getCourses(),
        courseService.getInstructors()
      ]);

      if (coursesRes.success && coursesRes.data) {
        const apiData = coursesRes.data as any;

        let productsArray = [];
        if (apiData.data && Array.isArray(apiData.data)) {
          productsArray = apiData.data;
        } else if (apiData.products && Array.isArray(apiData.products)) {
          productsArray = apiData.products;
        } else if (Array.isArray(apiData)) {
          productsArray = apiData;
        } else if (apiData.data && apiData.data.data && Array.isArray(apiData.data.data)) {
          productsArray = apiData.data.data;
        }

        setCourses(productsArray.slice(0, 10));
      }

      if (instructorsRes.success) {
        const users = instructorsRes.data?.data?.users || instructorsRes.data?.users || instructorsRes.data?.data || [];
        setInstructors(Array.isArray(users) ? users : []);
      }
    } catch (error) {
      // Ignored
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const getInstructorName = (index: number) => {
    if (instructors.length === 0) return 'John Doe';
    const instructor = instructors[index % instructors.length];
    return instructor?.name?.first ? `${instructor.name.first} ${instructor.name.last}` : instructor?.username || 'Jane Smith';
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(({ item, index }: { item: Product; index: number }) => (
    <CourseCard
      course={item}
      instructorName={getInstructorName(index)}
      isBookmarked={isBookmarked(item.id)}
      onPress={() => router.push(`/course/${item.id}`)}
      onBookmarkPress={() => toggleBookmark(item.id)}
    />
  ), [instructors, isBookmarked]);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 py-3 bg-white shadow-sm border-b border-gray-100 z-10 flex-row items-center">
        <MaterialIcons name="search" size={24} color="#9ca3af" className="absolute left-6 z-20" />
        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 pl-10 flex-1 text-base text-gray-900"
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
        }
        ListEmptyComponent={
          <View className="py-12 items-center">
            <MaterialIcons name="search-off" size={48} color="#d1d5db" />
            <Text className="text-gray-500 mt-4 text-base">No courses found matching "{searchQuery}"</Text>
          </View>
        }
      />
    </View>
  );
}
