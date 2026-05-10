import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const ADMIN_COLOR = '#DC2626';
const ADMIN_BG = '#FEE2E2';

const MENU_ITEMS = [
  { icon: 'users-cog', label: 'Manage Providers' },
  { icon: 'flask', label: 'Manage Labs' },
  { icon: 'store', label: 'Manage Stores' },
  { icon: 'user-md', label: 'Manage Specialists' },
  { icon: 'percentage', label: 'Fee Configuration' },
  { icon: 'file-invoice-dollar', label: 'Payout Management' },
  { icon: 'chart-bar', label: 'Analytics & Reports' },
  { icon: 'shield-alt', label: 'Verification Queue' },
  { icon: 'cog', label: 'Platform Settings' },
  { icon: 'question-circle', label: 'Help & Support' },
];

export default function AdminProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Settings</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: ADMIN_BG }]}>
            <FontAwesome5 name="user-shield" size={32} color={ADMIN_COLOR} />
          </View>
        </View>
        <Text style={styles.adminName}>{user?.name || 'Admin'}</Text>
        <Text style={styles.adminRole}>Platform Owner</Text>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: ADMIN_BG }]}>
            <FontAwesome5 name="crown" size={10} color={ADMIN_COLOR} />
            <Text style={[styles.badgeText, { color: ADMIN_COLOR }]}>Super Admin</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() =>
              Alert.alert('Coming Soon', `${item.label} feature is coming soon!`)
            }
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconContainer, { backgroundColor: ADMIN_BG }]}>
                <FontAwesome5 name={item.icon} size={16} color={ADMIN_COLOR} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={14} color={COLORS.grayMedium} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={16} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: SIZES.md,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: SIZES.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminName: {
    ...FONTS.h2,
    color: COLORS.black,
    marginBottom: 2,
  },
  adminRole: {
    ...FONTS.body,
    color: COLORS.gray,
    marginBottom: SIZES.sm,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    ...FONTS.caption,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: SIZES.lg,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    ...FONTS.body,
    color: COLORS.black,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.sm,
    marginHorizontal: SIZES.lg,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
  },
});
