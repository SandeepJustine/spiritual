import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { septemberCalendar } from '@/data/septemberCalendar';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'web') {
    // Request browser notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  } else {
    // Check if device supports notifications
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return false;
    }
    
    // Request mobile notification permission
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }
    
    return finalStatus === 'granted';
  }
};

export const scheduleMonthlyNotifications = async () => {
  const hasPermission = await requestNotificationPermissions();
  
  if (!hasPermission) {
    return false;
  }

  // Cancel all existing notifications first
  await Notifications.cancelAllScheduledNotificationsAsync();

  const currentYear = new Date().getFullYear();
  const september = 8; // September is month 8 (0-indexed)

  for (const activity of septemberCalendar) {
    const notificationDate = new Date(currentYear, september, activity.day, 8, 0, 0); // 8 AM
    
    // Only schedule if the date is in the future
    if (notificationDate > new Date()) {
      if (Platform.OS === 'web') {
        // For web, we'll use a simpler approach
        const timeUntilNotification = notificationDate.getTime() - Date.now();
        
        if (timeUntilNotification > 0) {
          setTimeout(() => {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`Day ${activity.day}: ${activity.title}`, {
                body: activity.description,
                icon: '/icon.png'
              });
            }
          }, timeUntilNotification);
        }
      } else {
        // For mobile platforms
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `Day ${activity.day}: ${activity.title}`,
            body: activity.description,
            data: { day: activity.day },
          },
          trigger: {
            date: notificationDate,
          },
        });
      }
    }
  }

  return true;
};

export const cancelAllNotifications = async () => {
  if (Platform.OS !== 'web') {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
};