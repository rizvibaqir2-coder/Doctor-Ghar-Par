import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../constants';

export default function InputField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  error,
  style,
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          error && styles.errorBorder,
          multiline && styles.multiline,
        ]}
      >
        {icon && (
          <FontAwesome5
            name={icon}
            size={16}
            color={isFocused ? COLORS.primary : COLORS.gray}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grayMedium}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <FontAwesome5
              name={isSecure ? 'eye' : 'eye-slash'}
              size={16}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.md,
  },
  label: {
    ...FONTS.bodyBold,
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grayLight,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.md,
    height: 52,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  multiline: {
    height: 'auto',
    minHeight: 100,
    alignItems: 'flex-start',
    paddingVertical: SIZES.sm,
  },
  icon: {
    marginRight: SIZES.sm,
  },
  input: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.black,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  error: {
    ...FONTS.caption,
    color: COLORS.error,
    marginTop: SIZES.xs,
  },
});
