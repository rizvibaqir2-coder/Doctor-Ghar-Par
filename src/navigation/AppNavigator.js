import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../constants';
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
const Drawer = createDrawerNavigator();

const PORTALS = [
  { role: 'patient', label: 'Patient', icon: 'user', color: '#0D6EFD', bg: '#E7F1FF' },
  { role: 'provider', label: 'Healthcare Provider', icon: 'user-md', color: '#00C48C', bg: '#E6FAF3' },
  { role: 'lab', label: 'Diagnostic Lab', icon: 'flask', color: '#F59E0B', bg: '#FEF3C7' },
  { role: 'store', label: 'Medical Store', icon: 'store', color: '#10B981', bg: '#D1FAE5' },
  { role: 'specialist', label: 'Specialized Doctor', icon: 'stethoscope', color: '#7C3AED', bg: '#EDE9FE' },
  { role: 'admin', label: 'Admin Dashboard', icon: 'user-shield', color: '#DC2626', bg: '#FEE2E2' },
];

const TAB_STYLE = {
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
};

const TAB_LABEL_STYLE = { fontSize: 11, fontWeight: '600' };

function PatientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyProvidersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marker-alt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
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
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
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
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
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
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
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
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
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
        tabBarStyle: TAB_STYLE,
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: TAB_LABEL_STYLE,
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

function CustomDrawerContent(props) {
  const { user, switchRole, logout } = useAuth();
  const currentRole = user?.role || 'patient';

  return (
    <View style={drawerStyles.container}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.avatarContainer}>
          <FontAwesome5 name="heartbeat" size={24} color={COLORS.white} />
        </View>
        <Text style={drawerStyles.appName}>Doctor Ghar Par</Text>
        <Text style={drawerStyles.tagline}>Ghar Bethay Ilaj</Text>
        <View style={drawerStyles.userInfo}>
          <Text style={drawerStyles.userName}>{user?.name || 'User'}</Text>
          <Text style={drawerStyles.userEmail}>{user?.email || ''}</Text>
        </View>
      </View>

      <ScrollView style={drawerStyles.menuSection} showsVerticalScrollIndicator={false}>
        <Text style={drawerStyles.sectionLabel}>SWITCH PORTAL</Text>
        {PORTALS.map((portal) => {
          const isActive = currentRole === portal.role;
          return (
            <TouchableOpacity
              key={portal.role}
              style={[
                drawerStyles.menuItem,
                isActive && { backgroundColor: portal.bg, borderLeftColor: portal.color, borderLeftWidth: 4 },
              ]}
              onPress={() => {
                switchRole(portal.role);
                props.navigation.closeDrawer();
              }}
              activeOpacity={0.7}
            >
              <View style={[drawerStyles.menuIcon, { backgroundColor: isActive ? portal.color : portal.bg }]}>
                <FontAwesome5 name={portal.icon} size={16} color={isActive ? COLORS.white : portal.color} />
              </View>
              <View style={drawerStyles.menuTextContainer}>
                <Text style={[drawerStyles.menuLabel, isActive && { color: portal.color, fontWeight: '700' }]}>
                  {portal.label}
                </Text>
                {isActive && <Text style={[drawerStyles.activeLabel, { color: portal.color }]}>Active</Text>}
              </View>
              {isActive && (
                <FontAwesome5 name="check-circle" size={16} color={portal.color} solid />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={drawerStyles.footer}>
        <TouchableOpacity style={drawerStyles.logoutButton} onPress={logout}>
          <FontAwesome5 name="sign-out-alt" size={16} color={COLORS.error} />
          <Text style={drawerStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RoleBasedTabs() {
  const { user } = useAuth();
  const role = user?.role;

  if (role === 'provider') return <ProviderTabs />;
  if (role === 'lab') return <LabTabs />;
  if (role === 'store') return <StoreTabs />;
  if (role === 'specialist') return <SpecialistTabs />;
  if (role === 'admin') return <AdminTabs />;
  return <PatientTabs />;
}

function AuthenticatedDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 300,
        },
      }}
    >
      <Drawer.Screen name="MainContent" component={RoleBasedContent} />
    </Drawer.Navigator>
  );
}

function RoleBasedContent() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RoleTabs" component={RoleBasedTabs} />
      {role === 'patient' || !role ? (
        <>
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="BookService" component={BookServiceScreen} />
          <Stack.Screen name="NearbyProviders" component={NearbyProvidersScreen} />
          <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();

  if (user) {
    return <AuthenticatedDrawer />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PatientLogin" component={LoginScreen} />
      <Stack.Screen name="PatientRegister" component={RegisterScreen} />
      <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
      <Stack.Screen name="ProviderRegister" component={ProviderRegisterScreen} />
      <Stack.Screen name="LabLogin" component={LabLoginScreen} />
      <Stack.Screen name="LabRegister" component={LabRegisterScreen} />
      <Stack.Screen name="StoreLogin" component={StoreLoginScreen} />
      <Stack.Screen name="StoreRegister" component={StoreRegisterScreen} />
      <Stack.Screen name="SpecialistLogin" component={SpecialistLoginScreen} />
      <Stack.Screen name="SpecialistRegister" component={SpecialistRegisterScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
    </Stack.Navigator>
  );
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    ...FONTS.h2,
    color: COLORS.white,
    fontSize: 20,
  },
  tagline: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  userInfo: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  userName: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  userEmail: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  menuSection: {
    flex: 1,
    paddingTop: 16,
  },
  sectionLabel: {
    ...FONTS.caption,
    color: COLORS.gray,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  menuLabel: {
    ...FONTS.body,
    fontWeight: '500',
    color: COLORS.black,
  },
  activeLabel: {
    ...FONTS.small,
    fontWeight: '600',
    marginTop: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.grayLight,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  logoutText: {
    ...FONTS.body,
    color: COLORS.error,
    fontWeight: '600',
    marginLeft: 12,
  },
});
