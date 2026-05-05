import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../components/Button';
import { COLORS, SIZES, FONTS } from '../constants';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <FontAwesome5 name="heartbeat" size={40} color={COLORS.white} />
          </View>
          <Text style={styles.logoText}>Doctor Ghar Par</Text>
          <Text style={styles.logoSubtext}>Ghar Bethay Ilaj</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <FontAwesome5 name="hospital-user" size={80} color={COLORS.primary} />
          </View>
          <View style={[styles.floatingIcon, styles.floatingIcon1]}>
            <FontAwesome5 name="syringe" size={20} color={COLORS.secondary} />
          </View>
          <View style={[styles.floatingIcon, styles.floatingIcon2]}>
            <FontAwesome5 name="stethoscope" size={20} color={COLORS.primary} />
          </View>
          <View style={[styles.floatingIcon, styles.floatingIcon3]}>
            <FontAwesome5 name="flask" size={20} color="#F59E0B" />
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.title}>Ghar Bethay Doctor Ki Sahulat</Text>
        <Text style={styles.subtitle}>
          Doctor, nurse, lab test, X-ray aur bohat kuch — ab ghar par
          milega. Book karein aur chain se ilaj karwayein.
        </Text>

        <View style={styles.buttonGroup}>
          <Button
            title="I'm a Patient"
            onPress={() => navigation.navigate('PatientLogin')}
            style={styles.patientButton}
          />
          <Button
            title="I'm a Healthcare Provider"
            onPress={() => navigation.navigate('ProviderLogin')}
            variant="outline"
            style={styles.providerButton}
          />
          <Button
            title="I'm a Lab"
            onPress={() => navigation.navigate('LabLogin')}
            variant="outline"
            style={styles.labButton}
          />
          <Button
            title="I'm a Medical Store"
            onPress={() => navigation.navigate('StoreLogin')}
            variant="outline"
            style={styles.storeButton}
          />
          <Button
            title="I'm a Specialized Doctor"
            onPress={() => navigation.navigate('SpecialistLogin')}
            variant="outline"
            style={styles.specialistButton}
          />
          <Button
            title="Admin Dashboard"
            onPress={() => navigation.navigate('AdminLogin')}
            variant="outline"
            style={styles.adminButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    ...FONTS.h1,
    color: COLORS.primary,
    fontSize: 32,
  },
  logoSubtext: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 4,
  },
  illustrationContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingIcon1: {
    top: 10,
    right: 10,
  },
  floatingIcon2: {
    bottom: 20,
    left: 0,
  },
  floatingIcon3: {
    top: 40,
    left: 10,
  },
  bottomSection: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 50,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SIZES.xl,
    paddingHorizontal: SIZES.md,
  },
  buttonGroup: {
    gap: SIZES.sm,
  },
  patientButton: {
    marginBottom: SIZES.sm,
  },
  providerButton: {},
  labButton: {
    borderColor: '#F59E0B',
  },
  storeButton: {
    borderColor: '#10B981',
  },
  specialistButton: {
    borderColor: '#7C3AED',
  },
  adminButton: {
    borderColor: '#DC2626',
  },
});
