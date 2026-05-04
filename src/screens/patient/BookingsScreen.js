import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, BOOKINGS_DATA } from '../../constants';
import ServiceIcon from '../../components/ServiceIcon';
import StatusBadge from '../../components/StatusBadge';

const TABS = ['All', 'Pending', 'Confirmed', 'Completed'];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredBookings =
    activeTab === 'All'
      ? BOOKINGS_DATA
      : BOOKINGS_DATA.filter(
          (b) => b.status.toLowerCase() === activeTab.toLowerCase()
        );

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
          <Text style={styles.serviceName}>{item.serviceName}</Text>
          <Text style={styles.providerName}>{item.providerName}</Text>
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
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.price}>${item.price}</Text>
        {item.status === 'pending' && (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
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
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="calendar-times" size={48} color={COLORS.grayMedium} />
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              Book a service from the home screen
            </Text>
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
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: SIZES.md,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    gap: SIZES.sm,
  },
  tab: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
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
  serviceName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  providerName: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  price: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  cancelButton: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  cancelText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.black,
    marginTop: SIZES.md,
  },
  emptySubtext: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: SIZES.xs,
  },
});
