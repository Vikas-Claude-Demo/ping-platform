import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Theme';
import { DemoProvider, useDemo } from '../context/DemoContext';
import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

function NotificationBanner() {
  const { notification, hideNotification } = useDemo();
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (notification?.visible) {
      Animated.spring(translateY, {
        toValue: 50,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [notification?.visible]);

  return (
    <Animated.View style={[styles.notificationContainer, { transform: [{ translateY }] }]}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification?.title}</Text>
        <Text style={styles.notificationMessage}>{notification?.message}</Text>
      </View>
    </Animated.View>
  );
}

export default function RootLayout() {
  return (
    <DemoProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: Colors.bgBase },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />

        <Stack.Screen
          name="qr-scanner"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="rates"
          options={{
            headerShown: true,
            headerTitle: 'Exchange Rates',
            headerStyle: { backgroundColor: Colors.bgWhite },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="network"
          options={{
            headerShown: true,
            headerTitle: 'Payment Network',
            headerStyle: { backgroundColor: Colors.bgWhite },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="load-money"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tap-to-pay"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
      </Stack>
      <NotificationBanner />
    </DemoProvider>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  notificationContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
