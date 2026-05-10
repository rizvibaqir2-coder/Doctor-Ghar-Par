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

const LAB_COLOR = '#F59E0B';
const LAB_BG = '#FEF3C7';

const LAB_ORDERS = [
  {
    id: 'lo1',
    patientName: 'Ali Hassan',
    testName: 'Complete Blood Count (CBC)',
    icon: 'tint',
    date: '2026-05-06',
    time: '8:00 AM',
    status: 'confirmed',
    price: 500,
    address: '45 Garden Road, Block C',
    sampleType: 'Blood',
    notes: 'Fasting sample required.',
  },
  {
    id: 'lo2',
    patientName: 'Fatima Noor',
    testName: 'Thyroid Function Test (TFT)',
    icon: 'diagnoses',
    date: '2026-05-06',
    time: '9:30 AM',
    status: 'pending',
    price: 1200,
    address: '12 Clifton Ave, Apt 3A',
    sampleType: 'Blood',
    notes: 'Patient on thyroid medication.',
  },
  {
    id: 'lo3',
    patientName: 'Usman Tariq',
    testName: 'Liver Function Test (LFT)',
    icon: 'procedures',
    date: '2026-05-05',
    time: '10:00 AM',
    status: 'completed',
    price: 800,
    address: '78 Model Town, House 5',
    sampleType: 'Blood',
    notes: 'Reports uploaded.',
  },
  {
    id: 'lo4',
    patientName: 'Nadia Raza',
    testName: 'Urine Analysis',
    icon: 'flask',
    date: '2026-05-06',
    time: '11:00 AM',
    status: 'pending',
    price: 300,
    address: '33 Gulshan Block 4',
    sampleType: 'Urine',
    notes: '',
  },
];

const TABS = ['Pending', 'Confirmed', 'Completed'];

export default function LabDashboardScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isAccepting, setIsAccepting] = useState(true);

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'Pending':
        return LAB_ORDERS.filter((o) => o.status === 'pending');
      case 'Confirmed':
        return LAB_ORDERS.filter((o) => o.status === 'confirmed');
      case 'Completed':
        return LAB_ORDERS.filter((o) => o.status === 'completed');
      default:
        return LAB_ORDERS;
    }
  };

  const renderOrderCard = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={[styles.testIcon, { backgroundColor: LAB_BG }]}>
          <FontAwesome5 name={item.icon} size={16} color={LAB_COLOR} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.testName}>{item.testName}</Text>
        </View>
        <StatusBadge status={item.status} />
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
        <View style={styles.detailRow}>
          <FontAwesome5 name="vial" size={13} color={COLORS.gray} />
          <Text style={styles.detailText}>Sample: {item.sampleType}</Text>
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
            <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: LAB_COLOR }]}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity style={[styles.collectBtn, { backgroundColor: LAB_COLOR }]}>
            <FontAwesome5 name="vial" size={13} color={COLORS.white} />
            <Text style={styles.collectText}>Collect Sample</Text>
          </TouchableOpacity>
        )}
        {item.status === 'completed' && (
          <TouchableOpacity style={styles.reportBtn}>
            <FontAwesome5 name="file-pdf" size={13} color={LAB_COLOR} />
            <Text style={[styles.reportText, { color: LAB_COLOR }]}>View Report</Text>
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
          <Text style={styles.greeting}>
            {user?.name || 'Lab Dashboard'}
          </Text>
          <Text style={styles.headerSubtitle}>Manage test orders & reports</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name="bell" size={18} color={COLORS.black} />
          <View style={[styles.notificationDot, { backgroundColor: LAB_COLOR }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusLeft}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isAccepting ? COLORS.success : COLORS.gray },
            ]}
          />
          <View>
            <Text style={styles.statusTitle}>
              {isAccepting ? 'Accepting Orders' : 'Not Accepting'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {isAccepting ? 'Lab is visible to patients' : 'Lab is hidden from patients'}
            </Text>
          </View>
        </View>
        <Switch
          value={isAccepting}
          onValueChange={setIsAccepting}
          trackColor={{ false: COLORS.grayMedium, true: LAB_BG }}
          thumbColor={isAccepting ? LAB_COLOR : '#f4f3f4'}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: LAB_BG }]}>
          <FontAwesome5 name="clock" size={18} color={LAB_COLOR} />
          <Text style={styles.statNumber}>
            {LAB_ORDERS.filter((o) => o.status === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
          <FontAwesome5 name="check-circle" size={18} color={COLORS.success} />
          <Text style={styles.statNumber}>
            {LAB_ORDERS.filter((o) => o.status === 'confirmed').length}
          </Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E0F2FE' }]}>
          <FontAwesome5 name="file-medical-alt" size={18} color="#0EA5E9" />
          <Text style={styles.statNumber}>
            {LAB_ORDERS.filter((o) => o.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.tabActive, { backgroundColor: LAB_COLOR }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredOrders()}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome5 name="flask" size={40} color={COLORS.grayMedium} />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} orders</Text>
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
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: SIZES.sm,
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
    borderRadius: SIZES.radius,
    padding: SIZES.md,
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
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.sm,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  tabActive: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    ...FONTS.bodyBold,
    color: COLORS.gray,
    fontSize: 13,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  orderCard: {
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
  testIcon: {
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
  testName: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  cardDetails: {
    backgroundColor: '#FAFAFA',
    borderRadius: SIZES.radius - 4,
    padding: SIZES.sm,
    marginBottom: SIZES.sm,
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    ...FONTS.caption,
    color: COLORS.gray,
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...FONTS.h4,
    color: LAB_COLOR,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  declineBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
  },
  declineText: {
    ...FONTS.caption,
    color: COLORS.error,
    fontWeight: '700',
  },
  acceptBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: 20,
  },
  acceptText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontWeight: '700',
  },
  collectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  collectText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontWeight: '700',
  },
  reportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: LAB_BG,
    gap: 6,
  },
  reportText: {
    ...FONTS.caption,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.xl * 2,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: SIZES.sm,
  },
});
