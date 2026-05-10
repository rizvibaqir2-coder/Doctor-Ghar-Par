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
  LAB_TRANSACTIONS,
  CURRENT_LAB_FEE_PERCENT,
  LAB_FEE_RANGE,
} from '../../constants/payments';
import StatusBadge from '../../components/StatusBadge';

const LAB_COLOR = '#F59E0B';
const LAB_BG = '#FEF3C7';

const PERIOD_TABS = ['This Week', 'This Month', 'All Time'];

export default function LabEarningsScreen() {
  const [activePeriod, setActivePeriod] = useState('This Week');

  const totalServiceAmount = LAB_TRANSACTIONS.reduce((sum, t) => sum + t.servicePrice, 0);
  const totalPlatformFees = LAB_TRANSACTIONS.reduce((sum, t) => sum + t.platformFee, 0);
  const totalEarnings = LAB_TRANSACTIONS.reduce((sum, t) => sum + t.labEarnings, 0);
  const pendingAmount = LAB_TRANSACTIONS.filter((t) => t.status === 'pending').reduce(
    (sum, t) => sum + t.labEarnings, 0
  );
  const paidAmount = LAB_TRANSACTIONS.filter((t) => t.status === 'paid').reduce(
    (sum, t) => sum + t.labEarnings, 0
  );

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={[styles.transactionIcon, { backgroundColor: LAB_BG }]}>
          <FontAwesome5 name="flask" size={14} color={LAB_COLOR} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionPatient}>{item.patientName}</Text>
          <Text style={styles.transactionService}>{item.testName}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Test Fee</Text>
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
          <Text style={[styles.earningsValue, { color: LAB_COLOR }]}>Rs {item.labEarnings}</Text>
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
        <Text style={styles.headerTitle}>Lab Earnings</Text>
        <Text style={styles.headerSubtitle}>Revenue & commission breakdown</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={[styles.summaryValue, { color: LAB_COLOR }]}>Rs {totalEarnings}</Text>
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
            <FontAwesome5 name="info-circle" size={16} color={LAB_COLOR} />
            <Text style={styles.feeInfoTitle}>Your Commission Rate</Text>
          </View>
          <Text style={styles.feeInfoDesc}>
            Your negotiated platform fee is <Text style={{ fontWeight: '700', color: LAB_COLOR }}>{CURRENT_LAB_FEE_PERCENT}%</Text> based on your lab quality and market presence.
          </Text>
          <Text style={styles.feeInfoNote}>
            Rate range: {LAB_FEE_RANGE.min}% - {LAB_FEE_RANGE.max}% (negotiable based on performance)
          </Text>
          <View style={styles.revenueBar}>
            <View style={[styles.revenueBarFill, { width: `${100 - CURRENT_LAB_FEE_PERCENT}%`, backgroundColor: LAB_COLOR }]}>
              <Text style={styles.revenueBarText}>Lab {100 - CURRENT_LAB_FEE_PERCENT}%</Text>
            </View>
            <View style={[styles.revenueBarFill, { width: `${CURRENT_LAB_FEE_PERCENT}%`, backgroundColor: '#EF4444' }]}>
              <Text style={styles.revenueBarText}>{CURRENT_LAB_FEE_PERCENT}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.periodTabs}>
          {PERIOD_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.periodTab, activePeriod === tab && [styles.periodTabActive, { backgroundColor: LAB_COLOR }]]}
              onPress={() => setActivePeriod(tab)}
            >
              <Text style={[styles.periodTabText, activePeriod === tab && styles.periodTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>

        {LAB_TRANSACTIONS.map((item) => (
          <View key={item.id}>{renderTransaction({ item })}</View>
        ))}

        <View style={{ height: 100 }} />
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
    fontSize: 36,
    marginVertical: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: SIZES.sm,
    gap: SIZES.lg,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryItemLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  summaryItemValue: {
    ...FONTS.h4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
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
    gap: 8,
    marginBottom: 6,
  },
  feeInfoTitle: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  feeInfoDesc: {
    ...FONTS.body,
    color: COLORS.gray,
    lineHeight: 20,
  },
  feeInfoNote: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 4,
    fontStyle: 'italic',
  },
  revenueBar: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: SIZES.sm,
  },
  revenueBarFill: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueBarText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 10,
  },
  periodTabs: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  periodTab: {
    flex: 1,
    paddingVertical: SIZES.sm,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  periodTabActive: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  periodTabText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 12,
  },
  periodTabTextActive: {
    color: COLORS.white,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  transactionCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
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
    marginBottom: SIZES.sm,
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
  transactionDetails: {
    backgroundColor: '#FAFAFA',
    borderRadius: SIZES.radius - 4,
    padding: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  feeLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  feeValue: {
    ...FONTS.caption,
    color: COLORS.black,
    fontWeight: '600',
  },
  earningsRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 6,
    marginTop: 4,
    marginBottom: 0,
  },
  earningsLabel: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    fontSize: 13,
  },
  earningsValue: {
    ...FONTS.bodyBold,
    fontSize: 13,
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
  },
  paymentMethodText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
});
