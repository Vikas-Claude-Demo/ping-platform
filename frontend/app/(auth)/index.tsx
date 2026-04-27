import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  Dimensions, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Decoration */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          
          {/* Logo & Brand */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[Colors.brand, Colors.brandLight]}
              style={styles.logoBadge}
            >
              <Text style={styles.logoText}>P</Text>
            </LinearGradient>
            <Text style={styles.brandName}>Ping</Text>
          </View>

          {/* Hero Image/Illustration Area */}
          <View style={styles.heroArea}>
            <View style={styles.cardIllustration}>
              <LinearGradient
                colors={['#2D3436', '#000000']}
                style={styles.mockCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHead}>
                  <View style={styles.chip} />
                  <MaterialCommunityIcons name="contactless-payment" size={24} color="rgba(255,255,255,0.3)" />
                </View>
                <Text style={styles.cardNum}>**** **** **** 4242</Text>
                <View style={styles.cardFoot}>
                  <Text style={styles.cardLabel}>VISA</Text>
                </View>
              </LinearGradient>
              
              <View style={styles.statusBubble}>
                <MaterialCommunityIcons name="check-circle" size={20} color={Colors.success} />
                <Text style={styles.statusText}>Payment Translated</Text>
              </View>
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textSection}>
            <Text style={styles.title}>
              Pay anywhere.{'\n'}
              <Text style={{ color: Colors.brand }}>Like a local.</Text>
            </Text>
            <Text style={styles.subtitle}>
              The world's first payment translation platform. Bridge any local payment rail in seconds.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push('/(auth)/register')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[Colors.brand, Colors.brandLight]}
                style={styles.btnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryBtnText}>Get Started</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push('/(auth)/register')} // For demo, both go to register/login flow
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryBtnText}>I already have an account</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Info */}
          <View style={styles.footer}>
            <View style={styles.trustBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color={Colors.textMuted} />
              <Text style={styles.trustText}>Bank-grade security</Text>
            </View>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
    overflow: 'hidden',
  },
  safe: {
    flex: 1,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
  },
  circle2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(74, 144, 226, 0.03)',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  brandName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  heroArea: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardIllustration: {
    width: width * 0.7,
    height: 160,
    position: 'relative',
  },
  mockCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    width: 32,
    height: 24,
    backgroundColor: '#FFEAA7',
    borderRadius: 4,
    opacity: 0.8,
  },
  cardNum: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardFoot: {
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  statusBubble: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 48,
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    color: Colors.textSecondary,
    lineHeight: 26,
    opacity: 0.8,
  },
  actions: {
    gap: 16,
    marginTop: 40,
  },
  primaryBtn: {
    height: 60,
    borderRadius: Radii.full,
    overflow: 'hidden',
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  btnGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryBtn: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    opacity: 0.6,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
