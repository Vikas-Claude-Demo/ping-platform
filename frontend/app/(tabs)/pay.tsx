import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  Dimensions, TextInput, Animated, ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const EXCHANGE_RATE = 23.08;

type Step = 'amount' | 'review' | 'processing' | 'success';

export default function PayScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState<Step>('amount');

  // Animations
  const buttonScale   = useRef(new Animated.Value(1)).current;
  const checkScale    = useRef(new Animated.Value(0)).current;
  const checkOpacity  = useRef(new Animated.Value(0)).current;
  const circleScale   = useRef(new Animated.Value(0)).current;
  const successOpacity = useRef(new Animated.Value(0)).current;
  const amountSlide   = useRef(new Animated.Value(30)).current;
  const detailsSlide  = useRef(new Animated.Value(40)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;

  const parsedUSD   = parseFloat(amount || '0');
  const zmwAmount   = (parsedUSD * EXCHANGE_RATE).toFixed(2);
  const fee         = (parsedUSD * 0.005).toFixed(2);
  const totalCharged = (parsedUSD + parseFloat(fee)).toFixed(2);
  const canProceed  = parsedUSD > 0 && recipient.length > 5;

  const handleKey = (val: string) => {
    if (val === '<') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      return;
    }
    if (val === '.' && amount.includes('.')) return;
    if (amount === '0' && val !== '.') {
      setAmount(val);
    } else {
      setAmount(prev => prev + val);
    }
  };

  // ── Confirm button press ─────────────────────────────────────
  const handleConfirm = () => {
    // 1. Bounce the button
    Animated.sequence([
      Animated.spring(buttonScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setStep('processing');

    // 2. After ~1.6s simulate API response → show success
    setTimeout(() => {
      setStep('success');
      runSuccessAnimation();
    }, 1600);
  };

  const runSuccessAnimation = () => {
    // Reset values
    checkScale.setValue(0);
    checkOpacity.setValue(0);
    circleScale.setValue(0);
    successOpacity.setValue(0);
    amountSlide.setValue(30);
    detailsSlide.setValue(40);
    detailsOpacity.setValue(0);

    Animated.sequence([
      // Fade in full screen
      Animated.timing(successOpacity, {
        toValue: 1, duration: 200, useNativeDriver: true,
      }),
      // Circle pops
      Animated.spring(circleScale, {
        toValue: 1, tension: 60, friction: 5, useNativeDriver: true,
      }),
      // Checkmark draws in
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1, tension: 80, friction: 6, useNativeDriver: true,
        }),
        Animated.timing(checkOpacity, {
          toValue: 1, duration: 200, useNativeDriver: true,
        }),
      ]),
      // Amount slides up
      Animated.parallel([
        Animated.timing(amountSlide, {
          toValue: 0, duration: 350, useNativeDriver: true,
        }),
      ]),
      // Details fade in
      Animated.parallel([
        Animated.timing(detailsSlide, {
          toValue: 0, duration: 350, useNativeDriver: true,
        }),
        Animated.timing(detailsOpacity, {
          toValue: 1, duration: 350, useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  // ── Success screen ───────────────────────────────────────────
  if (step === 'success') {
    return (
      <SafeAreaView style={styles.safe}>
        <Animated.View style={[styles.successScreen, { opacity: successOpacity }]}>
          {/* Animated circle + check */}
          <View style={styles.successTop}>
            <Animated.View
              style={[styles.successCircle, { transform: [{ scale: circleScale }] }]}
            >
              <Animated.View
                style={{
                  opacity: checkOpacity,
                  transform: [{ scale: checkScale }],
                }}
              >
                <MaterialCommunityIcons name="check" size={64} color="#fff" />
              </Animated.View>
            </Animated.View>

            <Text style={styles.successLabel}>Payment Sent!</Text>

            {/* Amount slides up */}
            <Animated.Text
              style={[styles.successAmount, { transform: [{ translateY: amountSlide }] }]}
            >
              ZK {zmwAmount}
            </Animated.Text>
            <Text style={styles.successCurrency}>ZMW via M-Pesa</Text>
          </View>

          {/* Details slide up */}
          <Animated.View
            style={[
              styles.successDetails,
              { opacity: detailsOpacity, transform: [{ translateY: detailsSlide }] },
            ]}
          >
            <View style={styles.successRow}>
              <Text style={styles.successDetailLabel}>You sent</Text>
              <Text style={styles.successDetailValue}>${parsedUSD.toFixed(2)} USD</Text>
            </View>
            <View style={styles.successDivider} />
            <View style={styles.successRow}>
              <Text style={styles.successDetailLabel}>Transfer fee</Text>
              <Text style={styles.successDetailValue}>${fee}</Text>
            </View>
            <View style={styles.successDivider} />
            <View style={styles.successRow}>
              <Text style={styles.successDetailLabel}>To</Text>
              <Text style={styles.successDetailValue}>{recipient}</Text>
            </View>
            <View style={styles.successDivider} />
            <View style={styles.successRow}>
              <Text style={styles.successDetailLabel}>Reference</Text>
              <Text style={[styles.successDetailValue, { fontFamily: 'monospace' }]}>
                PNG{Date.now().toString().slice(-8)}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.successActions,
              { opacity: detailsOpacity },
            ]}
          >
            <TouchableOpacity
              id="success-share-btn"
              style={styles.shareBtn}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="share-variant-outline" size={18} color={Colors.brand} />
              <Text style={styles.shareBtnText}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              id="success-done-btn"
              style={styles.doneBtn}
              activeOpacity={0.85}
              onPress={() => {
                setStep('amount');
                setAmount('0');
                setRecipient('');
                router.replace('/(tabs)');
              }}
            >
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    );
  }

  // ── Processing / Review screens ──────────────────────────────
  if (step === 'review' || step === 'processing') {
    const isProcessing = step === 'processing';

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.reviewContainer}>
          {/* Header */}
          <View style={styles.topBar}>
            <TouchableOpacity
              id="review-back-btn"
              onPress={() => !isProcessing && setStep('amount')}
              disabled={isProcessing}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={22}
                color={isProcessing ? Colors.textMuted : Colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Review Transfer</Text>
            <View style={{ width: 22 }} />
          </View>

          {/* Summary */}
          <View style={styles.reviewCard}>
            <View style={styles.reviewAmountRow}>
              <Text style={styles.reviewFrom}>You send</Text>
              <Text style={styles.reviewFromAmt}>
                ${parsedUSD.toFixed(2)} <Text style={styles.ccy}>USD</Text>
              </Text>
            </View>
            <View style={styles.reviewDivider}>
              <View style={styles.reviewLine} />
              <View style={styles.reviewSwapIcon}>
                <MaterialCommunityIcons name="swap-vertical" size={18} color={Colors.brand} />
              </View>
              <View style={styles.reviewLine} />
            </View>
            <View style={styles.reviewAmountRow}>
              <Text style={styles.reviewTo}>Recipient gets</Text>
              <Text style={styles.reviewToAmt}>
                ZK {zmwAmount} <Text style={styles.ccy}>ZMW</Text>
              </Text>
            </View>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Exchange rate</Text>
              <Text style={styles.breakdownValue}>1 USD = {EXCHANGE_RATE} ZMW</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Transfer fee</Text>
              <Text style={styles.breakdownValue}>${fee}</Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownRow}>
              <Text style={[styles.breakdownLabel, { fontWeight: '700', color: Colors.textPrimary }]}>
                Total charged
              </Text>
              <Text style={[styles.breakdownValue, { fontWeight: '700', color: Colors.textPrimary }]}>
                ${totalCharged} USD
              </Text>
            </View>
          </View>

          {/* Recipient */}
          <View style={styles.recipientCard}>
            <View style={styles.recipientIcon}>
              <MaterialCommunityIcons name="cellphone" size={20} color={Colors.brand} />
            </View>
            <View>
              <Text style={styles.recipientMeta}>M-Pesa · Zambia</Text>
              <Text style={styles.recipientNumber}>{recipient}</Text>
            </View>
          </View>

          {/* Trust notice */}
          <View style={styles.noticeRow}>
            <MaterialCommunityIcons name="lock-outline" size={14} color={Colors.success} />
            <Text style={styles.noticeText}>
              Secured end-to-end. Funds arrive within 30 seconds.
            </Text>
          </View>

          <View style={{ flex: 1 }} />

          {/* Animated Confirm button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }], marginBottom: Spacing.lg }}>
            <TouchableOpacity
              id="review-confirm-btn"
              style={[styles.confirmBtn, isProcessing && styles.confirmBtnProcessing]}
              onPress={handleConfirm}
              disabled={isProcessing}
              activeOpacity={0.85}
            >
              {isProcessing ? (
                <View style={styles.processingRow}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.confirmBtnText}>Sending payment…</Text>
                </View>
              ) : (
                <Text style={styles.confirmBtnText}>Confirm & Send</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  // ── Amount entry screen ──────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity id="pay-close-btn" onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Send Money</Text>
        <View style={styles.railTag}>
          <MaterialCommunityIcons name="cellphone-wireless" size={12} color={Colors.brand} />
          <Text style={styles.railTagText}>M-Pesa</Text>
        </View>
      </View>

      {/* Recipient */}
      <View style={styles.recipientInputRow}>
        <Text style={styles.toLabel}>To</Text>
        <TextInput
          id="pay-recipient-input"
          style={styles.recipientTextInput}
          placeholder="Phone number e.g. +260 97 123 4567"
          placeholderTextColor={Colors.textMuted}
          value={recipient}
          onChangeText={setRecipient}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          id="pay-scan-btn"
          style={styles.qrIconBtn}
          onPress={() => router.push('/qr-scanner')}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={22} color={Colors.brand} />
        </TouchableOpacity>
      </View>

      {/* Amount display */}
      <View style={styles.amountDisplay}>
        <Text style={styles.currencyCode}>USD</Text>
        <Text style={[styles.bigAmount, amount.length > 6 && { fontSize: 44 }]}>
          ${amount}
        </Text>
      </View>

      {/* Conversion chip */}
      <View style={styles.conversionChip}>
        <MaterialCommunityIcons name="swap-horizontal" size={14} color={Colors.brandLight} />
        <Text style={styles.conversionText}>
          ≈ ZK {zmwAmount} ZMW  ·  Rate: 1 USD = {EXCHANGE_RATE}
        </Text>
      </View>

      {/* Presets */}
      <View style={styles.presets}>
        {['10', '25', '50', '100'].map(v => (
          <TouchableOpacity
            id={`pay-preset-${v}`}
            key={v}
            style={[styles.presetBtn, amount === v && styles.presetBtnActive]}
            onPress={() => setAmount(v)}
          >
            <Text style={[styles.presetText, amount === v && styles.presetTextActive]}>
              ${v}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      {/* Keypad */}
      <View style={styles.keypad}>
        {[['1','2','3'],['4','5','6'],['7','8','9'],['.','0','<']].map((row, i) => (
          <View key={i} style={styles.keyRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                id={`pay-key-${key}`}
                style={styles.keyBtn}
                onPress={() => handleKey(key)}
                activeOpacity={0.6}
              >
                {key === '<' ? (
                  <MaterialCommunityIcons name="backspace-outline" size={24} color={Colors.textPrimary} />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.ctaContainer}>
        <TouchableOpacity
          id="pay-review-btn"
          style={[styles.ctaButton, !canProceed && styles.ctaDisabled]}
          onPress={() => setStep('review')}
          disabled={!canProceed}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Review Transfer</Text>
          <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },

  // ── Success screen ──────────────────────────────────────────
  successScreen: {
    flex: 1,
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  successTop: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: Spacing.xl,
  },
  successCircle: {
    width: 120, height: 120,
    borderRadius: 60,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  successLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  successAmount: {
    fontSize: 44,
    fontWeight: '800',
    color: Colors.success,
    letterSpacing: -1,
  },
  successCurrency: {
    fontSize: 15,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  successDetails: {
    backgroundColor: Colors.bgBase,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  successRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  successDivider: { height: 1, backgroundColor: Colors.border },
  successDetailLabel: { fontSize: 14, color: Colors.textSecondary },
  successDetailValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  successActions: { gap: Spacing.md },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 14,
  },
  shareBtnText: { fontSize: 15, fontWeight: '600', color: Colors.brand },
  doneBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // ── Review / Processing screen ──────────────────────────────
  reviewContainer: { flex: 1, padding: Spacing.lg },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topBarTitle: { ...Typography.h3, color: Colors.textPrimary },
  reviewCard: {
    backgroundColor: Colors.bgBase,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewAmountRow: { gap: 4 },
  reviewFrom: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
  reviewFromAmt: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  reviewTo: { fontSize: 13, color: Colors.textMuted, fontWeight: '500', textAlign: 'right' },
  reviewToAmt: { fontSize: 28, fontWeight: '800', color: Colors.success, textAlign: 'right' },
  ccy: { fontSize: 16, fontWeight: '500', color: Colors.textMuted },
  reviewDivider: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md },
  reviewLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  reviewSwapIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.bgWhite,
    borderWidth: 1, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  breakdownCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between' },
  breakdownLabel: { fontSize: 14, color: Colors.textSecondary },
  breakdownValue: { fontSize: 14, color: Colors.textSecondary },
  breakdownDivider: { height: 1, backgroundColor: Colors.border },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recipientIcon: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center', alignItems: 'center',
  },
  recipientMeta: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  recipientNumber: { ...Typography.h3, color: Colors.textPrimary },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
  },
  noticeText: { fontSize: 13, color: Colors.textMuted },
  processingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  confirmBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 18,
    alignItems: 'center',
  },
  confirmBtnProcessing: { backgroundColor: Colors.brandLight },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // ── Amount entry screen ─────────────────────────────────────
  railTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.full,
  },
  railTagText: { fontSize: 12, fontWeight: '700', color: Colors.brand },
  recipientInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  toLabel: { fontSize: 15, color: Colors.textMuted, marginRight: Spacing.md, fontWeight: '500' },
  recipientTextInput: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  qrIconBtn: { padding: 4 },
  amountDisplay: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  currencyCode: { fontSize: 18, fontWeight: '700', color: Colors.textMuted, marginTop: 20 },
  bigAmount: { fontSize: 64, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -2 },
  conversionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: Radii.full,
    gap: 6,
    marginBottom: Spacing.lg,
  },
  conversionText: { fontSize: 13, color: Colors.brandLight, fontWeight: '600' },
  presets: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  presetBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radii.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  presetBtnActive: { borderColor: Colors.brand, backgroundColor: '#EBF4FF' },
  presetText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  presetTextActive: { color: Colors.brand },
  keypad: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  keyBtn: {
    flex: 1,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 26,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  ctaContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: Colors.brand,
    borderRadius: Radii.md,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  ctaDisabled: { backgroundColor: Colors.bgSubtle },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
