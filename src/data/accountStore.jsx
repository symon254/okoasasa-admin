import { create } from 'zustand'

export const useAccountStore = create((set) => ({
  personalInfo: {
    firstName: 'James',
    lastName: 'Taylor',
    email: 'JamesTaylor@gmail.com',
    phone: '+254712345678',
    role: 'Employer',
    ID: '123456',
    location: 'London, United Kingdom',
    company: 'Okoa Sasa Ltd',
    employeeId: 'OS12345',
    avatar: null, // <-- NEW: profile photo URL
  },
  addresses: [
    {
      type: 'office',
      street:
        'Okoa Sasa Headquarters Jubilee House, 4th Floor Waiyaki Way, West Lands, Nairobi, Kenya',
      city: 'Nairobi',
      state: 'Nairobi',
      zip: '00100',
      country: 'Kenya',
    },
    {
      type: 'home',
      street: 'House No. 23, Milimani Estate Kisumu, Kenya',
      city: 'Kisumu',
      state: 'Kisumu',
      zip: '40100',
      country: 'Kenya',
    },
  ],
  notifications: {
    transactions: true,
    promotions: false,
    systemUpdates: true,
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),

  updateAvatar: (url) =>
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        avatar: url,
      },
    })),

  updateAddress: (type, address) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.type === type ? { ...addr, ...address } : addr,
      ),
    })),

  toggleNotification: (key) =>
    set((state) => ({
      notifications: {
        ...state.notifications,
        [key]: !state.notifications[key],
      },
    })),
}))
