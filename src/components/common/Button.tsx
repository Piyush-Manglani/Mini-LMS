import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    loading = false,
    variant = 'primary',
    className = '',
    disabled,
    ...rest
}) => {
    const baseClasses = 'flex-row items-center justify-center py-4 px-6 rounded-xl';

    let variantClasses = '';
    let textClasses = 'font-bold text-lg';

    switch (variant) {
        case 'primary':
            variantClasses = 'bg-blue-600';
            textClasses += ' text-white';
            break;
        case 'secondary':
            variantClasses = 'bg-gray-200';
            textClasses += ' text-gray-800';
            break;
        case 'outline':
            variantClasses = 'bg-transparent border-2 border-blue-600';
            textClasses += ' text-blue-600';
            break;
    }

    const disabledClasses = disabled || loading ? 'opacity-50' : '';

    return (
        <TouchableOpacity
            className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? '#2563eb' : '#ffffff'} />
            ) : (
                <Text className={textClasses}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
