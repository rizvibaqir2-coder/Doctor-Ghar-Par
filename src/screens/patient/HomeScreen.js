import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SERVICES, SERVICE_CATEGORIES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import ServiceIcon from '../../components/ServiceIcon';
import DrawerMenuButton from '../../components/DrawerMenuButton';

export default function HomeScreen({ navigation }) {
  const { user, switchRole } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Patient';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => {
        const cat = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory);
        return cat?.serviceIds?.includes(s.id);
      });

  const handleCategoryPress = (category) => {
    if (category.isExternal && category.id === 'pharmacy') {
      switchRole('store');
      return;
    }
    if (category.isExternal && category.id === 'specialist') {
      switchRole('specialist');
      return;
    }
    setSelectedCategory(category.id);
  };

  const renderCategoryItem = (category) => {
    const isActive = selectedCategory === category.id;
    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryCard,
          { borderColor: category.color },
          isActive && { backgroundColor: category.bgColor, borderColor: category.color },
        ]}
        activeOpacity={0.7}
        onPress={() => handleCategoryPress(category)}
      >
        <View style={[styles.categoryIconWrap, { backgroundColor: isActive ? category.color : category.bgColor }]}>
          <FontAwesome5 name={category.icon} size={16} color={isActive ? '#FFFFFF' : category.color} />
        </View>
        <Text style={[styles.categoryName, isActive && { color: category.color, fontWeight: '700' }]} numberOfLines={1}>
          {category.name}
        </Text>
        {category.isExternal && (
          <View style={[styles.externalBadge, { backgroundColor: category.color }]}>
            <FontAwesome5 name="external-link-alt" size={8} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <ServiceIcon icon={item.icon} color={item.color} bgColor={item.bgColor} />
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>From Rs {item.startingPrice}</Text>
      <View style={styles.ratingRow}>
        <FontAwesome5 name="star" solid size={10} color="#F59E0B" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <DrawerMenuButton />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.greeting}>Hello, {firstName}</Text>
          <Text style={styles.headerSubtitle}>What service do you need today?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name="bell" size={18} color={COLORS.black} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchBar}>
        <FontAwesome5 name="search" size={16} color={COLORS.gray} />
        <Text style={styles.searchText}>Search for services...</Text>
      </TouchableOpacity>

      <View style={styles.bannerCard}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Need Urgent Care?</Text>
          <Text style={styles.bannerSubtitle}>
            Book a doctor visit now and get seen within 2 hours
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() =>
              navigation.navigate('ServiceDetail', { service: SERVICES[0] })
            }
          >
            <Text style={styles.bannerButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerIconContainer}>
          <FontAwesome5 name="ambulance" size={40} color={COLORS.white} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Healthcare Facilities</Text>
        <Text style={styles.sectionSubtitle}>Tap a category to browse services</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {SERVICE_CATEGORIES.map(renderCategoryItem)}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Services' : SERVICE_CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Services'}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
        </Text>
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={filteredServices.length > 1 ? styles.serviceRow : undefined}
        scrollEnabled={false}
        contentContainerStyle={styles.servicesGrid}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome5 name="info-circle" size={24} color={COLORS.gray} />
            <Text style={styles.emptyText}>No services in this category</Text>
          </View>
        }
      />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <FontAwesome5 name="user-md" size={20} color={COLORS.primary} />
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Doctors</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="users" size={20} color={COLORS.secondary} />
          <Text style={styles.statNumber}>10K+</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="star" size={20} color="#F59E0B" />
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
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
    paddingBottom: SIZES.md,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
    paddingHorizontal: SIZES.md,
    height: 50,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchText: {
    ...FONTS.body,
    color: COLORS.grayMedium,
    marginLeft: SIZES.sm,
  },
  bannerCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerSubtitle: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
    marginBottom: SIZES.sm,
  },
  bannerButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: SIZES.radiusSm,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    ...FONTS.bodyBold,
    color: COLORS.primary,
  },
  bannerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.md,
    opacity: 0.9,
  },
  sectionHeader: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  sectionSubtitle: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  categoriesRow: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
    gap: 10,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    minWidth: 80,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryName: {
    ...FONTS.caption,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 11,
  },
  externalBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesGrid: {
    paddingHorizontal: SIZES.lg,
  },
  serviceRow: {
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    width: '48%',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceName: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: SIZES.sm,
  },
  servicePrice: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 4,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.xl,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: SIZES.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    marginTop: SIZES.md,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    alignItems: 'center',
    width: '30%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    ...FONTS.h3,
    color: COLORS.black,
    marginTop: SIZES.xs,
  },
  statLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
});
