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
import { COLORS, SIZES, FONTS, PROVIDER_ROLES } from '../../constants';

export default function ProviderRegisterScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
    experience: '',
    qualifications: '',
    bio: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !selectedRole) {
      Alert.alert('Error', 'Please select your role');
      return;
    }
    if (step === 2) {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
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
      Alert.alert('Error', 'License number is required');
      return;
    }
    Alert.alert(
      'Registration Submitted!',
      'Your registration is under review. We will verify your credentials and notify you once approved.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ProviderLogin'),
        },
      ]
    );
  };

  const renderRoleSelection = () => (
    <View style={styles.roleGrid}>
      {PROVIDER_ROLES.map((role) => (
        <TouchableOpacity
          key={role.id}
          style={[
            styles.roleCard,
            selectedRole === role.id && {
              borderColor: role.color,
              borderWidth: 2,
            },
          ]}
          onPress={() => setSelectedRole(role.id)}
        >
          <View style={[styles.roleIcon, { backgroundColor: role.bgColor }]}>
            <FontAwesome5 name={role.icon} size={24} color={role.color} />
          </View>
          <Text style={styles.roleName}>{role.name}</Text>
          <Text style={styles.roleDesc} numberOfLines={2}>
            {role.description}
          </Text>
          {selectedRole === role.id && (
            <View style={[styles.checkBadge, { backgroundColor: role.color }]}>
              <FontAwesome5 name="check" size={10} color={COLORS.white} />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPersonalInfo = () => (
    <View>
      <InputField
        label="Full Name *"
        icon="user"
        placeholder="Enter your full name"
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
        placeholder="Enter your phone number"
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

  const renderProfessionalInfo = () => (
    <View>
      <InputField
        label="License / Registration Number *"
        icon="id-card"
        placeholder="Enter your license number"
        value={formData.licenseNumber}
        onChangeText={(v) => updateField('licenseNumber', v)}
      />
      <InputField
        label="Specialization"
        icon="briefcase-medical"
        placeholder="E.g., General Practice, Pediatrics"
        value={formData.specialization}
        onChangeText={(v) => updateField('specialization', v)}
      />
      <InputField
        label="Years of Experience"
        icon="award"
        placeholder="E.g., 5"
        value={formData.experience}
        onChangeText={(v) => updateField('experience', v)}
        keyboardType="numeric"
      />
      <InputField
        label="Qualifications"
        icon="graduation-cap"
        placeholder="E.g., MBBS, MD, RN"
        value={formData.qualifications}
        onChangeText={(v) => updateField('qualifications', v)}
      />
      <InputField
        label="Bio / About You"
        icon="pen"
        placeholder="Write a brief description about yourself..."
        value={formData.bio}
        onChangeText={(v) => updateField('bio', v)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  const stepTitles = [
    'Select Your Role',
    'Personal Information',
    'Professional Details',
  ];

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
            onPress={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                navigation.goBack();
              }
            }}
          >
            <FontAwesome5 name="arrow-left" size={18} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step {step} of 3</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-md" size={28} color={COLORS.secondary} />
          </View>
          <Text style={styles.title}>{stepTitles[step - 1]}</Text>
          <Text style={styles.subtitle}>
            {step === 1 && 'Choose the role that best describes your profession'}
            {step === 2 && 'Fill in your personal details to create your account'}
            {step === 3 && 'Add your professional credentials and qualifications'}
          </Text>
        </View>

        {step === 1 && renderRoleSelection()}
        {step === 2 && renderPersonalInfo()}
        {step === 3 && renderProfessionalInfo()}

        <Button
          title={step === 3 ? 'Submit Registration' : 'Continue'}
          onPress={step === 3 ? handleRegister : handleNext}
          style={styles.continueButton}
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
  stepIndicator: {
    ...FONTS.bodyBold,
    color: COLORS.secondary,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.grayLight,
    borderRadius: 2,
    marginBottom: SIZES.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: COLORS.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginBottom: SIZES.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  roleGrid: {
    gap: SIZES.sm,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  roleName: {
    ...FONTS.h4,
    color: COLORS.black,
    flex: 1,
  },
  roleDesc: {
    ...FONTS.caption,
    color: COLORS.gray,
    position: 'absolute',
    bottom: 12,
    left: 88,
    right: 40,
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    marginTop: SIZES.xl,
    backgroundColor: COLORS.secondary,
  },
});
