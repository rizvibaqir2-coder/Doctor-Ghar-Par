import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SERVICES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import ServiceIcon from '../../components/ServiceIcon';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Patient';

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
        <View>
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
        <Text style={styles.sectionTitle}>Our Services</Text>
        <Text style={styles.sectionSubtitle}>Choose what you need</Text>
      </View>

      <FlatList
        data={SERVICES}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.serviceRow}
        scrollEnabled={false}
        contentContainerStyle={styles.servicesGrid}
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
