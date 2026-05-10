import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';
import {
  PROVIDER_TRANSACTIONS,
  LAB_TRANSACTIONS,
  STORE_TRANSACTIONS,
  SPECIALIST_TRANSACTIONS,
  PLATFORM_FEE_PERCENT,
  SPECIALIST_FEE_PERCENT,
} from '../../constants/payments';
import { useAuth } from '../../context/AuthContext';
import DrawerMenuButton from '../../components/DrawerMenuButton';

const ADMIN_COLOR = '#DC2626';
const ADMIN_BG = '#FEE2E2';

const providerRevenue = PROVIDER_TRANSACTIONS.reduce((s, t) => s + t.platformFee, 0);
const labRevenue = LAB_TRANSACTIONS.reduce((s, t) => s + t.platformFee, 0);
const storeRevenue = STORE_TRANSACTIONS.reduce((s, t) => s + t.platformFee, 0);
const specialistRevenue = SPECIALIST_TRANSACTIONS.reduce((s, t) => s + t.platformFee, 0);
const totalPlatformRevenue = providerRevenue + labRevenue + storeRevenue + specialistRevenue;

const totalProviderOrders = PROVIDER_TRANSACTIONS.length;
const totalLabOrders = LAB_TRANSACTIONS.length;
const totalStoreOrders = STORE_TRANSACTIONS.length;
const totalSpecialistVisits = SPECIALIST_TRANSACTIONS.length;
const totalOrders = totalProviderOrders + totalLabOrders + totalStoreOrders + totalSpecialistVisits;

const totalServiceVolume = [
  ...PROVIDER_TRANSACTIONS,
  ...LAB_TRANSACTIONS,
  ...STORE_TRANSACTIONS,
  ...SPECIALIST_TRANSACTIONS,
].reduce((s, t) => s + (t.servicePrice || 0), 0);

