import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import DrawerMenuButton from '../../components/DrawerMenuButton';

const SPEC_COLOR = '#7C3AED';
const SPEC_BG = '#EDE9FE';

const SPECIALIST_APPOINTMENTS = [
  {
    id: 'sa1',
    patientName: 'Ali Hassan',
    visitType: 'General Checkup',
    doctorCategory: 'Medical Officer',
    icon: 'user-md',
    date: '2026-05-06',
    time: '6:00 PM',
    status: 'confirmed',
    price: 1500,
    address: '45 Garden Road, Block C',
    notes: 'Regular checkup. Patient has diabetes history.',
  },
  {
    id: 'sa2',
    patientName: 'Fatima Noor',
    visitType: 'Heart Consultation',
    doctorCategory: 'Cardiologist',
    icon: 'heartbeat',
    date: '2026-05-06',
    time: '7:30 PM',
    status: 'pending',
    price: 3500,
    address: '12 Clifton Ave, Apt 3A',
    notes: 'Patient experiencing chest pain. Urgent visit.',
  },
  {
    id: 'sa3',
    patientName: 'Usman Tariq',
    visitType: 'Follow-up Visit',
    doctorCategory: 'Medical Officer',
    icon: 'user-md',
    date: '2026-05-05',
    time: '8:00 PM',
    status: 'completed',
    price: 1500,
    address: '78 Model Town, House 5',
    notes: 'Post-surgery follow-up.',
  },
  {
    id: 'sa4',
    patientName: 'Nadia Raza',
    visitType: 'Skin Consultation',
    doctorCategory: 'Dermatologist',
    icon: 'allergies',
    date: '2026-05-06',
    time: '9:00 PM',
    status: 'pending',
    price: 3000,
    address: '33 Gulshan Block 4',
    notes: 'Skin rash for 2 weeks.',
  },
];

const TABS = ['Pending', 'Confirmed', 'Completed'];

export default function SpecialistDashboardScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isAvailable, setIsAvailable] = useState(true);

  const getFilteredAppointments = () => {
    switch (activeTab) {
      case 'Pending':
        return SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'pending');
      case 'Confirmed':
        return SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'confirmed');
      case 'Completed':
        return SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'completed');
      default:
        return SPECIALIST_APPOINTMENTS;
    }
  };

  const pendingCount = SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'pending').length;
  const confirmedCount = SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'confirmed').length;
  const completedCount = SPECIALIST_APPOINTMENTS.filter((a) => a.status === 'completed').length;

  const renderAppointmentCard = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={[styles.visitIcon, { backgroundColor: SPEC_BG }]}>
          <FontAwesome5 name={item.icon} size={16} color={SPEC_COLOR} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.visitType}>{item.visitType}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <View style={styles.categoryBadge}>
        <FontAwesome5 name="tag" size={10} color={SPEC_COLOR} />
        <Text style={styles.categoryText}>{item.doctorCategory}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <FontAwesome5 name="calendar-alt" size={13} color={COLORS.gray} />
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome5 name="map-marker-alt" size={13} color={COLORS.gray} />
          <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
        </View>
        {item.notes ? (
          <View style={styles.detailRow}>
            <FontAwesome5 name="sticky-note" size={13} color={COLORS.gray} />
            <Text style={styles.detailText} numberOfLines={2}>{item.notes}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardActions}>
        <Text style={styles.price}>Rs {item.price}</Text>
        {item.status === 'pending' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.declineBtn}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: SPEC_COLOR }]}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity style={[styles.startBtn, { backgroundColor: SPEC_COLOR }]}>
            <FontAwesome5 name="play" size={13} color={COLORS.white} />
            <Text style={styles.startText}>Start Visit</Text>
          </TouchableOpacity>
        )}
        {item.status === 'completed' && (
          <TouchableOpacity style={styles.reportBtn}>
            <FontAwesome5 name="file-medical" size={13} color={SPEC_COLOR} />
            <Text style={[styles.reportText, { color: SPEC_COLOR }]}>View Report</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DrawerMenuButton />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>{user?.name || 'Doctor'}</Text>
          <Text style={styles.headerSubtitle}>Manage home checkup appointments</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <FontAwesome5 name="bell" size={18} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusBar}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, { backgroundColor: isAvailable ? COLORS.success : COLORS.error }]} />
          <View>
            <Text style={styles.statusTitle}>
              {isAvailable ? 'Available for Visits' : 'Not Available'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {isAvailable ? 'Patients can book you' : 'You are offline'}
            </Text>
          </View>
        </View>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
          trackColor={{ false: COLORS.grayLight, true: SPEC_BG }}
          thumbColor={isAvailable ? SPEC_COLOR : COLORS.gray}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
          <FontAwesome5 name="clock" size={16} color="#F59E0B" />
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
          <FontAwesome5 name="check-circle" size={16} color="#10B981" />
          <Text style={styles.statNumber}>{confirmedCount}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#DBEAFE' }]}>
          <FontAwesome5 name="clipboard-check" size={16} color="#3B82F6" />
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: SPEC_COLOR }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredAppointments()}
        renderItem={renderAppointmentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="calendar-times" size={48} color={COLORS.grayMedium} />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} appointments</Text>
          </View>
        }
      />
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
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  headerSubtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 2,
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
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.lg,
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusTitle: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  statusSubtitle: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  statCard: {
    flex: 1,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  statNumber: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 4,
  },
  statLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.lg,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    padding: 4,
    marginBottom: SIZES.md,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderRadius: SIZES.radius - 2,
  },
  activeTab: {
    shadowColor: SPEC_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 13,
  },
  activeTabText: {
    color: COLORS.white,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 20,
  },
  appointmentCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  visitIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  cardHeaderText: {
    flex: 1,
  },
  patientName: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
  visitType: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SPEC_BG,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: SIZES.sm,
  },
  categoryText: {
    ...FONTS.caption,
    color: SPEC_COLOR,
    fontWeight: '600',
  },
  cardDetails: {
    gap: 6,
    marginBottom: SIZES.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    ...FONTS.body,
    color: COLORS.gray,
    fontSize: 13,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingTop: SIZES.sm,
  },
  price: {
    ...FONTS.h3,
    color: SPEC_COLOR,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  declineBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    backgroundColor: '#FEE2E2',
  },
  declineText: {
    ...FONTS.bodyBold,
    color: COLORS.error,
    fontSize: 13,
  },
  acceptBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  acceptText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
    fontSize: 13,
  },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  startText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
    fontSize: 13,
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    backgroundColor: SPEC_BG,
  },
  reportText: {
    ...FONTS.bodyBold,
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    gap: SIZES.md,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.gray,
  },
});
