export const PLATFORM_FEE_PERCENT = 30;

export const PAYMENT_METHODS = [
  {
    id: 'cash',
    name: 'Cash on Service',
    icon: 'money-bill-wave',
    description: 'Pay in cash when the provider arrives',
    color: '#10B981',
    bgColor: '#DCFCE7',
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    icon: 'credit-card',
    description: 'Visa, Mastercard, or any debit card',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  {
    id: 'online',
    name: 'Online Transfer',
    icon: 'university',
    description: 'Bank transfer or mobile wallet (JazzCash, Easypaisa)',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
];

export function calculateFees(servicePrice) {
  const platformFee = Math.round(servicePrice * (PLATFORM_FEE_PERCENT / 100));
  const providerEarnings = servicePrice - platformFee;
  return {
    servicePrice,
    platformFee,
    providerEarnings,
    totalPatientPays: servicePrice,
  };
}

export const PROVIDER_TRANSACTIONS = [
  {
    id: 't1',
    patientName: 'Ali Hassan',
    serviceName: 'Home Doctor Visit',
    date: '2026-05-04',
    servicePrice: 500,
    platformFee: 150,
    providerEarnings: 350,
    paymentMethod: 'cash',
    status: 'paid',
  },
  {
    id: 't2',
    patientName: 'Fatima Noor',
    serviceName: 'Home Doctor Visit',
    date: '2026-05-03',
    servicePrice: 500,
    platformFee: 150,
    providerEarnings: 350,
    paymentMethod: 'online',
    status: 'paid',
  },
  {
    id: 't3',
    patientName: 'Usman Tariq',
    serviceName: 'Home Doctor Visit',
    date: '2026-05-02',
    servicePrice: 500,
    platformFee: 150,
    providerEarnings: 350,
    paymentMethod: 'card',
    status: 'paid',
  },
  {
    id: 't4',
    patientName: 'Sara Khan',
    serviceName: 'Home Doctor Visit',
    date: '2026-05-01',
    servicePrice: 500,
    platformFee: 150,
    providerEarnings: 350,
    paymentMethod: 'cash',
    status: 'pending',
  },
  {
    id: 't5',
    patientName: 'Kamran Ahmed',
    serviceName: 'Home Doctor Visit',
    date: '2026-04-30',
    servicePrice: 500,
    platformFee: 150,
    providerEarnings: 350,
    paymentMethod: 'online',
    status: 'paid',
  },
];

export const PATIENT_PAYMENT_HISTORY = [
  {
    id: 'ph1',
    serviceName: 'Home Doctor Visit',
    providerName: 'Dr. Ahmed Khan',
    date: '2026-05-04',
    amount: 500,
    paymentMethod: 'cash',
    status: 'paid',
    icon: 'stethoscope',
    color: '#0D6EFD',
  },
  {
    id: 'ph2',
    serviceName: 'IV Injection & Drip',
    providerName: 'Nurse Sarah Ali',
    date: '2026-04-28',
    amount: 300,
    paymentMethod: 'online',
    status: 'paid',
    icon: 'syringe',
    color: '#00C48C',
  },
  {
    id: 'ph3',
    serviceName: 'Lab Tests',
    providerName: 'HealthLab Services',
    date: '2026-04-25',
    amount: 200,
    paymentMethod: 'card',
    status: 'paid',
    icon: 'flask',
    color: '#F59E0B',
  },
];
