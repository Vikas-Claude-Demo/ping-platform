import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RailStatus = 'operational' | 'degraded' | 'outage';

type Rail = {
  id: string;
  name: string;
  country: string;
  flag: string;
  currency: string;
  status: RailStatus;
  uptime: string;
  phase: string;
  features: string[];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  dailyLimit: string;
  txLimit: string;
};

const RAILS: Rail[] = [
  {
    id: 'mpesa-zm',
    name: 'M-Pesa',
    country: 'Zambia',
    flag: '🇿🇲',
    currency: 'ZMW',
    status: 'operational',
    uptime: '99.7%',
    phase: 'Phase 1 · Live',
    features: ['QR payments', 'Phone number transfers', 'Merchant STK push'],
    icon: 'cellphone-wireless',
    dailyLimit: '$500',
    txLimit: '$200',
  },
  {
    id: 'mpesa-ke',
    name: 'M-Pesa',
    country: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    status: 'operational',
    uptime: '99.8%',
    phase: 'Phase 1 · Live',
    features: ['QR payments', 'Phone number transfers', 'Lipa na M-Pesa'],
    icon: 'cellphone-wireless',
    dailyLimit: '$500',
    txLimit: '$200',
  },
  {
    id: 'upi-in',
    name: 'UPI',
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    status: 'degraded',
    uptime: '97.2%',
    phase: 'Phase 2 · Coming Soon',
    features: ['UPI ID transfers', 'QR scan', 'VPA support'],
    icon: 'bank-transfer',
    dailyLimit: '$1,000',
    txLimit: '$500',
  },
  {
    id: 'momo-gh',
    name: 'MTN MoMo',
    country: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    status: 'outage',
    uptime: '—',
    phase: 'Phase 2 · Coming Soon',
    features: ['Phone transfers', 'Agent cash-out'],
    icon: 'cellphone-wireless',
    dailyLimit: '$300',
    txLimit: '$150',
  },
  {
    id: 'mpesa-tz',
    name: 'M-Pesa',
    country: 'Tanzania',
    flag: '🇹🇿',
    currency: 'TZS',
    status: 'operational',
    uptime: '99.5%',
    phase: 'Phase 2 · Coming Soon',
    features: ['Phone transfers', 'Lipa Bila Namba QR'],
    icon: 'cellphone-wireless',
    dailyLimit: '$400',
    txLimit: '$200',
  },
];

const STATUS_CONFIG: Record<RailStatus, { label: string; color: string; bg: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }> = {
  operational: { label: 'Operational', color: Colors.success, bg: Colors.successBg, icon: 'check-circle' },
  degraded:    { label: 'Degraded',    color: Colors.warning, bg: Colors.warningBg, icon: 'alert-circle' },
  outage:      { label: 'Outage',      color: Colors.error,   bg: Colors.errorBg,   icon: 'close-circle' },
};

