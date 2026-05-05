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

import LabLoginScreen from '../screens/lab/LabLoginScreen';
import LabRegisterScreen from '../screens/lab/LabRegisterScreen';
import LabDashboardScreen from '../screens/lab/LabDashboardScreen';
import LabEarningsScreen from '../screens/lab/LabEarningsScreen';
import LabProfileScreen from '../screens/lab/LabProfileScreen';

import StoreLoginScreen from '../screens/store/StoreLoginScreen';
import StoreRegisterScreen from '../screens/store/StoreRegisterScreen';
import StoreDashboardScreen from '../screens/store/StoreDashboardScreen';
import StoreEarningsScreen from '../screens/store/StoreEarningsScreen';
import StoreProfileScreen from '../screens/store/StoreProfileScreen';

import SpecialistLoginScreen from '../screens/specialist/SpecialistLoginScreen';
import SpecialistRegisterScreen from '../screens/specialist/SpecialistRegisterScreen';
import SpecialistDashboardScreen from '../screens/specialist/SpecialistDashboardScreen';
import SpecialistEarningsScreen from '../screens/specialist/SpecialistEarningsScreen';
import SpecialistProfileScreen from '../screens/specialist/SpecialistProfileScreen';

import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

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

function LabTabs() {
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
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="LabDashboard"
        component={LabDashboardScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clipboard-list" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LabEarnings"
        component={LabEarningsScreen}
        options={{
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="wallet" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LabProfile"
        component={LabProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="flask" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StoreTabs() {
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
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="StoreDashboard"
        component={StoreDashboardScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="boxes" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StoreEarnings"
        component={StoreEarningsScreen}
        options={{
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="wallet" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StoreProfile"
        component={StoreProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="store" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SpecialistTabs() {
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
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="SpecialistDashboard"
        component={SpecialistDashboardScreen}
        options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SpecialistEarnings"
        component={SpecialistEarningsScreen}
        options={{
          tabBarLabel: 'Earnings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="wallet" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SpecialistProfile"
        component={SpecialistProfileScreen}
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

function AdminTabs() {
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
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chart-pie" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-shield" size={20} color={color} />
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
          <Stack.Screen name="LabLogin" component={LabLoginScreen} />
          <Stack.Screen name="LabRegister" component={LabRegisterScreen} />
          <Stack.Screen name="StoreLogin" component={StoreLoginScreen} />
          <Stack.Screen name="StoreRegister" component={StoreRegisterScreen} />
          <Stack.Screen name="SpecialistLogin" component={SpecialistLoginScreen} />
          <Stack.Screen name="SpecialistRegister" component={SpecialistRegisterScreen} />
          <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        </>
      ) : user.role === 'provider' ? (
        <>
          <Stack.Screen name="ProviderTabs" component={ProviderTabs} />
        </>
      ) : user.role === 'lab' ? (
        <>
          <Stack.Screen name="LabTabs" component={LabTabs} />
        </>
      ) : user.role === 'store' ? (
        <>
          <Stack.Screen name="StoreTabs" component={StoreTabs} />
        </>
      ) : user.role === 'specialist' ? (
        <>
          <Stack.Screen name="SpecialistTabs" component={SpecialistTabs} />
        </>
      ) : user.role === 'admin' ? (
        <>
          <Stack.Screen name="AdminTabs" component={AdminTabs} />
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
        </>
      )}
    </Stack.Navigator>
  );
}
