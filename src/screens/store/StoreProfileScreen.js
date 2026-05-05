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

const STORE_COLOR = '#10B981';
const STORE_BG = '#D1FAE5';

const MENU_ITEMS = [
  { icon: 'edit', label: 'Edit Store Details' },
  { icon: 'clipboard-list', label: 'Medicine Inventory' },
  { icon: 'file-medical', label: 'Drug License' },
  { icon: 'file-invoice-dollar', label: 'Earnings & Payouts' },
  { icon: 'chart-bar', label: 'Sales Stats' },
  { icon: 'users', label: 'Staff Management' },
  { icon: 'comments', label: 'Customer Reviews' },
  { icon: 'cog', label: 'Settings' },
  { icon: 'question-circle', label: 'Help & Support' },
];

export default function StoreProfileScreen() {
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
        <Text style={styles.headerTitle}>Store Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: STORE_BG }]}>
            <FontAwesome5 name="store" size={32} color={STORE_COLOR} />
          </View>
          <View style={styles.verifiedBadge}>
            <FontAwesome5 name="check-circle" size={16} color={COLORS.success} />
          </View>
        </View>
        <Text style={styles.storeName}>{user?.name || 'My Medical Store'}</Text>
        <Text style={styles.storeType}>Licensed Pharmacy</Text>
        <View style={styles.statsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>4.8</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>458</Text>
            <Text style={styles.profileStatLabel}>Orders</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>500+</Text>
            <Text style={styles.profileStatLabel}>Medicines</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <FontAwesome5 name="map-marker-alt" size={14} color={STORE_COLOR} />
          <Text style={styles.infoText}>456 Pharmacy Street, Karachi</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="clock" size={14} color={STORE_COLOR} />
          <Text style={styles.infoText}>8:00 AM - 11:00 PM (Daily)</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="motorcycle" size={14} color={STORE_COLOR} />
          <Text style={styles.infoText}>Home Delivery Available (Free above Rs 1000)</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="prescription" size={14} color={STORE_COLOR} />
          <Text style={styles.infoText}>Prescription Medicines Available</Text>
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
              <View style={[styles.menuIconContainer, { backgroundColor: STORE_BG }]}>
                <FontAwesome5 name={item.icon} size={16} color={STORE_COLOR} />
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
    position: 'relative',
    marginBottom: SIZES.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 2,
  },
  storeName: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  storeType: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: SIZES.md,
    gap: SIZES.lg,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  profileStatLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  divider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  infoCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    gap: SIZES.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  infoText: {
    ...FONTS.body,
    color: COLORS.black,
    flex: 1,
  },
  menuSection: {
    marginHorizontal: SIZES.lg,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SIZES.lg,
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
    paddingHorizontal: SIZES.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  menuLabel: {
    ...FONTS.body,
    color: COLORS.black,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radius,
    backgroundColor: '#FEE2E2',
    gap: SIZES.sm,
  },
  logoutText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
  },
});
