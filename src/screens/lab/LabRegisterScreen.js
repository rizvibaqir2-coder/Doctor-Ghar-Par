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

const LAB_COLOR = '#F59E0B';
const LAB_BG = '#FEF3C7';

const TEST_CATEGORIES = [
  { id: 'blood', name: 'Blood Tests', icon: 'tint' },
  { id: 'urine', name: 'Urine Tests', icon: 'flask' },
  { id: 'thyroid', name: 'Thyroid Tests', icon: 'diagnoses' },
  { id: 'liver', name: 'Liver Function', icon: 'procedures' },
  { id: 'kidney', name: 'Kidney Function', icon: 'kidneys' },
  { id: 'cardiac', name: 'Cardiac Tests', icon: 'heartbeat' },
  { id: 'covid', name: 'COVID-19 Tests', icon: 'virus' },
  { id: 'xray', name: 'X-Ray & Imaging', icon: 'x-ray' },
];

export default function LabRegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedTests, setSelectedTests] = useState([]);
  const [formData, setFormData] = useState({
    labName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    address: '',
    city: '',
    operatingHours: '',
    homeSampleCollection: true,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTest = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((t) => t !== testId)
        : [...prev, testId]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.labName || !formData.ownerName || !formData.email || !formData.phone || !formData.password) {
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
    if (!formData.licenseNumber) {
      Alert.alert('Error', 'Lab license number is required');
      return;
    }
    Alert.alert(
      'Registration Submitted!',
      'Your lab registration is under review. We will verify your credentials and notify you once approved.',
      [{ text: 'OK', onPress: () => navigation.navigate('LabLogin') }]
    );
  };

  const renderLabInfo = () => (
    <View>
      <InputField
        label="Lab Name *"
        icon="flask"
        placeholder="Enter your lab name"
        value={formData.labName}
        onChangeText={(v) => updateField('labName', v)}
      />
      <InputField
        label="Owner / Manager Name *"
        icon="user"
        placeholder="Enter owner name"
        value={formData.ownerName}
        onChangeText={(v) => updateField('ownerName', v)}
      />
      <InputField
        label="Email Address *"
        icon="envelope"
        placeholder="Enter lab email"
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

  const renderLabDetails = () => (
    <View>
      <InputField
        label="Lab License Number *"
        icon="id-card"
        placeholder="Enter lab license number"
        value={formData.licenseNumber}
        onChangeText={(v) => updateField('licenseNumber', v)}
      />
      <InputField
        label="Lab Address *"
        icon="map-marker-alt"
        placeholder="Enter lab address"
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
        placeholder="E.g., 8:00 AM - 10:00 PM"
        value={formData.operatingHours}
        onChangeText={(v) => updateField('operatingHours', v)}
      />

      <Text style={styles.testCategoryTitle}>Test Categories Offered</Text>
      <View style={styles.testGrid}>
        {TEST_CATEGORIES.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={[
              styles.testChip,
              selectedTests.includes(test.id) && styles.testChipActive,
            ]}
            onPress={() => toggleTest(test.id)}
          >
            <FontAwesome5
              name={test.icon}
              size={14}
              color={selectedTests.includes(test.id) ? COLORS.white : LAB_COLOR}
            />
            <Text
              style={[
                styles.testChipText,
                selectedTests.includes(test.id) && styles.testChipTextActive,
              ]}
            >
              {test.name}
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
          <Text style={styles.headerTitle}>Lab Registration</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(step / 2) * 100}%` }]} />
          </View>
          <Text style={styles.stepText}>Step {step} of 2</Text>
        </View>

        <View style={styles.stepHeader}>
          <View style={[styles.stepIcon, { backgroundColor: LAB_BG }]}>
            <FontAwesome5
              name={step === 1 ? 'flask' : 'clipboard-list'}
              size={20}
              color={LAB_COLOR}
            />
          </View>
          <Text style={styles.stepTitle}>
            {step === 1 ? 'Lab Information' : 'Lab Details & Services'}
          </Text>
          <Text style={styles.stepSubtitle}>
            {step === 1
              ? 'Enter your lab basic details'
              : 'Add license, address, and test categories'}
          </Text>
        </View>

        {step === 1 ? renderLabInfo() : renderLabDetails()}

        <Button
          title={step === 2 ? 'Submit Registration' : 'Next'}
          onPress={step === 2 ? handleRegister : handleNext}
          style={[styles.nextButton, { backgroundColor: LAB_COLOR }]}
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
    backgroundColor: LAB_COLOR,
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
  testCategoryTitle: {
    ...FONTS.h4,
    color: COLORS.black,
    marginTop: SIZES.md,
    marginBottom: SIZES.sm,
  },
  testGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  testChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LAB_BG,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  testChipActive: {
    backgroundColor: LAB_COLOR,
  },
  testChipText: {
    ...FONTS.caption,
    color: LAB_COLOR,
    fontWeight: '600',
  },
  testChipTextActive: {
    color: COLORS.white,
  },
  nextButton: {
    marginTop: SIZES.xl,
  },
});
