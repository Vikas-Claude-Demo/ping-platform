import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDemo } from '../../context/DemoContext';
import VirtualCard from '../../components/VirtualCard';

export default function HomeScreen() {
  const router = useRouter();
  const { balance, transactions } = useDemo();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>L</Text>
          </View>
          <View>
            <Text style={styles.greetingLabel}>Welcome back</Text>
            <Text style={styles.greetingName}>Luipa Mondoka</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Balance Display */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)} USD</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.brandAccent }]}
            onPress={() => router.push('/load-money')}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Load Money</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.brandLight }]}
            onPress={() => router.push('/tap-to-pay')}
          >
            <MaterialCommunityIcons name="contactless-payment-circle-outline" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Tap to Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Virtual Card */}
        <VirtualCard />

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent transactions.</Text>
            </View>
          ) : (
            <View style={styles.transactionList}>
              {transactions.slice(0, 3).map((tx, i) => (
                <View key={tx.id}>
                  <View style={styles.txRow}>
                    <View style={styles.txIcon}>
                      <MaterialCommunityIcons 
                        name={tx.type === 'load' ? 'arrow-down' : 'shopping'} 
                        size={20} 
                        color={Colors.textSecondary} 
                      />
                    </View>
                    <View style={styles.txInfo}>
                      <Text style={styles.txMerchant}>{tx.merchant}</Text>
                      <Text style={styles.txMeta}>{new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>
                    <View style={styles.txRight}>
                      <Text style={[styles.txHomeAmt, { color: tx.amount > 0 ? Colors.success : Colors.textPrimary }]}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
                      </Text>
                    </View>
                  </View>
                  {i < Math.min(transactions.length, 3) - 1 && <View style={styles.txDivider} />}
                </View>
              ))}
            </View>
          )}
        </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: Colors.bgBase,
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    backgroundColor: Colors.bgBase,
    width: '100%',
    maxWidth: 600,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bgBase,
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  greetingLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  greetingName: { ...Typography.h3, color: Colors.textPrimary },
  scrollContent: { padding: Spacing.lg, gap: Spacing.lg, paddingBottom: Spacing.xxl },

  balanceContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -1,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: Radii.lg,
    gap: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  section: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  seeAllText: { fontSize: 14, color: Colors.brandLight, fontWeight: '600' },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  transactionList: { paddingHorizontal: Spacing.md },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingBottom: Spacing.md },
  txIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.bgSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  txInfo: { flex: 1 },
  txMerchant: { ...Typography.h3, color: Colors.textPrimary },
  txMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  txRight: { alignItems: 'flex-end' },
  txHomeAmt: { ...Typography.h3 },
  txDivider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.md },
});
