import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Step = {
  id: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  badge: string;
};

const STEPS: Step[] = [
  {
    id: 'identity',
    icon: 'badge-account-horizontal-outline',
    title: 'Verify your identity',
    description: 'Scan your passport or national ID. We\'ll also take a quick selfie to match.',
    badge: 'Required',
  },
  {
    id: 'card',
    icon: 'credit-card-outline',
    title: 'Link a payment method',
    description: 'Add a debit or credit card. Your card is securely tokenised — we never store the number.',
    badge: 'Required',
  },
];

export default function KYCScreen() {
  const router = useRouter();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allDone = STEPS.every(s => completed.has(s.id));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Nav */}
        <TouchableOpacity id="kyc-back-btn" style={styles.backBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Before you travel</Text>
          <Text style={styles.subheading}>
            We need to verify your identity and link a funding source. This keeps your money safe and meets international payment regulations.
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completed.size / STEPS.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {completed.size} of {STEPS.length} complete
        </Text>

        {/* Steps */}
        <View style={styles.stepList}>
          {STEPS.map(step => {
            const done = completed.has(step.id);
            return (
              <TouchableOpacity
                key={step.id}
                id={`kyc-step-${step.id}`}
                style={[styles.stepCard, done && styles.stepCardDone]}
                onPress={() => toggle(step.id)}
                activeOpacity={0.75}
              >
                <View style={[styles.stepIcon, done && styles.stepIconDone]}>
                  <MaterialCommunityIcons
                    name={done ? 'check' : step.icon}
                    size={24}
                    color={done ? '#fff' : Colors.brand}
                  />
                </View>
                <View style={styles.stepBody}>
                  <View style={styles.stepTitleRow}>
                    <Text style={[styles.stepTitle, done && styles.stepTitleDone]}>
                      {step.title}
                    </Text>
                    <View style={[styles.badge, done && styles.badgeDone]}>
                      <Text style={[styles.badgeText, done && styles.badgeTextDone]}>
                        {done ? 'Done' : step.badge}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
                {!done && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={Colors.textMuted}
                    style={styles.chevron}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Trust badges */}
        <View style={styles.trustRow}>
          <MaterialCommunityIcons name="shield-check-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.trustText}>256-bit SSL encrypted · PCI DSS compliant · FATF aligned KYC</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          id="kyc-complete-btn"
          style={[styles.ctaButton, !allDone && styles.ctaDisabled]}
          onPress={() => router.replace('/(tabs)')}
          disabled={!allDone}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Complete Setup</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgWhite },
  container: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  backLabel: { fontSize: 15, color: Colors.textPrimary, fontWeight: '500' },
  header: { marginBottom: Spacing.lg },
  heading: { ...Typography.hero, color: Colors.textPrimary, marginBottom: Spacing.sm },
  subheading: { ...Typography.body, color: Colors.textSecondary },
  progressBar: {
    height: 4,
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radii.full,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: Radii.full,
  },
  progressLabel: { ...Typography.caption, color: Colors.textMuted, marginBottom: Spacing.xl },
  stepList: { gap: Spacing.md, marginBottom: Spacing.xl },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgWhite,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.md,
  },
  stepCardDone: {
    borderColor: Colors.success,
    backgroundColor: Colors.successBg,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  stepIconDone: { backgroundColor: Colors.success },
  stepBody: { flex: 1 },
  stepTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 },
  stepTitle: { ...Typography.h3, color: Colors.textPrimary, flex: 1 },
  stepTitleDone: { color: Colors.success },
  badge: {
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.sm,
  },
  badgeDone: { backgroundColor: Colors.success },
  badgeText: { ...Typography.caption, color: Colors.warning, fontWeight: '600' },
  badgeTextDone: { color: '#fff' },
  stepDescription: { ...Typography.body, color: Colors.textSecondary, fontSize: 13 },
  chevron: { alignSelf: 'center', marginLeft: Spacing.xs },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.bgSubtle,
    padding: Spacing.md,
    borderRadius: Radii.md,
  },
  trustText: { ...Typography.caption, color: Colors.textMuted, flex: 1 },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 16,
  },
  ctaDisabled: { backgroundColor: Colors.bgSubtle },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
