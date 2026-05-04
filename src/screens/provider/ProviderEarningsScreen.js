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
import {
  COLORS,
  SIZES,
  FONTS,
} from '../../constants';
import {
  PROVIDER_TRANSACTIONS,
  PLATFORM_FEE_PERCENT,
} from '../../constants/payments';
import StatusBadge from '../../components/StatusBadge';

const PERIOD_TABS = ['This Week', 'This Month', 'All Time'];

export default function ProviderEarningsScreen() {
  const [activePeriod, setActivePeriod] = useState('This Week');

  const totalServiceAmount = PROVIDER_TRANSACTIONS.reduce(
    (sum, t) => sum + t.servicePrice,
    0
  );
  const totalPlatformFees = PROVIDER_TRANSACTIONS.reduce(
    (sum, t) => sum + t.platformFee,
    0
  );
  const totalEarnings = PROVIDER_TRANSACTIONS.reduce(
    (sum, t) => sum + t.providerEarnings,
    0
  );
  const pendingAmount = PROVIDER_TRANSACTIONS.filter(
    (t) => t.status === 'pending'
  ).reduce((sum, t) => sum + t.providerEarnings, 0);
  const paidAmount = PROVIDER_TRANSACTIONS.filter(
    (t) => t.status === 'paid'
  ).reduce((sum, t) => sum + t.providerEarnings, 0);

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'cash':
        return 'money-bill-wave';
      case 'card':
        return 'credit-card';
      case 'online':
        return 'university';
      default:
        return 'money-bill-wave';
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.txHeader}>
        <View style={styles.txLeft}>
          <View style={styles.txAvatar}>
            <FontAwesome5 name="user" size={14} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.txPatient}>{item.patientName}</Text>
            <Text style={styles.txService}>{item.serviceName}</Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.txDetails}>
        <View style={styles.txRow}>
          <Text style={styles.txLabel}>Service Amount</Text>
          <Text style={styles.txValue}>Rs {item.servicePrice}</Text>
        </View>
        <View style={styles.txRow}>
          <Text style={styles.txLabelRed}>
            Platform Fee ({PLATFORM_FEE_PERCENT}%)
          </Text>
          <Text style={styles.txValueRed}>- Rs {item.platformFee}</Text>
        </View>
        <View style={styles.txDivider} />
        <View style={styles.txRow}>
          <Text style={styles.txLabelBold}>Your Earnings</Text>
          <Text style={styles.txValueGreen}>Rs {item.providerEarnings}</Text>
        </View>
      </View>

      <View style={styles.txFooter}>
        <View style={styles.txFooterLeft}>
          <FontAwesome5
            name="calendar-alt"
            size={12}
            color={COLORS.gray}
          />
          <Text style={styles.txDate}>{item.date}</Text>
        </View>
        <View style={styles.txFooterRight}>
          <FontAwesome5
            name={getPaymentIcon(item.paymentMethod)}
            size={12}
            color={COLORS.gray}
          />
          <Text style={styles.txMethod}>
            {item.paymentMethod.charAt(0).toUpperCase() +
              item.paymentMethod.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Earnings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Earnings Overview Cards */}
        <View style={styles.overviewSection}>
          <View style={styles.mainEarningCard}>
            <View style={styles.mainEarningIcon}>
              <FontAwesome5
                name="wallet"
                size={24}
                color={COLORS.white}
              />
            </View>
            <Text style={styles.mainEarningLabel}>Total Earnings</Text>
            <Text style={styles.mainEarningValue}>Rs {totalEarnings}</Text>
            <Text style={styles.mainEarningNote}>
              After {PLATFORM_FEE_PERCENT}% platform fee deduction
            </Text>
          </View>

          <View style={styles.subCards}>
            <View style={styles.subCard}>
              <FontAwesome5
                name="check-circle"
                size={20}
                color={COLORS.success}
              />
              <Text style={styles.subCardValue}>Rs {paidAmount}</Text>
              <Text style={styles.subCardLabel}>Paid Out</Text>
            </View>
            <View style={styles.subCard}>
              <FontAwesome5
                name="clock"
                size={20}
                color={COLORS.warning}
              />
              <Text style={styles.subCardValue}>Rs {pendingAmount}</Text>
              <Text style={styles.subCardLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownDot}>
                <View
                  style={[styles.dot, { backgroundColor: COLORS.secondary }]}
                />
              </View>
              <Text style={styles.breakdownLabel}>
                Total Service Charges
              </Text>
              <Text style={styles.breakdownValue}>
                Rs {totalServiceAmount}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownDot}>
                <View
                  style={[styles.dot, { backgroundColor: COLORS.error }]}
                />
              </View>
              <Text style={styles.breakdownLabel}>
                Platform Fees ({PLATFORM_FEE_PERCENT}%)
              </Text>
              <Text style={[styles.breakdownValue, { color: COLORS.error }]}>
                - Rs {totalPlatformFees}
              </Text>
            </View>
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownDot}>
                <View
                  style={[styles.dot, { backgroundColor: COLORS.success }]}
                />
              </View>
              <Text style={styles.breakdownLabelBold}>Net Earnings</Text>
              <Text
                style={[
                  styles.breakdownValue,
                  { color: COLORS.success, fontWeight: '700' },
                ]}
              >
                Rs {totalEarnings}
              </Text>
            </View>

            {/* Visual bar */}
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${100 - PLATFORM_FEE_PERCENT}%`,
                    backgroundColor: COLORS.secondary,
                  },
                ]}
              />
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${PLATFORM_FEE_PERCENT}%`,
                    backgroundColor: COLORS.error,
                    opacity: 0.6,
                  },
                ]}
              />
            </View>
            <View style={styles.barLegend}>
              <Text style={styles.barLegendText}>
                Your share: {100 - PLATFORM_FEE_PERCENT}%
              </Text>
              <Text style={styles.barLegendText}>
                Platform: {PLATFORM_FEE_PERCENT}%
              </Text>
            </View>
          </View>
        </View>

        {/* Period Tabs */}
        <View style={styles.periodRow}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.periodTabs}
          >
            {PERIOD_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.periodTab,
                  activePeriod === tab && styles.periodTabActive,
                ]}
                onPress={() => setActivePeriod(tab)}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    activePeriod === tab && styles.periodTabTextActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transaction List */}
        <FlatList
          data={PROVIDER_TRANSACTIONS}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionList}
          scrollEnabled={false}
        />

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
    paddingBottom: SIZES.sm,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  overviewSection: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  mainEarningCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  mainEarningIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  mainEarningLabel: {
    ...FONTS.body,
    color: 'rgba(255,255,255,0.8)',
  },
  mainEarningValue: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.white,
    marginVertical: 4,
  },
  mainEarningNote: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  subCards: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  subCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  subCardValue: {
    ...FONTS.h3,
    color: COLORS.black,
    marginTop: SIZES.xs,
  },
  subCardLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  breakdownSection: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.sm,
  },
  breakdownCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  breakdownDot: {
    marginRight: SIZES.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownLabel: {
    ...FONTS.body,
    color: COLORS.gray,
    flex: 1,
  },
  breakdownLabelBold: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    flex: 1,
  },
  breakdownValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginVertical: SIZES.xs,
  },
  barContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: SIZES.sm,
  },
  barFill: {
    height: '100%',
  },
  barLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.xs,
  },
  barLegendText: {
    ...FONTS.small,
    color: COLORS.gray,
  },
  periodRow: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  periodTabs: {
    gap: SIZES.sm,
  },
  periodTab: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.white,
  },
  periodTabActive: {
    backgroundColor: COLORS.secondary,
  },
  periodTabText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
  },
  periodTabTextActive: {
    color: COLORS.white,
  },
  transactionList: {
    paddingHorizontal: SIZES.lg,
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
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  txPatient: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  txService: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  txDetails: {
    backgroundColor: COLORS.grayLight,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.sm,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  txLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  txValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  txLabelRed: {
    ...FONTS.body,
    color: COLORS.error,
  },
  txValueRed: {
    ...FONTS.bodyBold,
    color: COLORS.error,
  },
  txDivider: {
    height: 1,
    backgroundColor: COLORS.grayMedium,
    marginVertical: 4,
  },
  txLabelBold: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  txValueGreen: {
    ...FONTS.h4,
    color: COLORS.success,
  },
  txFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.sm,
  },
  txFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  txDate: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  txFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  txMethod: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
});
