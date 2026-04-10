import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radii, Typography } from '../constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NotifType = 'success' | 'pending' | 'info' | 'alert';

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment confirmed',
    body: 'ZK 450.00 sent to Silverest Café successfully via M-Pesa.',
    time: 'Today, 10:14 AM',
    read: false,
    icon: 'check-circle-outline',
  },
  {
    id: '2',
    type: 'success',
    title: 'Payment confirmed',
    body: 'ZK 1,200.00 sent to Shoprite Lusaka successfully via M-Pesa.',
    time: 'Yesterday, 4:52 PM',
    read: false,
    icon: 'check-circle-outline',
  },
  {
    id: '3',
    type: 'pending',
    title: 'Payment processing',
    body: 'ZK 200.00 to Taxi · Lukasa is still being processed. This may take a minute.',
    time: 'Yesterday, 1:08 PM',
    read: false,
    icon: 'clock-outline',
  },
  {
    id: '4',
    type: 'info',
    title: 'Rate alert: USD → ZMW',
    body: 'The ZMW rate has improved by 0.3% today. A good time to transfer.',
    time: 'Yesterday, 9:00 AM',
    read: true,
    icon: 'trending-up',
  },
  {
    id: '5',
    type: 'info',
    title: 'KYC verified',
    body: 'Your identity has been verified. You now have full access to all Ping features.',
    time: 'Apr 8, 11:30 AM',
    read: true,
    icon: 'shield-check-outline',
  },
  {
    id: '6',
    type: 'alert',
    title: 'M-Pesa Kenya degraded',
    body: 'M-Pesa Kenya is experiencing intermittent delays. Zambia corridor is unaffected.',
    time: 'Apr 7, 3:15 PM',
    read: true,
    icon: 'alert-circle-outline',
  },
];

const TYPE_STYLE: Record<NotifType, { iconColor: string; iconBg: string }> = {
  success: { iconColor: Colors.success, iconBg: Colors.successBg },
  pending: { iconColor: Colors.warning, iconBg: Colors.warningBg },
  info:    { iconColor: Colors.brandLight, iconBg: '#EBF4FF' },
  alert:   { iconColor: Colors.error, iconBg: Colors.errorBg },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity id="notif-back-btn" onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSubtitle}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 ? (
          <TouchableOpacity id="notif-mark-all-btn" onPress={markAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="bell-sleep-outline" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>All caught up</Text>
            <Text style={styles.emptySubtitle}>No new notifications right now.</Text>
          </View>
        ) : (
          <>
            {/* Unread */}
            {notifications.filter(n => !n.read).length > 0 && (
              <>
                <Text style={styles.groupLabel}>NEW</Text>
                {notifications.filter(n => !n.read).map(notif => (
                  <NotifCard key={notif.id} notif={notif} onPress={() => markRead(notif.id)} />
                ))}
              </>
            )}
            {/* Read */}
            {notifications.filter(n => n.read).length > 0 && (
              <>
                <Text style={[styles.groupLabel, { marginTop: Spacing.lg }]}>EARLIER</Text>
                {notifications.filter(n => n.read).map(notif => (
                  <NotifCard key={notif.id} notif={notif} onPress={() => {}} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NotifCard({ notif, onPress }: { notif: Notification; onPress: () => void }) {
  const ts = TYPE_STYLE[notif.type];
  return (
    <TouchableOpacity
      id={`notif-item-${notif.id}`}
      style={[styles.notifCard, !notif.read && styles.notifCardUnread]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {!notif.read && <View style={styles.unreadDot} />}
      <View style={[styles.notifIcon, { backgroundColor: ts.iconBg }]}>
        <MaterialCommunityIcons name={notif.icon} size={22} color={ts.iconColor} />
      </View>
      <View style={styles.notifBody}>
        <Text style={styles.notifTitle}>{notif.title}</Text>
        <Text style={styles.notifText}>{notif.body}</Text>
        <Text style={styles.notifTime}>{notif.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgBase },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h2, color: Colors.textPrimary },
  headerSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
  markAllText: { fontSize: 14, fontWeight: '600', color: Colors.brandLight },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  groupLabel: {
    fontSize: 11, fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgWhite,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  notifCardUnread: {
    borderColor: Colors.brandLight,
    backgroundColor: '#FAFCFF',
  },
  unreadDot: {
    position: 'absolute',
    top: 14, right: 14,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brandLight,
  },
  notifIcon: {
    width: 44, height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  notifBody: { flex: 1, paddingRight: Spacing.lg },
  notifTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  notifText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  notifTime: { fontSize: 11, color: Colors.textMuted, marginTop: 4, fontWeight: '500' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: Spacing.md },
  emptyTitle: { ...Typography.h2, color: Colors.textPrimary },
  emptySubtitle: { ...Typography.body, color: Colors.textMuted },
});
