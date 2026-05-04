import React, { useState } from 'react';
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

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const MENU_ITEMS = [
  { icon: 'user-edit', label: 'Edit Profile' },
  { icon: 'id-card', label: 'Credentials & Licenses' },
  { icon: 'file-invoice-dollar', label: 'Earnings & Payouts' },
  { icon: 'chart-bar', label: 'Performance Stats' },
  { icon: 'comments', label: 'Patient Reviews' },
  { icon: 'cog', label: 'Settings' },
  { icon: 'question-circle', label: 'Help & Support' },
];

export default function ProviderProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [availableDays, setAvailableDays] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
  ]);

  const toggleDay = (day) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <FontAwesome5 name="user-md" size={32} color={COLORS.secondary} />
          </View>
          <View style={styles.verifiedBadge}>
            <FontAwesome5 name="check-circle" size={16} color={COLORS.success} />
          </View>
        </View>
        <Text style={styles.userName}>{user?.name || 'Dr. Provider'}</Text>
        <Text style={styles.userRole}>General Physician</Text>
        <View style={styles.statsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>4.8</Text>
            <Text style={styles.profileStatLabel}>Rating</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>156</Text>
            <Text style={styles.profileStatLabel}>Patients</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>5 yrs</Text>
            <Text style={styles.profileStatLabel}>Experience</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.daysRow}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayChip,
                availableDays.includes(day) && styles.dayChipActive,
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text
                style={[
                  styles.dayText,
                  availableDays.includes(day) && styles.dayTextActive,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.timeRow}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>Start Time</Text>
            <Text style={styles.timeValue}>9:00 AM</Text>
          </View>
          <View style={styles.timeBlock}>
            <Text style={styles.timeLabel}>End Time</Text>
            <Text style={styles.timeValue}>6:00 PM</Text>
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
              <View style={styles.menuIconContainer}>
                <FontAwesome5
                  name={item.icon}
                  size={16}
                  color={COLORS.secondary}
                />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <FontAwesome5
              name="chevron-right"
              size={14}
              color={COLORS.grayMedium}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={16} color={COLORS.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
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
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondaryLight,
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
  userName: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  userRole: {
    ...FONTS.body,
    color: COLORS.secondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
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
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.grayLight,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.sm,
  },
  daysRow: {
    flexDirection: 'row',
    gap: SIZES.xs,
    marginBottom: SIZES.md,
  },
  dayChip: {
    flex: 1,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.grayLight,
    alignItems: 'center',
  },
  dayChipActive: {
    backgroundColor: COLORS.secondary,
  },
  dayText: {
    ...FONTS.small,
    color: COLORS.gray,
    fontWeight: '600',
  },
  dayTextActive: {
    color: COLORS.white,
  },
  timeRow: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  timeBlock: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.sm,
    alignItems: 'center',
  },
  timeLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  timeValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.secondaryLight,
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
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.lg,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
    marginLeft: SIZES.sm,
  },
});