export default function AdminDashboardScreen() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('All Time');

  const PERIODS = ['Today', 'This Week', 'This Month', 'All Time'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <DrawerMenuButton />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.headerTitle}>{user?.name || 'Admin'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notifButton}>
            <FontAwesome5 name="bell" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.periodContainer}>
        {PERIODS.map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.periodTab, selectedPeriod === period && styles.activePeriodTab]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodText, selectedPeriod === period && styles.activePeriodText]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroLabel}>Total Platform Revenue</Text>
        <Text style={styles.heroValue}>Rs {totalPlatformRevenue.toLocaleString()}</Text>
        <Text style={styles.heroSubtext}>From {totalOrders} total orders across all portals</Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>Rs {totalServiceVolume.toLocaleString()}</Text>
            <Text style={styles.heroStatLabel}>Total Service Volume</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Revenue by Portal</Text>

      <View style={styles.portalGrid}>
        <View style={[styles.portalCard, { borderLeftColor: '#00C48C' }]}>
          <View style={[styles.portalIcon, { backgroundColor: '#D1FAE5' }]}>
            <FontAwesome5 name="user-nurse" size={18} color="#00C48C" />
          </View>
          <Text style={styles.portalName}>Healthcare Providers</Text>
          <Text style={[styles.portalRevenue, { color: '#00C48C' }]}>Rs {providerRevenue.toLocaleString()}</Text>
          <View style={styles.portalMeta}>
            <Text style={styles.portalMetaText}>{totalProviderOrders} services</Text>
            <Text style={styles.portalFee}>{PLATFORM_FEE_PERCENT}% fee</Text>
          </View>
        </View>

        <View style={[styles.portalCard, { borderLeftColor: '#F59E0B' }]}>
          <View style={[styles.portalIcon, { backgroundColor: '#FEF3C7' }]}>
            <FontAwesome5 name="flask" size={18} color="#F59E0B" />
          </View>
          <Text style={styles.portalName}>Diagnostic Labs</Text>
          <Text style={[styles.portalRevenue, { color: '#F59E0B' }]}>Rs {labRevenue.toLocaleString()}</Text>
          <View style={styles.portalMeta}>
            <Text style={styles.portalMetaText}>{totalLabOrders} tests</Text>
            <Text style={styles.portalFee}>10-30% fee</Text>
          </View>
        </View>

        <View style={[styles.portalCard, { borderLeftColor: '#10B981' }]}>
          <View style={[styles.portalIcon, { backgroundColor: '#D1FAE5' }]}>
            <FontAwesome5 name="store" size={18} color="#10B981" />
          </View>
          <Text style={styles.portalName}>Medical Stores</Text>
          <Text style={[styles.portalRevenue, { color: '#10B981' }]}>Rs {storeRevenue.toLocaleString()}</Text>
          <View style={styles.portalMeta}>
            <Text style={styles.portalMetaText}>{totalStoreOrders} orders</Text>
            <Text style={styles.portalFee}>10-50% fee</Text>
          </View>
        </View>

        <View style={[styles.portalCard, { borderLeftColor: '#7C3AED' }]}>
          <View style={[styles.portalIcon, { backgroundColor: '#EDE9FE' }]}>
            <FontAwesome5 name="user-md" size={18} color="#7C3AED" />
          </View>
          <Text style={styles.portalName}>Specialist Doctors</Text>
          <Text style={[styles.portalRevenue, { color: '#7C3AED' }]}>Rs {specialistRevenue.toLocaleString()}</Text>
          <View style={styles.portalMeta}>
            <Text style={styles.portalMetaText}>{totalSpecialistVisits} visits</Text>
            <Text style={styles.portalFee}>{SPECIALIST_FEE_PERCENT}% fee</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Platform Overview</Text>

      <View style={styles.overviewGrid}>
        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { backgroundColor: '#DBEAFE' }]}>
            <FontAwesome5 name="users" size={22} color="#3B82F6" />
            <Text style={styles.overviewNumber}>24</Text>
            <Text style={styles.overviewLabel}>Active Providers</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: '#FEF3C7' }]}>
            <FontAwesome5 name="flask" size={22} color="#F59E0B" />
            <Text style={styles.overviewNumber}>8</Text>
            <Text style={styles.overviewLabel}>Registered Labs</Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { backgroundColor: '#D1FAE5' }]}>
            <FontAwesome5 name="store" size={22} color="#10B981" />
            <Text style={styles.overviewNumber}>12</Text>
            <Text style={styles.overviewLabel}>Medical Stores</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: '#EDE9FE' }]}>
            <FontAwesome5 name="user-md" size={22} color="#7C3AED" />
            <Text style={styles.overviewNumber}>15</Text>
            <Text style={styles.overviewLabel}>Specialist Doctors</Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { backgroundColor: '#FCE7F3' }]}>
            <FontAwesome5 name="user-injured" size={22} color="#EC4899" />
            <Text style={styles.overviewNumber}>342</Text>
            <Text style={styles.overviewLabel}>Total Patients</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: '#FEE2E2' }]}>
            <FontAwesome5 name="clipboard-list" size={22} color="#DC2626" />
            <Text style={styles.overviewNumber}>{totalOrders}</Text>
            <Text style={styles.overviewLabel}>Total Orders</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Service Breakdown</Text>

      <View style={styles.serviceBreakdown}>
        <ServiceRow icon="syringe" color="#0D6EFD" name="IV/IM Injections" count={45} />
        <ServiceRow icon="band-aid" color="#00C48C" name="Wound Dressing" count={28} />
        <ServiceRow icon="procedures" color="#F59E0B" name="Catheterization" count={12} />
        <ServiceRow icon="bone" color="#8B5CF6" name="POP / Cast" count={8} />
        <ServiceRow icon="tint" color="#EC4899" name="Lab Tests (Blood)" count={67} />
        <ServiceRow icon="x-ray" color="#6366F1" name="X-Ray & Imaging" count={23} />
        <ServiceRow icon="stethoscope" color="#7C3AED" name="Home Doctor Visits" count={52} />
        <ServiceRow icon="heartbeat" color="#DC2626" name="Specialist Consultations" count={34} />
        <ServiceRow icon="hand-holding-medical" color="#14B8A6" name="Nursing Care" count={19} />
        <ServiceRow icon="pills" color="#10B981" name="Medicine Deliveries" count={89} />
      </View>

      <Text style={styles.sectionTitle}>Fee Structure Summary</Text>

      <View style={styles.feeTable}>
        <View style={styles.feeTableHeader}>
          <Text style={[styles.feeTableCol, styles.feeTableHeaderText, { flex: 2 }]}>Portal</Text>
          <Text style={[styles.feeTableCol, styles.feeTableHeaderText]}>Fee Type</Text>
          <Text style={[styles.feeTableCol, styles.feeTableHeaderText]}>Rate</Text>
        </View>
        <FeeRow portal="Providers" type="Fixed" rate="30%" color="#00C48C" />
        <FeeRow portal="Labs" type="Negotiable" rate="10-30%" color="#F59E0B" />
        <FeeRow portal="Stores (Surgical)" type="Category" rate="50%" color="#10B981" />
        <FeeRow portal="Stores (MNC)" type="Category" rate="10%" color="#10B981" />
        <FeeRow portal="Stores (Local)" type="Category" rate="20%" color="#10B981" />
        <FeeRow portal="Stores (Devices)" type="Category" rate="15%" color="#10B981" />
        <FeeRow portal="Specialists" type="Fixed" rate="30%" color="#7C3AED" />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function ServiceRow({ icon, color, name, count }) {
  return (
    <View style={styles.serviceRow}>
      <View style={[styles.serviceIcon, { backgroundColor: color + '20' }]}>
        <FontAwesome5 name={icon} size={14} color={color} />
      </View>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.serviceCount}>{count}</Text>
    </View>
  );
}

