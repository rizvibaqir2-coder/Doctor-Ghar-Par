import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ServiceIcon({ icon, color, bgColor, size = 24 }) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <FontAwesome5 name={icon} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
