# Doctor Ghar Par - Ghar Bethay Ilaj

A React Native (Expo) mobile app for booking medical home services in Pakistan. Patients can find nearby healthcare providers and book doctors, nurses, lab tests, X-rays, wound dressing, catheterization, palliative care and more — all delivered to their doorstep.

## Features

### Patient App
- **Welcome Screen** - Bilingual (Urdu/English) landing with Patient and Provider portals
- **Authentication** - Login and registration for patients
- **Home Dashboard** - Browse all 9 medical services with ratings and pricing
- **Service Booking** - Select date, time, and address; add notes for the provider
- **Nearby Providers** - Foodpanda-style view showing nearby doctors, nurses, and technicians sorted by distance, rating, or price
- **Provider Details** - View provider qualifications, reviews, experience, and availability
- **Payment System** - Cash, credit/debit card, or online transfer (JazzCash, Easypaisa)
- **Fee Breakdown** - Transparent display of service fee, platform fee, and provider earnings
- **My Bookings** - Track booking status (Pending, Confirmed, Completed)
- **Profile Management** - Edit profile, view medical records, payment methods

### Provider Portal
- **Provider Registration** - Multi-step registration with role selection (Doctor, Nurse, Lab Technician, X-Ray Technician, Physiotherapist, Wound Care Specialist, Palliative Care Specialist)
- **Provider Login** - Separate authentication for healthcare providers
- **Dashboard** - View and manage assigned patient bookings, accept/decline requests
- **Availability Toggle** - Go online/offline to control visibility to patients
- **Earnings Dashboard** - Revenue breakdown showing total earnings, platform fees (30%), and net payouts
- **Transaction History** - Detailed view of every transaction with payment method and status
- **Profile & Credentials** - Manage qualifications, availability schedule, and professional details

### Revenue Sharing System
- Platform charges a configurable commission (default 30%) on each booking
- Provider receives the remaining amount (e.g., Rs 500 service - Rs 150 platform fee = Rs 350 to provider)
- Visual breakdown showing platform share vs. provider share
- Support for Cash, Card, and Online payment methods

## Services Offered
1. Home Doctor Visit
2. IV Injection & Drip Therapy
3. Lab Tests (Blood, Urine, Thyroid, etc.)
4. X-Ray at Home (Portable)
5. Nursing Care (Elderly care, post-surgery)
6. Physiotherapy (Rehab, sports injury, mobility)
7. Wound Dressing (Surgical, burns, diabetic wounds)
8. Catheterization (Insertion, removal, management)
9. Palliative Care (Pain management, comfort care, family support)

## Tech Stack
- **React Native** with **Expo SDK 54**
- **React Navigation** (Native Stack + Bottom Tabs)
- **Context API** for state management
- **FontAwesome 5** icons

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/rizvibaqir2-coder/DoctorGharPar.git
cd DoctorGharPar

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device
- Scan the QR code with **Expo Go** (Android) or Camera app (iOS)
- Press `w` to open in web browser
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

## Project Structure

```
src/
  components/       # Reusable UI components (Button, InputField, ServiceIcon, StatusBadge)
  constants/         # Theme colors, services data, provider data, payment config
  context/           # AuthContext for user state management
  navigation/        # App navigator with patient and provider tab flows
  screens/
    patient/         # Patient screens (Home, Bookings, Profile, NearbyProviders, Payment, etc.)
    provider/        # Provider screens (Dashboard, Earnings, Profile, Registration)
  WelcomeScreen.js   # Landing screen with patient/provider selection
```

## License
MIT
