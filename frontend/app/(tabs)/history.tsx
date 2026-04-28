import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDemo } from '../../context/DemoContext';

export default function HistoryScreen() {
  const { transactions } = useDemo();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Activity</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons name="tune-variant" size={20} color={Colors.textPrimary} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.dateGroup}>Recent Activity</Text>
        
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No recent activity</Text>
          </View>
        ) : (
          <View style={styles.transactionCard}>
            {transactions.map((tx, i) => {
              return (
                <View key={tx.id}>
                  <TouchableOpacity style={styles.txRow} activeOpacity={0.7}>
                    <View style={styles.txIcon}>
                      <MaterialCommunityIcons 
                        name={tx.type === 'load' ? 'arrow-down' : 'shopping'} 
                        size={18} 
                        color={Colors.textSecondary} 
                      />
                    </View>
                    <View style={styles.txInfo}>
                      <Text style={styles.txMerchant}>{tx.merchant}</Text>
                      <Text style={styles.txMeta}>{new Date(tx.date).toLocaleString()}</Text>
                    </View>
                    <View style={styles.txAmounts}>
                      <Text style={[styles.txHomeAmt, { color: tx.amount > 0 ? Colors.success : Colors.textPrimary }]}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {i < transactions.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        )}
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
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  appBarTitle: { ...Typography.h2, color: Colors.textPrimary },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  filterText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
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
  txAmounts: { alignItems: 'flex-end' },
  txHomeAmt: { fontSize: 15, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.border },
  emptyState: { padding: Spacing.xl, alignItems: 'center' },
  emptyText: { color: Colors.textMuted, fontSize: 14 }
});
