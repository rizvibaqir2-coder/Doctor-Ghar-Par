import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { COLORS, SIZES, FONTS } from '../../constants';

const STORE_COLOR = '#10B981';
const STORE_BG = '#D1FAE5';

const STORE_SERVICES = [
  { id: 'prescription', name: 'Prescription Medicines', icon: 'prescription' },
  { id: 'otc', name: 'OTC Medicines', icon: 'pills' },
  { id: 'surgical', name: 'Surgical Items', icon: 'cut' },
  { id: 'baby', name: 'Baby Products', icon: 'baby' },
  { id: 'personal', name: 'Personal Care', icon: 'pump-soap' },
  { id: 'devices', name: 'Medical Devices', icon: 'thermometer' },
  { id: 'supplements', name: 'Vitamins & Supplements', icon: 'capsules' },
  { id: 'delivery', name: 'Home Delivery', icon: 'motorcycle' },
];

export default function StoreRegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    drugLicense: '',
    address: '',
    city: '',
    operatingHours: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.storeName || !formData.ownerName || !formData.email || !formData.phone || !formData.password) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleRegister = () => {
    if (!formData.licenseNumber || !formData.drugLicense) {
      Alert.alert('Error', 'License numbers are required');
      return;
    }
    Alert.alert(
      'Registration Submitted!',
      'Your medical store registration is under review. We will verify your licenses and notify you once approved.',
      [{ text: 'OK', onPress: () => navigation.navigate('StoreLogin') }]
    );
  };

  const renderStoreInfo = () => (
    <View>
      <InputField
        label="Store Name *"
        icon="store"
        placeholder="Enter your store name"
        value={formData.storeName}
        onChangeText={(v) => updateField('storeName', v)}
      />
      <InputField
        label="Owner Name *"
        icon="user"
        placeholder="Enter owner name"
        value={formData.ownerName}
        onChangeText={(v) => updateField('ownerName', v)}
      />
      <InputField
        label="Email Address *"
        icon="envelope"
        placeholder="Enter store email"
        value={formData.email}
        onChangeText={(v) => updateField('email', v)}
        keyboardType="email-address"
      />
      <InputField
        label="Phone Number *"
        icon="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChangeText={(v) => updateField('phone', v)}
        keyboardType="phone-pad"
      />
      <InputField
        label="Password *"
        icon="lock"
        placeholder="Create a password"
        value={formData.password}
        onChangeText={(v) => updateField('password', v)}
        secureTextEntry
      />
      <InputField
        label="Confirm Password *"
        icon="lock"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChangeText={(v) => updateField('confirmPassword', v)}
        secureTextEntry
      />
    </View>
  );

  const renderStoreDetails = () => (
    <View>
      <InputField
        label="Business License Number *"
        icon="id-card"
        placeholder="Enter business license number"
        value={formData.licenseNumber}
        onChangeText={(v) => updateField('licenseNumber', v)}
      />
      <InputField
        label="Drug License Number *"
        icon="file-medical"
        placeholder="Enter drug license number"
        value={formData.drugLicense}
        onChangeText={(v) => updateField('drugLicense', v)}
      />
      <InputField
        label="Store Address *"
        icon="map-marker-alt"
        placeholder="Enter store address"
        value={formData.address}
        onChangeText={(v) => updateField('address', v)}
      />
      <InputField
        label="City *"
        icon="city"
        placeholder="E.g., Karachi, Lahore, Islamabad"
        value={formData.city}
        onChangeText={(v) => updateField('city', v)}
      />
      <InputField
        label="Operating Hours"
        icon="clock"
        placeholder="E.g., 8:00 AM - 11:00 PM"
        value={formData.operatingHours}
        onChangeText={(v) => updateField('operatingHours', v)}
      />

      <Text style={styles.serviceTitle}>Services Offered</Text>
      <View style={styles.serviceGrid}>
        {STORE_SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceChip,
              selectedServices.includes(service.id) && styles.serviceChipActive,
            ]}
            onPress={() => toggleService(service.id)}
          >
            <FontAwesome5
              name={service.icon}
              size={14}
              color={selectedServices.includes(service.id) ? COLORS.white : STORE_COLOR}
            />
            <Text
              style={[
                styles.serviceChipText,
                selectedServices.includes(service.id) && styles.serviceChipTextActive,
              ]}
            >
              {service.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
          >
            <FontAwesome5 name="arrow-left" size={18} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Store Registration</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
          </View>
          <Text style={styles.stepText}>Step {step} of 2</Text>
        </View>

        <View style={styles.stepHeader}>
          <View style={[styles.stepIcon, { backgroundColor: STORE_BG }]}>
            <FontAwesome5
              name={step === 1 ? 'store' : 'clipboard-list'}
              size={20}
              color={STORE_COLOR}
            />
          </View>
          <Text style={styles.stepTitle}>
            {step === 1 ? 'Store Information' : 'License & Services'}
          </Text>
          <Text style={styles.stepSubtitle}>
            {step === 1
              ? 'Enter your store basic details'
              : 'Add licenses, address, and services offered'}
          </Text>
        </View>

        {step === 1 ? renderStoreInfo() : renderStoreDetails()}

        <Button
          title={step === 2 ? 'Submit Registration' : 'Next'}
          onPress={step === 2 ? handleRegister : handleNext}
          style={[styles.nextButton, { backgroundColor: STORE_COLOR }]}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
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
  progressContainer: {
    marginBottom: SIZES.lg,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: STORE_COLOR,
    borderRadius: 3,
  },
  stepText: {
    ...FONTS.caption,
    color: COLORS.gray,
    textAlign: 'right',
    marginTop: 4,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  stepIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  stepTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  stepSubtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    marginTop: 4,
  },
  serviceTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginTop: SIZES.md,
    marginBottom: SIZES.sm,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: STORE_BG,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  serviceChipActive: {
    backgroundColor: STORE_COLOR,
  },
  serviceChipText: {
    ...FONTS.caption,
    color: STORE_COLOR,
    fontWeight: '600',
  },
  serviceChipTextActive: {
    color: COLORS.white,
  },
  nextButton: {
    marginTop: SIZES.xl,
  },
});
