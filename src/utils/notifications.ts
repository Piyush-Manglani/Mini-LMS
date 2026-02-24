import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#2563eb',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return;
    }
}

export async function scheduleBookmarkNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Great job learning! 📚",
            body: "You've bookmarked 5 courses! Keep up the momentum and start learning today.",
        },
        trigger: null,
    });
}

export async function scheduleInactivityNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "We miss you! 👋",
            body: "It's been 24 hours since you last opened the app. Continue your learning journey!",
        },
        trigger: { seconds: 86400, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
    });
}