function FeeRow({ portal, type, rate, color }) {
  return (
    <View style={styles.feeTableRow}>
      <View style={[styles.feeTableCol, { flex: 2, flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
        <View style={[styles.feeDot, { backgroundColor: color }]} />
        <Text style={styles.feePortalText}>{portal}</Text>
      </View>
      <Text style={[styles.feeTableCol, styles.feeTypeText]}>{type}</Text>
      <Text style={[styles.feeTableCol, styles.feeRateText]}>{rate}</Text>
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
    ...FONTS.body,
    color: COLORS.gray,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  headerRight: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  notifButton: {
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
  periodContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    padding: 4,
    marginBottom: SIZES.md,
  },
  periodTab: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderRadius: SIZES.radius - 2,
  },
  activePeriodTab: {
    backgroundColor: ADMIN_COLOR,
    shadowColor: ADMIN_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  periodText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 12,
  },
  activePeriodText: {
    color: COLORS.white,
  },
  heroCard: {
    backgroundColor: ADMIN_COLOR,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
  },
  heroLabel: {
    ...FONTS.body,
    color: 'rgba(255,255,255,0.8)',
  },
  heroValue: {
    ...FONTS.h1,
    color: COLORS.white,
    fontSize: 36,
    marginVertical: SIZES.xs,
  },
  heroSubtext: {
    ...FONTS.body,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  heroStats: {
    marginTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: SIZES.sm,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  heroStatLabel: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
    marginTop: SIZES.sm,
  },
  portalGrid: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  portalCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    borderLeftWidth: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  portalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  portalName: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    marginBottom: 2,
  },
  portalRevenue: {
    ...FONTS.h2,
    marginBottom: SIZES.xs,
  },
  portalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portalMetaText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  portalFee: {
    ...FONTS.caption,
    color: COLORS.gray,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  overviewGrid: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  overviewCard: {
    flex: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    alignItems: 'center',
  },
  overviewNumber: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: SIZES.xs,
  },
  overviewLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
    textAlign: 'center',
  },
  serviceBreakdown: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.sm,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  serviceIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  serviceName: {
    ...FONTS.body,
    color: COLORS.black,
    flex: 1,
  },
  serviceCount: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  feeTable: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  feeTableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.sm,
    paddingHorizontal: SIZES.md,
  },
  feeTableHeaderText: {
    ...FONTS.caption,
    color: COLORS.gray,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  feeTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    alignItems: 'center',
  },
  feeTableCol: {
    flex: 1,
  },
  feeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  feePortalText: {
    ...FONTS.body,
    color: COLORS.black,
    fontSize: 13,
  },
  feeTypeText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  feeRateText: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    fontSize: 13,
  },
});
