import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as z from 'zod';
import { authService } from '../../src/api/services/auth';
import { Button } from '../../src/components/common/Button';
import { Input } from '../../src/components/common/Input';
import { useAuth } from '../../src/store/AuthContext';

const loginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: '', password: '' }
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setLoading(true);
            const res = await authService.login(data);
            if (res.success && res.data) {
                await login(res.data.user, res.data.accessToken, res.data.refreshToken);
                router.replace('/(tabs)');
            } else {
                Alert.alert('Login Failed', res.message || 'Unknown error occurred.');
            }
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            const msg = error.response?.data?.message || (err instanceof Error ? err.message : 'Something went wrong');
            Alert.alert('Login Error', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
                    <View className="mb-8 items-center">
                        <Text className="text-4xl font-extrabold text-blue-600 mb-2">Mini LMS</Text>
                        <Text className="text-lg text-gray-500 text-center">Login to continue your learning journey</Text>
                    </View>

                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Username"
                                placeholder="Enter your username"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.username?.message}
                                autoCapitalize="none"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                                secureTextEntry
                            />
                        )}
                    />

                    <Button
                        title="Login"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        className="mt-4"
                    />

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/register')}>
                            <Text className="text-blue-600 font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
