import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/Button';
import { COLORS, SIZES, FONTS } from '../../constants';
import {
  PAYMENT_METHODS,
  calculateFees,
  PLATFORM_FEE_PERCENT,
} from '../../constants/payments';

export default function PaymentScreen({ route, navigation }) {
  const { service, date, time, address } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fees = calculateFees(service.startingPrice);

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);

    Alert.alert(
      'Payment Successful!',
      `Your ${service.name} has been booked.\n\nDate: ${date}\nTime: ${time}\nTotal: Rs ${fees.totalPatientPays}\nPayment: ${PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name}`,
      [
        {
          text: 'View Bookings',
          onPress: () =>
            navigation.navigate('MainTabs', { screen: 'Bookings' }),
        },
        { text: 'OK', onPress: () => navigation.navigate('MainTabs') },
      ]
    );
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
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <View style={styles.orderLeft}>
                <View
                  style={[
                    styles.serviceIcon,
                    { backgroundColor: service.bgColor },
                  ]}
                >
                  <FontAwesome5
                    name={service.icon}
                    size={18}
                    color={service.color}
                  />
                </View>
                <View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDate}>
                    {date} at {time}
                  </Text>
                </View>
              </View>
            </View>

            {address && (
              <View style={styles.addressRow}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={14}
                  color={COLORS.gray}
                />
                <Text style={styles.addressText}>{address}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Fee Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Breakdown</Text>
          <View style={styles.feeCard}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Service Fee</Text>
              <Text style={styles.feeValue}>Rs {fees.servicePrice}</Text>
            </View>
            <View style={styles.feeRow}>
              <View style={styles.feeLabelRow}>
                <Text style={styles.feeLabel}>
                  Platform Fee ({PLATFORM_FEE_PERCENT}%)
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Platform Fee',
                      `A ${PLATFORM_FEE_PERCENT}% platform fee is charged to maintain the service, ensure quality providers, and offer customer support.`
                    )
                  }
                >
                  <FontAwesome5
                    name="info-circle"
                    size={12}
                    color={COLORS.gray}
                    style={{ marginLeft: 6 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.feeValue}>Rs {fees.platformFee}</Text>
            </View>
            <View style={styles.feeDivider} />
            <View style={styles.feeRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>Rs {fees.totalPatientPays}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <FontAwesome5 name="info-circle" size={14} color={COLORS.info} />
            <Text style={styles.infoText}>
              Rs {fees.platformFee} goes to the platform and Rs{' '}
              {fees.providerEarnings} goes to your healthcare provider.
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View
                style={[styles.methodIcon, { backgroundColor: method.bgColor }]}
              >
                <FontAwesome5 name={method.icon} size={18} color={method.color} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDesc}>{method.description}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  selectedMethod === method.id && styles.radioSelected,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>Rs {fees.totalPatientPays}</Text>
        </View>
        <Button
          title={
            isProcessing
              ? 'Processing...'
              : `Pay Rs ${fees.totalPatientPays}`
          }
          onPress={handlePayment}
          loading={isProcessing}
          style={styles.payButton}
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
  section: {
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.sm,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  serviceName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  serviceDate: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
  },
  addressText: {
    ...FONTS.body,
    color: COLORS.gray,
    marginLeft: SIZES.sm,
    flex: 1,
  },
  feeCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  feeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  feeValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  feeDivider: {
    height: 1,
    backgroundColor: COLORS.grayLight,
    marginVertical: SIZES.xs,
  },
  totalLabel: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  totalValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderRadius: SIZES.radiusSm,
    padding: SIZES.sm,
    marginTop: SIZES.sm,
    gap: SIZES.sm,
  },
  infoText: {
    ...FONTS.caption,
    color: COLORS.info,
    flex: 1,
    lineHeight: 18,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  methodDesc: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.grayMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
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
  bottomTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  bottomTotalLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  bottomTotalValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  payButton: {},
});
