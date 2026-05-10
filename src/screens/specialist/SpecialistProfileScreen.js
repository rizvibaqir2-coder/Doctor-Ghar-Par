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

const SPEC_COLOR = '#7C3AED';
const SPEC_BG = '#EDE9FE';

const MENU_ITEMS = [
  { icon: 'edit', label: 'Edit Profile' },
  { icon: 'id-card', label: 'PMC Credentials' },
  { icon: 'calendar-check', label: 'Availability Schedule' },
  { icon: 'file-invoice-dollar', label: 'Earnings & Payouts' },
  { icon: 'chart-line', label: 'Performance Stats' },
  { icon: 'star', label: 'Patient Reviews' },
  { icon: 'notes-medical', label: 'Prescription Templates' },
  { icon: 'cog', label: 'Settings' },
  { icon: 'question-circle', label: 'Help & Support' },
];

export default function SpecialistProfileScreen() {
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
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: SPEC_BG }]}>
            <FontAwesome5 name="user-md" size={32} color={SPEC_COLOR} />
          </View>
          <View style={styles.verifiedBadge}>
            <FontAwesome5 name="check-circle" size={16} color={COLORS.success} />
          </View>
        </View>
        <Text style={styles.doctorName}>Dr. {user?.name || 'Ahmed Khan'}</Text>
        <Text style={styles.doctorType}>Specialized Doctor</Text>
        <View style={styles.qualBadge}>
          <Text style={styles.qualText}>MBBS, FCPS</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>4.9</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>187</Text>
            <Text style={styles.profileStatLabel}>Visits</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>8+</Text>
            <Text style={styles.profileStatLabel}>Years Exp</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <FontAwesome5 name="map-marker-alt" size={14} color={SPEC_COLOR} />
          <Text style={styles.infoText}>Karachi, Sindh</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="clock" size={14} color={SPEC_COLOR} />
          <Text style={styles.infoText}>Available: 6:00 PM - 10:00 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="home" size={14} color={SPEC_COLOR} />
          <Text style={styles.infoText}>Home Visit Service Active</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesome5 name="id-card" size={14} color={SPEC_COLOR} />
          <Text style={styles.infoText}>PMC Verified</Text>
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
              <View style={[styles.menuIconContainer, { backgroundColor: SPEC_BG }]}>
                <FontAwesome5 name={item.icon} size={16} color={SPEC_COLOR} />
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
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 2,
  },
  doctorName: {
    ...FONTS.h2,
    color: COLORS.black,
    marginBottom: 2,
  },
  doctorType: {
    ...FONTS.body,
    color: COLORS.gray,
    marginBottom: SIZES.xs,
  },
  qualBadge: {
    backgroundColor: SPEC_BG,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: SIZES.md,
  },
  qualText: {
    ...FONTS.caption,
    color: SPEC_COLOR,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileStat: {
    flex: 1,
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
    height: 30,
    backgroundColor: COLORS.grayLight,
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
