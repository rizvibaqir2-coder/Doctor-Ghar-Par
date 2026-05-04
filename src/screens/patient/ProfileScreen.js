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

const MENU_ITEMS = [
  { icon: 'user-edit', label: 'Edit Profile', screen: 'EditProfile' },
  { icon: 'map-marker-alt', label: 'My Addresses', screen: null },
  { icon: 'credit-card', label: 'Payment Methods', screen: null },
  { icon: 'file-medical', label: 'Medical Records', screen: null },
  { icon: 'bell', label: 'Notifications', screen: null },
  { icon: 'shield-alt', label: 'Privacy & Security', screen: null },
  { icon: 'question-circle', label: 'Help & Support', screen: null },
  { icon: 'info-circle', label: 'About', screen: null },
];

export default function ProfileScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <FontAwesome5 name="user" size={32} color={COLORS.primary} />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <FontAwesome5 name="camera" size={12} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.name || 'Patient'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'patient@email.com'}</Text>
        <Text style={styles.userPhone}>{user?.phone || '+92 300 0000000'}</Text>
      </View>

      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else {
                Alert.alert('Coming Soon', `${item.label} feature is coming soon!`);
              }
            }}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <FontAwesome5 name={item.icon} size={16} color={COLORS.primary} />
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

      <Text style={styles.version}>Doctor Ghar Par v1.0.0</Text>
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
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  userEmail: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
  },
  userPhone: {
    ...FONTS.body,
    color: COLORS.gray,
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
    backgroundColor: COLORS.primaryLight,
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
  version: {
    ...FONTS.caption,
    color: COLORS.grayMedium,
    textAlign: 'center',
    marginTop: SIZES.md,
  },
});
