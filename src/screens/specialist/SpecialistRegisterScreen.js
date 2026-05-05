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

const SPEC_COLOR = '#7C3AED';
const SPEC_BG = '#EDE9FE';

const DOCTOR_CATEGORIES = [
  { id: 'medical_officer', name: 'Medical Officer', icon: 'user-md', fee: 'Rs 1,500 / visit' },
  { id: 'general_physician', name: 'General Physician', icon: 'stethoscope', fee: 'Rs 2,500 / visit' },
  { id: 'cardiologist', name: 'Cardiologist', icon: 'heartbeat', fee: 'Rs 3,500 / visit' },
  { id: 'neurologist', name: 'Neurologist', icon: 'brain', fee: 'Rs 4,000 / visit' },
  { id: 'orthopedic', name: 'Orthopedic Surgeon', icon: 'bone', fee: 'Rs 3,500 / visit' },
  { id: 'dermatologist', name: 'Dermatologist', icon: 'allergies', fee: 'Rs 3,000 / visit' },
  { id: 'pediatrician', name: 'Pediatrician', icon: 'baby', fee: 'Rs 3,000 / visit' },
  { id: 'gynecologist', name: 'Gynecologist', icon: 'female', fee: 'Rs 4,000 / visit' },
  { id: 'ent', name: 'ENT Specialist', icon: 'head-side-cough', fee: 'Rs 3,000 / visit' },
  { id: 'pulmonologist', name: 'Pulmonologist', icon: 'lungs', fee: 'Rs 4,000 / visit' },
  { id: 'gastro', name: 'Gastroenterologist', icon: 'procedures', fee: 'Rs 4,500 / visit' },
  { id: 'senior_specialist', name: 'Senior Specialist / Professor', icon: 'user-graduate', fee: 'Rs 5,000 / visit' },
];

export default function SpecialistRegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    pmcNumber: '',
    qualification: '',
    experience: '',
    address: '',
    city: '',
    availableHours: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
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
    if (!formData.pmcNumber) {
      Alert.alert('Error', 'PMC registration number is required');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select your doctor category');
      return;
    }
    Alert.alert(
      'Registration Submitted!',
      'Your registration is under review. We will verify your PMC credentials and notify you once approved.',
      [{ text: 'OK', onPress: () => navigation.navigate('SpecialistLogin') }]
    );
  };

  const renderDoctorInfo = () => (
    <View>
      <InputField
        label="Full Name *"
        icon="user-md"
        placeholder="Dr. Muhammad Ahmed"
        value={formData.fullName}
        onChangeText={(v) => updateField('fullName', v)}
      />
      <InputField
        label="Email Address *"
        icon="envelope"
        placeholder="Enter your email"
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

  const renderProfessionalDetails = () => (
    <View>
      <InputField
        label="PMC Registration Number *"
        icon="id-card"
        placeholder="Enter PMC number"
        value={formData.pmcNumber}
        onChangeText={(v) => updateField('pmcNumber', v)}
      />
      <InputField
        label="Qualification *"
        icon="graduation-cap"
        placeholder="E.g., MBBS, FCPS, MD"
        value={formData.qualification}
        onChangeText={(v) => updateField('qualification', v)}
      />
      <InputField
        label="Years of Experience"
        icon="briefcase-medical"
        placeholder="E.g., 5 years"
        value={formData.experience}
        onChangeText={(v) => updateField('experience', v)}
      />
      <InputField
        label="Clinic / Hospital Address"
        icon="map-marker-alt"
        placeholder="Enter your practice address"
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
        label="Available Hours for Home Visits"
        icon="clock"
        placeholder="E.g., 6:00 PM - 10:00 PM"
        value={formData.availableHours}
        onChangeText={(v) => updateField('availableHours', v)}
      />

      <Text style={styles.categoryTitle}>Select Your Category *</Text>
      <Text style={styles.categorySubtitle}>Your home visit fee is based on your category</Text>
      <View style={styles.categoryGrid}>
        {DOCTOR_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              selectedCategory === cat.id && styles.categoryCardSelected,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <FontAwesome5
              name={cat.icon}
              size={20}
              color={selectedCategory === cat.id ? COLORS.white : SPEC_COLOR}
            />
            <Text
              style={[
                styles.categoryName,
                selectedCategory === cat.id && styles.categoryNameSelected,
              ]}
            >
              {cat.name}
            </Text>
            <Text
              style={[
                styles.categoryFee,
                selectedCategory === cat.id && styles.categoryFeeSelected,
              ]}
            >
              {cat.fee}
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}
        >
          <FontAwesome5 name="arrow-left" size={18} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-md" size={28} color={SPEC_COLOR} />
          </View>
          <Text style={styles.title}>Doctor Registration</Text>
          <Text style={styles.subtitle}>
            {step === 1
              ? 'Step 1: Personal Information'
              : 'Step 2: Professional Details & Category'}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: step === 1 ? '50%' : '100%' }]} />
          </View>
        </View>

        {step === 1 ? renderDoctorInfo() : renderProfessionalDetails()}

        <Button
          title={step === 1 ? 'Next' : 'Submit Registration'}
          onPress={step === 1 ? handleNext : handleRegister}
          style={[styles.submitButton, { backgroundColor: SPEC_COLOR }]}
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
    paddingBottom: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: SPEC_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.grayLight,
    borderRadius: 2,
    marginTop: SIZES.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: SPEC_COLOR,
    borderRadius: 2,
  },
  categoryTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginTop: SIZES.lg,
    marginBottom: 4,
  },
  categorySubtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    marginBottom: SIZES.md,
    fontSize: 13,
  },
  categoryGrid: {
    gap: SIZES.sm,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayLight,
    gap: SIZES.sm,
  },
  categoryCardSelected: {
    backgroundColor: SPEC_COLOR,
    borderColor: SPEC_COLOR,
  },
  categoryName: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    flex: 1,
  },
  categoryNameSelected: {
    color: COLORS.white,
  },
  categoryFee: {
    ...FONTS.bodyBold,
    color: SPEC_COLOR,
    fontSize: 13,
  },
  categoryFeeSelected: {
    color: COLORS.white,
  },
  submitButton: {
    marginTop: SIZES.xl,
    marginBottom: SIZES.lg,
  },
});
