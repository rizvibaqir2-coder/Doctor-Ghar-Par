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
import { COLORS, SIZES, FONTS, SERVICES } from '../../constants';

export default function ProviderDetailScreen({ route, navigation }) {
  const { provider } = route.params;

  const matchedService = SERVICES.find((s) => s.icon === provider.icon);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome5
          key={i}
          name="star"
          solid={i <= Math.floor(rating)}
          size={14}
          color={i <= Math.floor(rating) ? '#F59E0B' : COLORS.grayMedium}
        />
      );
    }
    return stars;
  };

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
          <Text style={styles.headerTitle}>Provider Details</Text>
          <TouchableOpacity style={styles.backButton}>
            <FontAwesome5 name="heart" size={18} color={COLORS.grayMedium} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View
            style={[
              styles.avatarLarge,
              { backgroundColor: provider.bgColor },
            ]}
          >
            <FontAwesome5
              name={provider.icon}
              size={40}
              color={provider.color}
            />
          </View>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerSpec}>{provider.specialization}</Text>

          <View style={styles.badgeRow}>
            {provider.isAvailable ? (
              <View style={styles.availableBadge}>
                <View style={styles.availDot} />
                <Text style={styles.availText}>Available Now</Text>
              </View>
            ) : (
              <View style={styles.unavailableBadge}>
                <Text style={styles.unavailText}>Unavailable</Text>
              </View>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <FontAwesome5 name="star" solid size={16} color="#F59E0B" />
              </View>
              <Text style={styles.statNumber}>{provider.rating}</Text>
              <Text style={styles.statLabel}>{provider.reviewCount} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={16}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.statNumber}>{provider.distance}</Text>
              <Text style={styles.statLabel}>{provider.estimatedTime}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <FontAwesome5
                  name="briefcase-medical"
                  size={16}
                  color={COLORS.secondary}
                />
              </View>
              <Text style={styles.statNumber}>{provider.experience}</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{provider.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          <View style={styles.qualRow}>
            <FontAwesome5
              name="graduation-cap"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.qualText}>{provider.qualifications}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Fee</Text>
          <View style={styles.priceCard}>
            <View>
              <Text style={styles.priceLabel}>Starting from</Text>
              <Text style={styles.priceValue}>${provider.price}</Text>
            </View>
            <Text style={styles.priceNote}>per visit</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Patient Reviews</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>
          {provider.reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.reviewerInfo}>
                  <View style={styles.reviewerAvatar}>
                    <FontAwesome5
                      name="user"
                      size={12}
                      color={COLORS.gray}
                    />
                  </View>
                  <View>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                <View style={styles.reviewStars}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>From</Text>
          <Text style={styles.bottomPriceValue}>${provider.price}</Text>
        </View>
        <Button
          title="Book Now"
          onPress={() => {
            if (matchedService) {
              navigation.navigate('BookService', { service: matchedService });
            }
          }}
          disabled={!provider.isAvailable}
          style={styles.bookButton}
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
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.lg,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  providerName: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  providerSpec: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: SIZES.sm,
  },
  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  availText: {
    ...FONTS.bodyBold,
    color: COLORS.success,
    fontSize: 12,
  },
  unavailableBadge: {
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  unavailText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginTop: SIZES.md,
    width: '100%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 4,
  },
  statNumber: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  statLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.grayLight,
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
  bioText: {
    ...FONTS.body,
    color: COLORS.gray,
    lineHeight: 22,
  },
  qualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
  },
  qualText: {
    ...FONTS.body,
    color: COLORS.black,
    marginLeft: SIZES.sm,
  },
  priceCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  priceValue: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  priceNote: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  seeAll: {
    ...FONTS.bodyBold,
    color: COLORS.primary,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  reviewerName: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  reviewDate: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    ...FONTS.body,
    color: COLORS.gray,
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    paddingBottom: 34,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomPrice: {
    marginRight: SIZES.md,
  },
  bottomPriceLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  bottomPriceValue: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  bookButton: {
    flex: 1,
  },
});
