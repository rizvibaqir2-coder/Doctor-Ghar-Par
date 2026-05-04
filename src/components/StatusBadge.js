import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const STATUS_CONFIG = {
  confirmed: { color: COLORS.success, bg: '#DCFCE7', label: 'Confirmed' },
  pending: { color: COLORS.warning, bg: '#FEF3C7', label: 'Pending' },
  completed: { color: COLORS.info, bg: '#DBEAFE', label: 'Completed' },
  cancelled: { color: COLORS.error, bg: '#FEE2E2', label: 'Cancelled' },
  in_progress: { color: COLORS.primary, bg: COLORS.primaryLight, label: 'In Progress' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    ...FONTS.caption,
    fontWeight: '600',
  },
});
