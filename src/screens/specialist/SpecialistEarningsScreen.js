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
import { COLORS, SIZES, FONTS } from '../../constants';
import {
  SPECIALIST_TRANSACTIONS,
  SPECIALIST_FEE_PERCENT,
} from '../../constants/payments';
import StatusBadge from '../../components/StatusBadge';

const SPEC_COLOR = '#7C3AED';
const SPEC_BG = '#EDE9FE';

const PERIOD_TABS = ['This Week', 'This Month', 'All Time'];

export default function SpecialistEarningsScreen() {
  const [activePeriod, setActivePeriod] = useState('This Week');

  const totalServiceAmount = SPECIALIST_TRANSACTIONS.reduce((sum, t) => sum + t.servicePrice, 0);
  const totalPlatformFees = SPECIALIST_TRANSACTIONS.reduce((sum, t) => sum + t.platformFee, 0);
  const totalEarnings = SPECIALIST_TRANSACTIONS.reduce((sum, t) => sum + t.doctorEarnings, 0);
  const pendingAmount = SPECIALIST_TRANSACTIONS.filter((t) => t.status === 'pending').reduce(
    (sum, t) => sum + t.doctorEarnings, 0
  );
  const paidAmount = SPECIALIST_TRANSACTIONS.filter((t) => t.status === 'paid').reduce(
    (sum, t) => sum + t.doctorEarnings, 0
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={[styles.transactionIcon, { backgroundColor: SPEC_BG }]}>
          <FontAwesome5 name="user-md" size={14} color={SPEC_COLOR} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionPatient}>{item.patientName}</Text>
          <Text style={styles.transactionService}>{item.visitType}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.categoryBadge}>
        <FontAwesome5 name="tag" size={10} color={SPEC_COLOR} />
        <Text style={styles.categoryText}>{item.categoryLabel}</Text>
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Visit Fee</Text>
          <Text style={styles.feeValue}>Rs {item.servicePrice}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={[styles.feeLabel, { color: COLORS.error }]}>
            Platform Fee ({item.feePercent}%)
          </Text>
          <Text style={[styles.feeValue, { color: COLORS.error }]}>
            -Rs {item.platformFee}
          </Text>
        </View>
        <View style={[styles.feeRow, styles.earningsRow]}>
          <Text style={styles.earningsLabel}>Your Earnings</Text>
          <Text style={[styles.earningsValue, { color: SPEC_COLOR }]}>Rs {item.doctorEarnings}</Text>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <View style={styles.paymentMethodBadge}>
          <FontAwesome5
            name={
              item.paymentMethod === 'cash' ? 'money-bill-wave' :
              item.paymentMethod === 'card' ? 'credit-card' : 'university'
            }
            size={10}
            color={COLORS.gray}
          />
          <Text style={styles.paymentMethodText}>
            {item.paymentMethod === 'cash' ? 'Cash' :
             item.paymentMethod === 'card' ? 'Card' : 'Online'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor Earnings</Text>
        <Text style={styles.headerSubtitle}>Revenue & commission breakdown</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={[styles.summaryValue, { color: SPEC_COLOR }]}>Rs {totalEarnings}</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Paid Out</Text>
              <Text style={[styles.summaryItemValue, { color: COLORS.success }]}>Rs {paidAmount}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Pending</Text>
              <Text style={[styles.summaryItemValue, { color: '#F59E0B' }]}>Rs {pendingAmount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.feeInfoCard}>
          <View style={styles.feeInfoHeader}>
            <FontAwesome5 name="info-circle" size={16} color={SPEC_COLOR} />
            <Text style={styles.feeInfoTitle}>Platform Fee Structure</Text>
          </View>
          <Text style={styles.feeInfoDesc}>
            Platform fee is <Text style={{ fontWeight: '700', color: SPEC_COLOR }}>{SPECIALIST_FEE_PERCENT}%</Text> on all home visit bookings.
          </Text>
          <View style={styles.feeExamples}>
            <View style={styles.feeExampleRow}>
              <Text style={styles.feeExampleLabel}>Medical Officer (Rs 1,500)</Text>
              <Text style={styles.feeExampleValue}>You earn Rs 1,050</Text>
            </View>
            <View style={styles.feeExampleRow}>
              <Text style={styles.feeExampleLabel}>Specialist (Rs 2,500 - 5,000)</Text>
              <Text style={styles.feeExampleValue}>You earn Rs 1,750 - 3,500</Text>
            </View>
          </View>
          <View style={styles.revenueBar}>
            <View style={[styles.revenueSegment, { flex: 70, backgroundColor: SPEC_COLOR, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }]}>
              <Text style={styles.revenueSegmentText}>Doctor 70%</Text>
            </View>
            <View style={[styles.revenueSegment, { flex: 30, backgroundColor: '#F59E0B', borderTopRightRadius: 6, borderBottomRightRadius: 6 }]}>
              <Text style={styles.revenueSegmentText}>Platform 30%</Text>
            </View>
          </View>
        </View>

        <View style={styles.periodContainer}>
          {PERIOD_TABS.map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodTab, activePeriod === period && [styles.activePeriodTab, { backgroundColor: SPEC_COLOR }]]}
              onPress={() => setActivePeriod(period)}
            >
              <Text style={[styles.periodText, activePeriod === period && styles.activePeriodText]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.totalBreakdown}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Total Visit Fees</Text>
            <Text style={styles.breakdownValue}>Rs {totalServiceAmount}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownLabel, { color: COLORS.error }]}>Total Platform Fees</Text>
            <Text style={[styles.breakdownValue, { color: COLORS.error }]}>-Rs {totalPlatformFees}</Text>
          </View>
          <View style={[styles.breakdownRow, styles.breakdownTotal]}>
            <Text style={styles.breakdownTotalLabel}>Net Earnings</Text>
            <Text style={[styles.breakdownTotalValue, { color: SPEC_COLOR }]}>Rs {totalEarnings}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>

        <FlatList
          data={SPECIALIST_TRANSACTIONS}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
        />

        <View style={{ height: 20 }} />
      </ScrollView>
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
  headerSubtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  summaryValue: {
    ...FONTS.h1,
    fontSize: 32,
    marginVertical: SIZES.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryItemLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  summaryItemValue: {
    ...FONTS.h3,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.grayLight,
  },
  feeInfoCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  feeInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    marginBottom: SIZES.xs,
  },
  feeInfoTitle: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  feeInfoDesc: {
    ...FONTS.body,
    color: COLORS.gray,
    marginBottom: SIZES.sm,
  },
  feeExamples: {
    backgroundColor: SPEC_BG,
    borderRadius: SIZES.radius,
    padding: SIZES.sm,
    marginBottom: SIZES.sm,
    gap: 6,
  },
  feeExampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeExampleLabel: {
    ...FONTS.body,
    color: COLORS.black,
    fontSize: 13,
  },
  feeExampleValue: {
    ...FONTS.bodyBold,
    color: SPEC_COLOR,
    fontSize: 13,
  },
  revenueBar: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 6,
    overflow: 'hidden',
  },
  revenueSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueSegmentText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 11,
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
    shadowColor: SPEC_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  periodText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 13,
  },
  activePeriodText: {
    color: COLORS.white,
  },
  totalBreakdown: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  breakdownLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  breakdownValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  breakdownTotal: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    marginTop: 4,
    paddingTop: SIZES.sm,
  },
  breakdownTotalLabel: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  breakdownTotalValue: {
    ...FONTS.h3,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 20,
  },
  transactionCard: {
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
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionPatient: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  transactionService: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SPEC_BG,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: SIZES.xs,
  },
  categoryText: {
    ...FONTS.caption,
    color: SPEC_COLOR,
    fontWeight: '600',
    fontSize: 11,
  },
  transactionDetails: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.sm,
    marginBottom: SIZES.xs,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  feeLabel: {
    ...FONTS.body,
    color: COLORS.gray,
    fontSize: 13,
  },
  feeValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    fontSize: 13,
  },
  earningsRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    marginTop: 4,
    paddingTop: 6,
  },
  earningsLabel: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    fontSize: 13,
  },
  earningsValue: {
    ...FONTS.h3,
    fontSize: 15,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  paymentMethodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paymentMethodText: {
    ...FONTS.caption,
    color: COLORS.gray,
    fontSize: 11,
  },
});
