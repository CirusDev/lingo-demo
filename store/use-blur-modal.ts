import { create } from "zustand"

type BlurModalState = {
  isBlur: boolean
  blurOpen:   () => void
  blurClose:  () => void
}

export const useBlurModal = create<BlurModalState>((set) => ({
  isBlur: false,
  blurOpen:   () => set({ isBlur: true }),
  blurClose:  () => set({ isBlur: false })
}))
