import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';

export default function DrawerMenuButton({ color = COLORS.black }) {
  const navigation = useNavigation();

  const openDrawer = () => {
    const parent = navigation.getParent();
    if (parent && parent.openDrawer) {
      parent.openDrawer();
    } else {
      const grandParent = parent?.getParent?.();
      if (grandParent && grandParent.openDrawer) {
        grandParent.openDrawer();
      }
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openDrawer} activeOpacity={0.7}>
      <FontAwesome5 name="bars" size={18} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});
