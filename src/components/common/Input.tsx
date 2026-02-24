import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(({ label, error, className = '', ...rest }, ref) => {
    return (
        <View className={`mb-4 ${className}`}>
            <Text className="text-gray-700 font-medium mb-1 ml-1">{label}</Text>
            <TextInput
                ref={ref}
                className={`bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl px-4 py-3 text-base`}
                style={{ color: '#111827', minHeight: 48 }}
                placeholderTextColor="#9ca3af"
                cursorColor="#2563eb"
                {...rest}
            />
            {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
        </View>
    );
});

Input.displayName = 'Input';
