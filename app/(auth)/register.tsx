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

const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: '', email: '', password: '' }
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setLoading(true);
            const res = await authService.register(data);
            if (res.success && res.data) {
                await login(res.data.user, res.data.accessToken, res.data.refreshToken);
                router.replace('/(tabs)');
            } else {
                Alert.alert('Registration Failed', res.message || 'Unknown error occurred.');
            }
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            const msg = error.response?.data?.message || (err instanceof Error ? err.message : 'Something went wrong');
            Alert.alert('Registration Error', msg);
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
                        <Text className="text-4xl font-extrabold text-blue-600 mb-2">Create Account</Text>
                        <Text className="text-lg text-gray-500 text-center">Join the Mini LMS platform now</Text>
                    </View>

                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Username"
                                placeholder="Choose a username"
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
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Password"
                                placeholder="Create a secure password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                                secureTextEntry
                            />
                        )}
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        className="mt-4"
                    />

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-gray-600">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text className="text-blue-600 font-bold">Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
