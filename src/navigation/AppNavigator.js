import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useAuth } from '../context/AuthContext';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/patient/LoginScreen';
import RegisterScreen from '../screens/patient/RegisterScreen';
import HomeScreen from '../screens/patient/HomeScreen';
import ServiceDetailScreen from '../screens/patient/ServiceDetailScreen';
import BookServiceScreen from '../screens/patient/BookServiceScreen';
import BookingsScreen from '../screens/patient/BookingsScreen';
import ProfileScreen from '../screens/patient/ProfileScreen';
import NearbyProvidersScreen from '../screens/patient/NearbyProvidersScreen';
import ProviderDetailScreen from '../screens/patient/ProviderDetailScreen';

import ProviderLoginScreen from '../screens/provider/ProviderLoginScreen';
import ProviderRegisterScreen from '../screens/provider/ProviderRegisterScreen';
import ProviderDashboardScreen from '../screens/provider/ProviderDashboardScreen';
import ProviderProfileScreen from '../screens/provider/ProviderProfileScreen';
import ProviderEarningsScreen from '../screens/provider/ProviderEarningsScreen';
import PaymentScreen from '../screens/patient/PaymentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PatientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 30,
          paddingTop: 10,
          shadowColor: COLORS.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyProvidersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-check" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ProviderTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 30,
          paddingTop: 10,
          shadowColor: COLORS.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={ProviderDashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="th-large" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={ProviderEarningsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="wallet" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProvProfile"
        component={ProviderProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-md" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="PatientLogin" component={LoginScreen} />
          <Stack.Screen name="PatientRegister" component={RegisterScreen} />
          <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
          <Stack.Screen
            name="ProviderRegister"
            component={ProviderRegisterScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={PatientTabs} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="BookService" component={BookServiceScreen} />
          <Stack.Screen
            name="NearbyProviders"
            component={NearbyProvidersScreen}
          />
          <Stack.Screen
            name="ProviderDetail"
            component={ProviderDetailScreen}
          />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="ProviderTabs" component={ProviderTabs} />
        </>
      )}
    </Stack.Navigator>
  );
}
