import { create } from 'zustand'

interface ImageOptionsState {
  imageSize: string
  setImageSize: (imageSize: string) => void

  imageRoundness: number
  setImageRoundness: (imageRoundness: number) => void

  imageShadow: string
  setImageShadow: (imageShadow: string) => void

  shadowName: string
  setShadowName: (shadowName: string) => void

  shadowColor: string
  setShadowColor: (shadowColor: string) => void

  borderSize: string | null
  setBorderSize: (borderSize: string | null) => void

  borderColor: string
  setBorderColor: (borderColor: string) => void

  rotate: string
  setRotate: (rotate: string) => void

  accordionOpen: {
    appearanceOpen: boolean
    shadowOpen: boolean
    borderOpen: boolean
  }
  setAccordionOpen: (accordionOpen: {
    appearanceOpen: boolean
    shadowOpen: boolean
    borderOpen: boolean
  }) => void

  images: { id: number; image: string }[]
  setImages: (images: { id: number; image: string }[]) => void

  selectedImage: number
  setSelectedImage: (selectedImage: number) => void
}

export const useImageOptions = create<ImageOptionsState>()((set) => ({
  imageSize: '1',
  setImageSize: (imageSize) => set({ imageSize }),

  imageRoundness: 0.7, // in rem
  setImageRoundness: (imageRoundness) => set({ imageRoundness }),

  imageShadow: '0 25px 50px -12px var(--shadow)',
  setImageShadow: (imageShadow) => set({ imageShadow }),

  shadowName: 'Bottom',
  setShadowName: (shadowName) => set({ shadowName }),

  shadowColor: '#00000030',
  setShadowColor: (shadowColor) => set({ shadowColor }),

  borderSize: '0',
  setBorderSize: (borderSize) => set({ borderSize }),

  borderColor: '#ffffff50',
  setBorderColor: (borderColor) => set({ borderColor }),

  accordionOpen: { appearanceOpen: true, shadowOpen: false, borderOpen: false },
  setAccordionOpen: (accordionOpen) => set({ accordionOpen }),

  rotate: '0',
  setRotate: (rotate) => set({ rotate }),

  images: [],
  setImages: (images) => set({ images }),

  selectedImage: 0,
  setSelectedImage: (selectedImage) => set({ selectedImage }),
}))
