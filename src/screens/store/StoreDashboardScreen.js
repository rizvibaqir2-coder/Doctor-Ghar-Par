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

const STORE_COLOR = '#10B981';
const STORE_BG = '#D1FAE5';

const STORE_ORDERS = [
  {
    id: 'so1',
    patientName: 'Ali Hassan',
    items: 'Augmentin 625mg x2, Panadol x1, Brufen 400mg x1',
    icon: 'pills',
    date: '2026-05-06',
    time: '10:30 AM',
    status: 'confirmed',
    price: 850,
    address: '45 Garden Road, Block C',
    prescriptionRequired: true,
    notes: 'Doctor prescribed. Prescription image uploaded.',
  },
  {
    id: 'so2',
    patientName: 'Fatima Noor',
    items: 'Vitamin D3 x1, Calcium Tablets x1, Iron Supplement x1',
    icon: 'capsules',
    date: '2026-05-06',
    time: '11:00 AM',
    status: 'pending',
    price: 1200,
    address: '12 Clifton Ave, Apt 3A',
    prescriptionRequired: false,
    notes: '',
  },
  {
    id: 'so3',
    patientName: 'Usman Tariq',
    items: 'Blood Pressure Monitor x1, Digital Thermometer x1',
    icon: 'thermometer',
    date: '2026-05-05',
    time: '3:00 PM',
    status: 'completed',
    price: 3500,
    address: '78 Model Town, House 5',
    prescriptionRequired: false,
    notes: 'Delivered successfully.',
  },
  {
    id: 'so4',
    patientName: 'Sana Khan',
    items: 'Insulin Pen x2, Glucometer Strips x1, Syringes x10',
    icon: 'syringe',
    date: '2026-05-06',
    time: '12:00 PM',
    status: 'pending',
    price: 2800,
    address: '55 DHA Phase 5, Street 12',
    prescriptionRequired: true,
    notes: 'Diabetic patient. Urgent delivery needed.',
  },
];

const TABS = ['Pending', 'Confirmed', 'Completed'];

export default function StoreDashboardScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isOpen, setIsOpen] = useState(true);

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'Pending':
        return STORE_ORDERS.filter((o) => o.status === 'pending');
      case 'Confirmed':
        return STORE_ORDERS.filter((o) => o.status === 'confirmed');
      case 'Completed':
        return STORE_ORDERS.filter((o) => o.status === 'completed');
      default:
        return STORE_ORDERS;
    }
  };

  const renderOrderCard = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={[styles.itemIcon, { backgroundColor: STORE_BG }]}>
          <FontAwesome5 name={item.icon} size={16} color={STORE_COLOR} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.itemCount} numberOfLines={1}>{item.items}</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      {item.prescriptionRequired && (
        <View style={styles.prescriptionBadge}>
          <FontAwesome5 name="prescription" size={12} color="#DC2626" />
          <Text style={styles.prescriptionText}>Prescription Required</Text>
        </View>
      )}

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
            <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: STORE_COLOR }]}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status === 'confirmed' && (
          <TouchableOpacity style={[styles.deliverBtn, { backgroundColor: STORE_COLOR }]}>
            <FontAwesome5 name="motorcycle" size={13} color={COLORS.white} />
            <Text style={styles.deliverText}>Dispatch</Text>
          </TouchableOpacity>
        )}
        {item.status === 'completed' && (
          <View style={styles.deliveredBadge}>
            <FontAwesome5 name="check-circle" size={13} color={COLORS.success} />
            <Text style={styles.deliveredText}>Delivered</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            {user?.name || 'Store Dashboard'}
          </Text>
          <Text style={styles.headerSubtitle}>Manage orders & deliveries</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name="bell" size={18} color={COLORS.black} />
          <View style={[styles.notificationDot, { backgroundColor: STORE_COLOR }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusLeft}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOpen ? COLORS.success : COLORS.gray },
            ]}
          />
          <View>
            <Text style={styles.statusTitle}>
              {isOpen ? 'Store Open' : 'Store Closed'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {isOpen ? 'Accepting medicine orders' : 'Not accepting orders'}
            </Text>
          </View>
        </View>
        <Switch
          value={isOpen}
          onValueChange={setIsOpen}
          trackColor={{ false: COLORS.grayMedium, true: STORE_BG }}
          thumbColor={isOpen ? STORE_COLOR : '#f4f3f4'}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: STORE_BG }]}>
          <FontAwesome5 name="clock" size={18} color={STORE_COLOR} />
          <Text style={styles.statNumber}>
            {STORE_ORDERS.filter((o) => o.status === 'pending').length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
          <FontAwesome5 name="box" size={18} color={COLORS.success} />
          <Text style={styles.statNumber}>
            {STORE_ORDERS.filter((o) => o.status === 'confirmed').length}
          </Text>
          <Text style={styles.statLabel}>Ready</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E0F2FE' }]}>
          <FontAwesome5 name="check-double" size={18} color="#0EA5E9" />
          <Text style={styles.statNumber}>
            {STORE_ORDERS.filter((o) => o.status === 'completed').length}
          </Text>
          <Text style={styles.statLabel}>Delivered</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.tabActive, { backgroundColor: STORE_COLOR }]]}
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
            <FontAwesome5 name="pills" size={40} color={COLORS.grayMedium} />
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
  itemIcon: {
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
  itemCount: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: SIZES.sm,
    gap: 6,
  },
  prescriptionText: {
    ...FONTS.caption,
    color: '#DC2626',
    fontWeight: '600',
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
    color: STORE_COLOR,
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
  deliverBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  deliverText: {
    ...FONTS.caption,
    color: COLORS.white,
    fontWeight: '700',
  },
  deliveredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliveredText: {
    ...FONTS.caption,
    color: COLORS.success,
    fontWeight: '600',
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
