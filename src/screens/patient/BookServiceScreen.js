import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import ServiceIcon from '../../components/ServiceIcon';
import { COLORS, SIZES, FONTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
];

const getNextDays = (count) => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    });
  }
  return days;
};

export default function BookServiceScreen({ route, navigation }) {
  const { service } = route.params;
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState(user?.address || '');
  const [notes, setNotes] = useState('');

  const days = getNextDays(7);

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a date and time');
      return;
    }
    if (!address) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    navigation.navigate('Payment', {
      service,
      date: selectedDate,
      time: selectedTime,
      address,
    });
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
          <Text style={styles.headerTitle}>Book Service</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.serviceInfo}>
          <ServiceIcon
            icon={service.icon}
            color={service.color}
            bgColor={service.bgColor}
          />
          <View style={styles.serviceText}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>
              From ${service.startingPrice} | {service.duration}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateRow}
          >
            {days.map((day) => (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dateCard,
                  selectedDate === day.date && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(day.date)}
              >
                <Text
                  style={[
                    styles.dateDayName,
                    selectedDate === day.date && styles.dateTextSelected,
                  ]}
                >
                  {day.isToday ? 'Today' : day.day}
                </Text>
                <Text
                  style={[
                    styles.dateDayNum,
                    selectedDate === day.date && styles.dateTextSelected,
                  ]}
                >
                  {day.dayNum}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    selectedDate === day.date && styles.dateTextSelected,
                  ]}
                >
                  {day.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Address</Text>
          <InputField
            icon="map-marker-alt"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
          <InputField
            icon="clipboard"
            placeholder="Any special instructions or symptoms..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>
              {selectedDate || 'Not selected'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>
              {selectedTime || 'Not selected'}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>${service.startingPrice}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Confirm Booking" onPress={handleBooking} />
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
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceText: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  serviceName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  servicePrice: {
    ...FONTS.caption,
    color: COLORS.gray,
    marginTop: 2,
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
  dateRow: {
    gap: SIZES.sm,
  },
  dateCard: {
    width: 72,
    height: 90,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  dateCardSelected: {
    backgroundColor: COLORS.primary,
  },
  dateDayName: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  dateDayNum: {
    ...FONTS.h2,
    color: COLORS.black,
    marginVertical: 2,
  },
  dateMonth: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  dateTextSelected: {
    color: COLORS.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  timeSlot: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  timeTextSelected: {
    color: COLORS.white,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.sm,
  },
  summaryLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  summaryValue: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: SIZES.sm,
    marginTop: SIZES.xs,
    marginBottom: 0,
  },
  totalLabel: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  totalValue: {
    ...FONTS.h3,
    color: COLORS.primary,
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
