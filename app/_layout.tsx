import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import '../global.css';
import { ErrorBanner } from '../src/components/common/ErrorBanner';
import { AuthProvider, useAuth } from '../src/store/AuthContext';
import { BookmarkProvider } from '../src/store/BookmarkContext';
import { registerForPushNotificationsAsync, scheduleInactivityNotification } from '../src/utils/notifications';

function InitialLayout() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/) && appState.current === 'active') {
        scheduleInactivityNotification();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (token && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ErrorBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="course/[id]" />
        <Stack.Screen name="webview/[url]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <InitialLayout />
      </BookmarkProvider>
    </AuthProvider>
  );
}
