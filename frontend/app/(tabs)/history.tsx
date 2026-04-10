import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ALL_TRANSACTIONS = [
  {
    id: '1', merchant: 'Silverest Café', destAmount: 'ZK 450.00', homeAmount: '-$19.50',
    date: 'Today, 10:14 AM', rail: 'M-Pesa', status: 'success', icon: 'food',
  },
  {
    id: '2', merchant: 'Shoprite Lusaka', destAmount: 'ZK 1,200.00', homeAmount: '-$52.40',
    date: 'Yesterday, 4:52 PM', rail: 'M-Pesa', status: 'success', icon: 'cart-outline',
  },
  {
    id: '3', merchant: 'Taxi · Lukasa', destAmount: 'ZK 200.00', homeAmount: '-$8.73',
    date: 'Yesterday, 1:08 PM', rail: 'M-Pesa', status: 'pending', icon: 'car-outline',
  },
  {
    id: '4', merchant: 'KFC Zambia', destAmount: 'ZK 380.00', homeAmount: '-$16.46',
    date: 'Apr 8, 7:22 PM', rail: 'M-Pesa', status: 'success', icon: 'food',
  },
  {
    id: '5', merchant: 'Hotel Intercontinental', destAmount: 'ZK 5,200.00', homeAmount: '-$225.31',
    date: 'Apr 7, 3:00 PM', rail: 'M-Pesa', status: 'failed', icon: 'bed-outline',
  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  success: { bg: Colors.successBg, text: Colors.success, label: 'Sent' },
  pending: { bg: Colors.warningBg, text: Colors.warning, label: 'Pending' },
  failed: { bg: Colors.errorBg, text: Colors.error, label: 'Failed' },
};

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Activity</Text>
        <TouchableOpacity id="history-filter-btn" style={styles.filterBtn}>
          <MaterialCommunityIcons name="tune-variant" size={20} color={Colors.textPrimary} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Summary strip */}
      <View style={styles.summaryStrip}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>$322.40</Text>
          <Text style={styles.summaryLabel}>Total sent</Text>
        </View>
        <View style={styles.stripDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>5</Text>
          <Text style={styles.summaryLabel}>Transfers</Text>
        </View>
        <View style={styles.stripDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.warning }]}>1</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.dateGroup}>This Week</Text>
        <View style={styles.transactionCard}>
          {ALL_TRANSACTIONS.map((tx, i) => {
            const s = STATUS_STYLES[tx.status];
            return (
              <View key={tx.id}>
                <TouchableOpacity id={`history-tx-${tx.id}`} style={styles.txRow} activeOpacity={0.7}>
                  <View style={styles.txIcon}>
                    <MaterialCommunityIcons name={tx.icon as any} size={18} color={Colors.textSecondary} />
                  </View>
                  <View style={styles.txInfo}>
                    <Text style={styles.txMerchant}>{tx.merchant}</Text>
                    <Text style={styles.txMeta}>{tx.rail} · {tx.date}</Text>
                  </View>
                  <View style={styles.txAmounts}>
                    <Text style={styles.txHomeAmt}>{tx.homeAmount}</Text>
                    <Text style={styles.txDestAmt}>{tx.destAmount}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
                  </View>
                </TouchableOpacity>
                {i < ALL_TRANSACTIONS.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgBase },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appBarTitle: { ...Typography.h2, color: Colors.textPrimary },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  filterText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  summaryStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.bgWhite,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  summaryLabel: { fontSize: 12, color: Colors.textMuted, marginTop: 2, fontWeight: '500' },
  stripDivider: { width: 1, backgroundColor: Colors.border },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  dateGroup: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', marginBottom: Spacing.sm },
  transactionCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md },
  txIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.bgSubtle,
    justifyContent: 'center', alignItems: 'center',
    marginRight: Spacing.md,
  },
  txInfo: { flex: 1 },
  txMerchant: { ...Typography.h3, color: Colors.textPrimary },
  txMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  txAmounts: { alignItems: 'flex-end', marginRight: Spacing.sm },
  txHomeAmt: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  txDestAmt: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.border },
});