export default function NetworkScreen() {
  const [expanded, setExpanded] = useState<string | null>('mpesa-zm');

  const operational = RAILS.filter(r => r.status === 'operational').length;
  const degraded    = RAILS.filter(r => r.status === 'degraded').length;
  const outage      = RAILS.filter(r => r.status === 'outage').length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* System status strip */}
        <View style={styles.statusStrip}>
          <View style={styles.statusStripItem}>
            <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.statusStripLabel}>{operational} Operational</Text>
          </View>
          <View style={styles.statusStripDivider} />
          <View style={styles.statusStripItem}>
            <View style={[styles.statusDot, { backgroundColor: Colors.warning }]} />
            <Text style={styles.statusStripLabel}>{degraded} Degraded</Text>
          </View>
          <View style={styles.statusStripDivider} />
          <View style={styles.statusStripItem}>
            <View style={[styles.statusDot, { backgroundColor: Colors.error }]} />
            <Text style={styles.statusStripLabel}>{outage} Outage</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Rails</Text>

        {RAILS.map(rail => {
          const sc = STATUS_CONFIG[rail.status];
          const isOpen = expanded === rail.id;
          const isComingSoon = rail.phase.includes('Coming Soon');

          return (
            <TouchableOpacity
              key={rail.id}
              id={`network-rail-${rail.id}`}
              style={[styles.railCard, isComingSoon && styles.railCardDimmed]}
              onPress={() => setExpanded(isOpen ? null : rail.id)}
              activeOpacity={0.75}
            >
              {/* Header row */}
              <View style={styles.railHeader}>
                <View style={styles.railIconWrap}>
                  <Text style={styles.railFlag}>{rail.flag}</Text>
                </View>
                <View style={styles.railMeta}>
                  <View style={styles.railTitleRow}>
                    <Text style={styles.railName}>{rail.name} · {rail.country}</Text>
                    <View style={[styles.phaseBadge, isComingSoon && styles.phaseBadgeSoon]}>
                      <Text style={[styles.phaseBadgeText, isComingSoon && styles.phaseBadgeSoonText]}>
                        {rail.phase}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.railCurrency}>{rail.currency}</Text>
                </View>
                <View style={styles.railRight}>
                  <View style={[styles.statusPill, { backgroundColor: sc.bg }]}>
                    <MaterialCommunityIcons name={sc.icon} size={12} color={sc.color} />
                    <Text style={[styles.statusPillText, { color: sc.color }]}>{sc.label}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.textMuted}
                    style={{ marginTop: 6 }}
                  />
                </View>
              </View>

              {/* Expanded detail */}
              {isOpen && (
                <View style={styles.railDetail}>
                  <View style={styles.detailDivider} />

                  {/* Stats row */}
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{rail.uptime}</Text>
                      <Text style={styles.statLabel}>30d uptime</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{rail.txLimit}</Text>
                      <Text style={styles.statLabel}>Per transfer</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{rail.dailyLimit}</Text>
                      <Text style={styles.statLabel}>Daily limit</Text>
                    </View>
                  </View>

                  {/* Features */}
                  <Text style={styles.featuresTitle}>Supported features</Text>
                  <View style={styles.featuresList}>
                    {rail.features.map(f => (
                      <View key={f} style={styles.featureItem}>
                        <MaterialCommunityIcons name="check" size={14} color={Colors.success} />
                        <Text style={styles.featureText}>{f}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Footer note */}
        <View style={styles.footerNote}>
          <MaterialCommunityIcons name="information-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.footerNoteText}>
            Status reflects real-time API health from each payment rail provider. 
            Limits apply per Ping account tier and destination rail policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgBase },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl, gap: Spacing.md },

  statusStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  statusStripItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  statusStripDivider: { width: 1, backgroundColor: Colors.border },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusStripLabel: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },

  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },

  railCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  railCardDimmed: { opacity: 0.75 },

  railHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  railIconWrap: {
    width: 50, height: 50,
    borderRadius: 14,
    backgroundColor: Colors.bgSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  railFlag: { fontSize: 26 },
  railMeta: { flex: 1 },
  railTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },
  railName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  phaseBadge: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: Radii.full,
  },
  phaseBadgeSoon: { backgroundColor: Colors.bgSubtle },
  phaseBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.success },
  phaseBadgeSoonText: { color: Colors.textMuted },
  railCurrency: { fontSize: 13, color: Colors.textMuted, marginTop: 2, fontWeight: '500' },

  railRight: { alignItems: 'flex-end' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: Radii.full,
  },
  statusPillText: { fontSize: 11, fontWeight: '700' },

  railDetail: { marginTop: Spacing.md },
  detailDivider: { height: 1, backgroundColor: Colors.border, marginBottom: Spacing.md },

  statsRow: { flexDirection: 'row', backgroundColor: Colors.bgSubtle, borderRadius: Radii.md, padding: Spacing.md, marginBottom: Spacing.md },
  statItem: { flex: 1, alignItems: 'center', gap: 2 },
  statDivider: { width: 1, backgroundColor: Colors.border },
  statValue: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },

  featuresTitle: { ...Typography.label, color: Colors.textMuted, textTransform: 'uppercase', marginBottom: Spacing.sm },
  featuresList: { gap: Spacing.xs },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  featureText: { fontSize: 14, color: Colors.textSecondary },

  footerNote: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radii.md,
  },
  footerNoteText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
});
