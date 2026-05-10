import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, PROVIDER_BOOKINGS_DATA } from '../../constants';
import ServiceIcon from '../../components/ServiceIcon';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import DrawerMenuButton from '../../components/DrawerMenuButton';

const TABS = ['Today', 'Upcoming', 'Completed'];

export default function ProviderDashboardScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Today');
  const [isAvailable, setIsAvailable] = useState(true);

  const todayBookings = PROVIDER_BOOKINGS_DATA.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const upcomingBookings = PROVIDER_BOOKINGS_DATA.filter(
    (b) => b.status === 'pending'
  );
  const completedBookings = PROVIDER_BOOKINGS_DATA.filter(
    (b) => b.status === 'completed'
  );

  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'Today':
        return todayBookings;
      case 'Upcoming':
        return upcomingBookings;
      case 'Completed':
        return completedBookings;
      default:
        return todayBookings;
    }
  };

  const renderBookingCard = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <ServiceIcon
          icon={item.icon}
          color={item.color}
          bgColor={item.bgColor}
          size={18}
        />
        <View style={styles.cardHeaderText}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <FontAwesome5 name="calendar-alt" size={14} color={COLORS.gray} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome5 name="clock" size={14} color={COLORS.gray} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome5 name="map-marker-alt" size={14} color={COLORS.gray} />
          <Text style={styles.detailText} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        {item.notes && (
          <View style={styles.detailRow}>
            <FontAwesome5 name="sticky-note" size={14} color={COLORS.gray} />
            <Text style={styles.detailText} numberOfLines={2}>
              {item.notes}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardActions}>
        <Text style={styles.price}>Rs {item.price}</Text>
        {item.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity style={styles.navigateBtn}>
            <FontAwesome5 name="directions" size={14} color={COLORS.white} />
            <Text style={styles.navigateText}>Navigate</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DrawerMenuButton />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.greeting}>
            Hello, Dr. {user?.name?.split(' ')[0] || 'Provider'}
          </Text>
          <Text style={styles.headerSubtitle}>Manage your appointments</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name="bell" size={18} color={COLORS.black} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.availabilityCard}>
        <View style={styles.availabilityLeft}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAvailable ? COLORS.success : COLORS.gray },
            ]}
          />
          <View>
            <Text style={styles.availabilityTitle}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </Text>
            <Text style={styles.availabilitySubtitle}>
              {isAvailable
                ? 'You are visible to patients'
                : 'You are hidden from patients'}
            </Text>
          </View>
        </View>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
          trackColor={{ false: COLORS.grayMedium, true: COLORS.secondaryLight }}
          thumbColor={isAvailable ? COLORS.secondary : COLORS.gray}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayBookings.length}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{upcomingBookings.length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedBookings.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$380</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredBookings()}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5
              name="calendar-check"
              size={48}
              color={COLORS.grayMedium}
            />
            <Text style={styles.emptyText}>No bookings</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: SIZES.sm,
  },
  greeting: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  headerSubtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  availabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.sm,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  availabilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SIZES.sm,
  },
  availabilityTitle: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  availabilitySubtitle: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.sm,
    alignItems: 'center',
    width: '23%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    ...FONTS.h3,
    color: COLORS.secondary,
  },
  statLabel: {
    ...FONTS.small,
    color: COLORS.gray,
    marginTop: 2,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
    gap: SIZES.sm,
  },
  tab: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
  },
  activeTab: {
    backgroundColor: COLORS.secondary,
  },
  tabText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  patientName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  serviceName: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  cardDetails: {
    backgroundColor: COLORS.grayLight,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.sm,
    gap: SIZES.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...FONTS.body,
    color: COLORS.gray,
    marginLeft: SIZES.sm,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  price: {
    ...FONTS.h3,
    color: COLORS.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  declineBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  declineText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
  },
  acceptBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.secondary,
  },
  acceptText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.primary,
    gap: 6,
  },
  navigateText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.gray,
    marginTop: SIZES.md,
  },
});
