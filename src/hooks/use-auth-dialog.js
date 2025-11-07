import { create } from 'zustand'

export const useAuthDialog = create((set) => ({
  isOpen: false,
  initialStep: 'login',
  openLogin: () => set({ isOpen: true, initialStep: 'login' }),
  openOTP: () => set({ isOpen: true, initialStep: 'otp' }),
  close: () => set({ isOpen: false }),
}))
