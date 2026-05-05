import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';
import { NEARBY_PROVIDERS } from '../../constants/providers';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All', icon: 'th-large' },
  { id: 'Doctor', label: 'Doctors', icon: 'stethoscope' },
  { id: 'Nurse', label: 'Nurses', icon: 'user-nurse' },
  { id: 'Lab Technician', label: 'Lab', icon: 'flask' },
  { id: 'X-Ray Technician', label: 'X-Ray', icon: 'x-ray' },
  { id: 'Physiotherapist', label: 'Physio', icon: 'running' },
  { id: 'Wound', label: 'Dressing', icon: 'band-aid' },
  { id: 'Palliative', label: 'Palliative', icon: 'hands-helping' },
  { id: 'Ortho Technician', label: 'POP/Cast', icon: 'bone' },
];

const SORT_OPTIONS = ['Nearest', 'Top Rated', 'Lowest Price'];

export default function NearbyProvidersScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('Nearest');

  const filteredProviders =
    activeFilter === 'all'
      ? NEARBY_PROVIDERS
      : NEARBY_PROVIDERS.filter((p) =>
          p.role === activeFilter ||
          p.specialization.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (activeSort) {
      case 'Nearest':
        return a.distanceValue - b.distanceValue;
      case 'Top Rated':
        return b.rating - a.rating;
      case 'Lowest Price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const renderMapPlaceholder = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}>
        <FontAwesome5 name="map-marked-alt" size={40} color={COLORS.primary} />
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubtext}>
          Showing {sortedProviders.length} providers near you
        </Text>

        <View style={styles.mapPins}>
          {sortedProviders.slice(0, 5).map((provider, index) => (
            <View
              key={provider.id}
              style={[
                styles.mapPin,
                {
                  backgroundColor: provider.color,
                  left: 30 + index * 55,
                  top: 20 + (index % 3) * 25,
                },
              ]}
            >
              <FontAwesome5 name={provider.icon} size={10} color={COLORS.white} />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.locationBar}>
        <FontAwesome5 name="crosshairs" size={16} color={COLORS.primary} />
        <Text style={styles.locationText}>Current Location</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProviderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.providerCard}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ProviderDetail', { provider: item })
      }
    >
      <View style={styles.cardTop}>
        <View style={[styles.providerAvatar, { backgroundColor: item.bgColor }]}>
          <FontAwesome5 name={item.icon} size={22} color={item.color} />
        </View>
        <View style={styles.providerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.providerName} numberOfLines={1}>
              {item.name}
            </Text>
            {item.isAvailable && (
              <View style={styles.onlineDot} />
            )}
          </View>
          <Text style={styles.providerSpec}>{item.specialization}</Text>
          <View style={styles.ratingRow}>
            <FontAwesome5 name="star" solid size={12} color="#F59E0B" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.infoChips}>
          <View style={styles.chip}>
            <FontAwesome5 name="map-marker-alt" size={10} color={COLORS.primary} />
            <Text style={styles.chipText}>{item.distance}</Text>
          </View>
          <View style={styles.chip}>
            <FontAwesome5 name="clock" size={10} color={COLORS.secondary} />
            <Text style={styles.chipText}>{item.estimatedTime}</Text>
          </View>
          <View style={styles.chip}>
            <FontAwesome5 name="briefcase-medical" size={10} color={COLORS.gray} />
            <Text style={styles.chipText}>{item.experience}</Text>
          </View>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>From</Text>
          <Text style={styles.priceValue}>${item.price}</Text>
        </View>
      </View>

      {!item.isAvailable && (
        <View style={styles.unavailableOverlay}>
          <Text style={styles.unavailableText}>Currently Unavailable</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Providers</Text>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome5 name="sliders-h" size={18} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {renderMapPlaceholder()}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              activeFilter === filter.id && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <FontAwesome5
              name={filter.icon}
              size={12}
              color={
                activeFilter === filter.id ? COLORS.white : COLORS.gray
              }
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>
          {sortedProviders.length} providers found
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SORT_OPTIONS.map((sort) => (
            <TouchableOpacity
              key={sort}
              style={[
                styles.sortChip,
                activeSort === sort && styles.sortChipActive,
              ]}
              onPress={() => setActiveSort(sort)}
            >
              <Text
                style={[
                  styles.sortText,
                  activeSort === sort && styles.sortTextActive,
                ]}
              >
                {sort}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={sortedProviders}
        renderItem={renderProviderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5
              name="search-location"
              size={48}
              color={COLORS.grayMedium}
            />
            <Text style={styles.emptyText}>No providers found nearby</Text>
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
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  mapContainer: {
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapText: {
    ...FONTS.h4,
    color: COLORS.primary,
    marginTop: SIZES.xs,
  },
  mapSubtext: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  mapPins: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPin: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
  },
  locationText: {
    ...FONTS.body,
    color: COLORS.black,
    flex: 1,
    marginLeft: SIZES.sm,
  },
  changeText: {
    ...FONTS.bodyBold,
    color: COLORS.primary,
  },
  filterRow: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
    gap: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
    gap: SIZES.sm,
  },
  resultCount: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginRight: SIZES.sm,
  },
  sortChip: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    marginRight: SIZES.xs,
  },
  sortChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  sortText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  sortTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 30,
  },
  providerCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: SIZES.sm,
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  providerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerName: {
    ...FONTS.h4,
    color: COLORS.black,
    flex: 1,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginLeft: 6,
  },
  providerSpec: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginLeft: 4,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: SIZES.sm,
  },
  infoChips: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chipText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    ...FONTS.small,
    color: COLORS.gray,
  },
  priceValue: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  unavailableText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    ...FONTS.h4,
    color: COLORS.gray,
    marginTop: SIZES.md,
  },
});
