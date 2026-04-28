import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDemo } from '../context/DemoContext';
import * as Haptics from 'expo-haptics';

export default function TapToPayModal() {
  const router = useRouter();
  const { makePurchase, showNotification } = useDemo();
  const [status, setStatus] = useState<'ready' | 'processing' | 'success'>('ready');
  
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status === 'ready') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
    }
  }, [status]);

  const handleTap = () => {
    if (status !== 'ready') return;
    
    setStatus('processing');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate NFC interaction
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setStatus('success');
      
      // Make the purchase
      makePurchase(12.50, 'Starbucks');
      
      // Show Push Notification
      showNotification('Payment Successful', 'You paid $12.50 at Starbucks');
      
      // Auto close after showing success
      setTimeout(() => {
        router.back();
      }, 2000);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {status === 'ready' && 'Hold Near Reader'}
          {status === 'processing' && 'Processing...'}
          {status === 'success' && 'Done!'}
        </Text>
        
        <Text style={styles.subtitle}>
          {status === 'ready' && 'Ready to pay with Ping Visa'}
          {status === 'success' && '$12.50 Paid to Starbucks'}
        </Text>

        <TouchableOpacity activeOpacity={0.9} onPress={handleTap} style={styles.nfcArea}>
          <Animated.View style={[
            styles.pulseCircle, 
            { transform: [{ scale: pulseAnim }], opacity: status === 'ready' ? 1 : 0 }
          ]} />
          
          <View style={[
            styles.iconContainer,
            status === 'success' && { backgroundColor: Colors.success }
          ]}>
            <MaterialCommunityIcons 
              name={status === 'success' ? 'check' : 'contactless-payment'} 
              size={64} 
              color="#fff" 
            />
          </View>
        </TouchableOpacity>

        {status === 'ready' && (
          <Text style={styles.hint}>Tap the icon to simulate NFC</Text>
        )}
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#1E293B',
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    backgroundColor: '#1E293B',
    width: '100%',
    maxWidth: 600,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 60,
  },
  nfcArea: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(56, 189, 248, 0.5)',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.brandLight,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  hint: {
    marginTop: 60,
    color: '#64748B',
    fontSize: 14,
  }
});
