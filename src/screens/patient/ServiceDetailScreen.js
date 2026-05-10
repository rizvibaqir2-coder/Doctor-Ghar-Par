import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/Button';
import ServiceIcon from '../../components/ServiceIcon';
import { COLORS, SIZES, FONTS } from '../../constants';

export default function ServiceDetailScreen({ route, navigation }) {
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={18} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service Details</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.serviceHeader}>
          <ServiceIcon
            icon={service.icon}
            color={service.color}
            bgColor={service.bgColor}
            size={32}
          />
          <Text style={styles.serviceName}>{service.name}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <FontAwesome5 name="star" solid size={14} color="#F59E0B" />
              <Text style={styles.metaText}>
                {service.rating} ({service.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="clock" size={14} color={COLORS.gray} />
              <Text style={styles.metaText}>{service.duration}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this Service</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View
                style={[
                  styles.featureCheck,
                  { backgroundColor: service.bgColor },
                ]}
              >
                <FontAwesome5
                  name="check"
                  size={10}
                  color={service.color}
                />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceCard}>
          <View>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.priceValue}>
              Rs {service.startingPrice}
            </Text>
          </View>
          <Text style={styles.priceNote}>per visit</Text>
        </View>

        {service.pricingTiers && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { marginTop: SIZES.md }]}>Pricing Packages</Text>
            {service.pricingTiers.map((tier, index) => (
              <View key={index} style={styles.tierCard}>
                <View style={styles.tierHeader}>
                  <Text style={styles.tierName}>{tier.name}</Text>
                  <Text style={[styles.tierPrice, { color: service.color }]}>Rs {tier.price.toLocaleString()}</Text>
                </View>
                <Text style={styles.tierDesc}>{tier.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Book Now"
          onPress={() =>
            navigation.navigate('BookService', { service })
          }
        />
      </View>
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
    paddingBottom: SIZES.md,
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
  serviceHeader: {
    alignItems: 'center',
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.lg,
  },
  serviceName: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: SIZES.md,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    gap: SIZES.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    ...FONTS.body,
    color: COLORS.gray,
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.sm,
  },
  description: {
    ...FONTS.body,
    color: COLORS.gray,
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  featureCheck: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  featureText: {
    ...FONTS.body,
    color: COLORS.black,
    flex: 1,
  },
  priceCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  priceLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  priceValue: {
    ...FONTS.h1,
    color: COLORS.primary,
  },
  priceNote: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  tierCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tierName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  tierPrice: {
    ...FONTS.h3,
    fontWeight: '700',
  },
  tierDesc: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    paddingBottom: 34,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
});
