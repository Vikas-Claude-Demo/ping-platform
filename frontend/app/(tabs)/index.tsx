import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const TRANSACTIONS = [
  {
    id: '1',
    merchant: 'Silverest Café',
    country: 'Zambia',
    destAmount: 'ZK 450.00',
    homeAmount: '-$19.50',
    date: 'Today, 10:14 AM',
    rail: 'M-Pesa',
    status: 'success',
    icon: 'food',
  },
  {
    id: '2',
    merchant: 'Shoprite Lusaka',
    country: 'Zambia',
    destAmount: 'ZK 1,200.00',
    homeAmount: '-$52.40',
    date: 'Yesterday, 4:52 PM',
    rail: 'M-Pesa',
    status: 'success',
    icon: 'cart-outline',
  },
  {
    id: '3',
    merchant: 'Taxi • Lukasa',
    country: 'Zambia',
    destAmount: 'ZK 200.00',
    homeAmount: '-$8.73',
    date: 'Yesterday, 1:08 PM',
    rail: 'M-Pesa',
    status: 'pending',
    icon: 'car-outline',
  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  success: { bg: Colors.successBg, text: Colors.success, label: 'Sent' },
  pending: { bg: Colors.warningBg, text: Colors.warning, label: 'Pending' },
  failed: { bg: Colors.errorBg, text: Colors.error, label: 'Failed' },
};

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── App Header ── */}
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
        <TouchableOpacity
          id="home-notifications-btn"
          style={styles.iconBtn}
          onPress={() => router.push('/notifications')}
        >
          <MaterialCommunityIcons name="bell-outline" size={22} color={Colors.textPrimary} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Balance / Summary Card ── */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Sent (this trip)</Text>
          <Text style={styles.summaryAmount}>$80.63</Text>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryMeta}>
            <View style={styles.summaryMetaItem}>
              <MaterialCommunityIcons name="map-marker-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.summaryMetaText}>Lusaka, Zambia</Text>
            </View>
            <View style={styles.summaryMetaItem}>
              <MaterialCommunityIcons name="swap-horizontal" size={14} color={Colors.textMuted} />
              <Text style={styles.summaryMetaText}>M-Pesa active</Text>
            </View>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            id="home-action-send"
            style={styles.actionTile}
            onPress={() => router.push('/(tabs)/pay')}
            activeOpacity={0.75}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#EBF4FF' }]}>
              <MaterialCommunityIcons name="send-outline" size={22} color={Colors.brand} />
            </View>
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            id="home-action-scan"
            style={styles.actionTile}
            activeOpacity={0.75}
            onPress={() => router.push('/qr-scanner')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E3FCEF' }]}>
              <MaterialCommunityIcons name="qrcode-scan" size={22} color={Colors.success} />
            </View>
            <Text style={styles.actionLabel}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            id="home-action-rates"
            style={styles.actionTile}
            activeOpacity={0.75}
            onPress={() => router.push('/rates')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF4E5' }]}>
              <MaterialCommunityIcons name="trending-up" size={22} color={Colors.warning} />
            </View>
            <Text style={styles.actionLabel}>Rates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            id="home-action-rails"
            style={styles.actionTile}
            activeOpacity={0.75}
            onPress={() => router.push('/network')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#F3F0FF' }]}>
              <MaterialCommunityIcons name="earth" size={22} color="#7C3AED" />
            </View>
            <Text style={styles.actionLabel}>Network</Text>
          </TouchableOpacity>
        </View>

        {/* ── Payment Rail Banner ── */}
        <TouchableOpacity
          id="home-rail-banner"
          style={styles.railBanner}
          activeOpacity={0.8}
          onPress={() => router.push('/network')}
        >
          <View style={styles.railBannerLeft}>
            <View style={styles.railIconBadge}>
              <MaterialCommunityIcons name="cellphone-wireless" size={18} color={Colors.brand} />
            </View>
            <View>
              <Text style={styles.railTitle}>M-Pesa · Zambia (ZMW)</Text>
              <Text style={styles.railSubtitle}>USD → ZMW · Rate: 1 USD = 23.08 ZK</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* ── Recent Activity ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity id="home-see-all-btn" onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            {TRANSACTIONS.map((tx, i) => {
              const s = STATUS_STYLES[tx.status];
              return (
                <View key={tx.id}>
                  <TouchableOpacity id={`home-tx-${tx.id}`} style={styles.txRow} activeOpacity={0.7}>
                    <View style={styles.txIcon}>
                      <MaterialCommunityIcons name={tx.icon as any} size={20} color={Colors.textSecondary} />
                    </View>
                    <View style={styles.txInfo}>
                      <Text style={styles.txMerchant}>{tx.merchant}</Text>
                      <Text style={styles.txMeta}>{tx.rail} · {tx.date}</Text>
                    </View>
                    <View style={styles.txRight}>
                      <Text style={styles.txHomeAmt}>{tx.homeAmount}</Text>
                      <Text style={styles.txDestAmt}>{tx.destAmount}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                      <Text style={[styles.statusText, { color: s.text }]}>{s.label}</Text>
                    </View>
                  </TouchableOpacity>
                  {i < TRANSACTIONS.length - 1 && <View style={styles.txDivider} />}
                </View>
              );
            })}
          </View>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bgWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  iconBtn: { position: 'relative', padding: 6 },
  notifDot: {
    position: 'absolute',
    top: 6, right: 6,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    borderWidth: 1.5,
    borderColor: Colors.bgWhite,
  },
  scrollContent: { padding: Spacing.lg, gap: Spacing.lg, paddingBottom: Spacing.xxl },

  // Summary card
  summaryCard: {
    backgroundColor: Colors.brand,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
  },
  summaryLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: 4 },
  summaryAmount: { color: '#fff', fontSize: 38, fontWeight: '800', letterSpacing: -1 },
  summaryDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: Spacing.md },
  summaryMeta: { flexDirection: 'row', gap: Spacing.xl },
  summaryMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  summaryMetaText: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: '500' },

  // Quick actions
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionTile: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },

  // Rail banner
  railBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  railBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  railIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  railTitle: { ...Typography.h3, color: Colors.textPrimary },
  railSubtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },

  // Section
  section: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    paddingBottom: 0,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  seeAllText: { fontSize: 14, color: Colors.brandLight, fontWeight: '600' },

  // Transactions
  transactionList: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
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
  txRight: { alignItems: 'flex-end', marginRight: Spacing.sm },
  txHomeAmt: { ...Typography.h3, color: Colors.textPrimary },
  txDestAmt: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.sm,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  txDivider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.md },
});
