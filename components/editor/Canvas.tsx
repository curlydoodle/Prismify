'use client'

import { useImageQualityStore } from '@/store/use-image-quality'
import { useResizeCanvas } from '@/store/use-resize-canvas'
import React, { CSSProperties, useEffect, useRef } from 'react'
import ImageUpload from './ImageUpload'

import FloatingOptions from '@/components/FloatingOptions'
import { useBackgroundOptions } from '@/store/use-background-options'
import { useImageOptions } from '@/store/use-image-options'
import TipTap from './Tiptap'
import Noise from './Noise'
import { useActiveIndexStore } from '@/store/use-active-index'
import CanvasOptions from '@/components/editor/CanvasOptions/CanvasOptions'
import ImageOptions from '@/components/editor/ImageOptions/ImageOptions'
import BackgroundOptions from '@/components/editor/BackgroundOptions/BackgroundOptions'
import FrameOptions from '@/components/editor/FrameOptions/FrameOptions'
import TextOptions from '@/components/editor/TextOptions/TextOptions'
import PerspectiveOptions from '@/components/editor/PerspectiveOptions/PerspectiveOptions'
import PositionOptions from '@/components/editor/PositionOptions/PositionOptions'
import useStore from '@/hooks/use-store'
import { ScrollArea } from '../ui/ScrollArea'
import MoveableComponent from './MoveableComponent'
import { useMoveable } from '@/store/use-moveable'
import SelectoComponent from './SelectoComponent'

export default function Canvas() {
  const activeIndex = useStore(
    useActiveIndexStore,
    (state) => state.activeIndex
  )
  const { quality } = useImageQualityStore()
  const { backgroundType, imageBackground, attribution } =
    useBackgroundOptions()
  const {
    resolution,
    setDomResolution,
    exactDomResolution,
    setExactDomResolution,
    scrollScale,
    setScrollScale,
    canvasRoundness,
    setScaleFactor,
    setShouldFloat,
  } = useResizeCanvas()
  const { images, initialImageUploaded, selectedImage } = useImageOptions()
  const screenshotRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const { showControls } = useMoveable()

  const [width, height]: number[] = resolution.split('x').map(Number)

  const aspectRatio = width / height
  console.log(`Current DOM resoltion: ${exactDomResolution}`)
  let style: CSSProperties = {
    aspectRatio,
    backgroundImage: !initialImageUploaded
      ? 'linear-gradient(0deg, #131313, #151515 100%)'
      : `var(--gradient-bg)`,

    borderRadius: `${canvasRoundness}rem`,
  }

  if (backgroundType === 'mesh') {
    style = {
      ...style,
      backgroundColor: `var(--mesh-bg)`,
    }
  }

  if (backgroundType === 'solid') {
    style = {
      ...style,
      backgroundColor: `var(--solid-bg)`,
    }
  }

  if (aspectRatio < 1) {
    style = { ...style, width: 'auto', height: '100%' }
  } else if (aspectRatio >= 0.95 && aspectRatio <= 1.1) {
    const containerSize = '86vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio, but had overflow issue so 84vmin (it just makes it a bit smaller)
    style = {
      ...style,
      width: containerSize,
    }
  } else if (aspectRatio >= 0.9 && aspectRatio <= 1.4) {
    const containerSize = '100vmin'
    // const containerSize = '100vmin' // 100vmin will make it fit within the viewport while maintaining aspect ratio
    style = {
      ...style,
      width: containerSize,
    }
  } else if (aspectRatio > 1) {
    style = { ...style, width: '100%', height: 'auto' }
  }

  useEffect(() => {
    const element = screenshotRef.current

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width: domWidth, height: domHeight } = entry.contentRect
          const dynamicScaleFactor = width / domWidth
          setScaleFactor(dynamicScaleFactor)
          setExactDomResolution(`${domWidth}x${domHeight}`)
          setDomResolution(
            `${domWidth * dynamicScaleFactor * quality}x${
              domHeight * dynamicScaleFactor * quality
            }`
          )
          // if (aspectRatio >= 0 && aspectRatio <= 1.75) {
          //   setShouldFloat(true)
          // } else {
          //   setShouldFloat(false)
          // }
          if (aspectRatio <= 1.1) {
            setShouldFloat(true)
          } else {
            setShouldFloat(false)
          }
        }
      })

      resizeObserver.observe(element)

      return () => {
        resizeObserver.unobserve(element)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolution, quality])

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) return
    if (e.deltaY < 0) {
      // Scrolling up
      if (scrollScale === 1) return
      setScrollScale(scrollScale + 0.1) // Increment the scroll scale by 0.1
    } else if (e.deltaY > 0) {
      // Scrolling down
      if (scrollScale <= 0.4) return
      setScrollScale(scrollScale - 0.1) // Decrement the scroll scale by 0.1
    }
  }

  let parentScaleStyle = {
    scale: `${scrollScale}`,
  }

  console.log(`SelectedImage : - ${selectedImage}`)

  return (
    <>
      <section
        ref={parentRef}
        className="relative flex h-full flex-1 items-start justify-center overflow-hidden bg-[#161616] px-6 py-4 pt-5"
      >
        {/* <div className="flex h-14 w-full items-center border border-border">
          TODO: ADD UPPER SETTINGS
        </div> */}
        <div
          onWheel={handleScroll}
          style={parentScaleStyle}
          className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden"
        >
          <div
            className={
              'canvas-container relative flex max-h-[15rem] min-h-[15rem] w-full items-center justify-center overflow-hidden md:max-h-full '
            }
            ref={screenshotRef}
            id="canvas-container"
            style={style}
          >
            <Noise />
            {initialImageUploaded && imageBackground && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                draggable={false}
                className={`h-full w-full object-cover`}
                src={imageBackground}
                alt="background image"
              />
            )}
            <TipTap />
            {showControls && <MoveableComponent id={`${selectedImage}`} />}

            <div className="selecto-area absolute flex h-full min-h-[15rem] w-full items-center justify-center">
              <ImageUpload />
            </div>
          </div>
          <ScrollArea className="mt-6 w-full" type="auto">
            <div className="w-full max-w-[90%] md:hidden">
              {activeIndex === 0 && <CanvasOptions />}
              {activeIndex === 1 && <ImageOptions />}
              {activeIndex === 2 && <BackgroundOptions />}
              {activeIndex === 3 && <FrameOptions />}
              {activeIndex === 4 && <TextOptions />}
              {activeIndex === 5 && <PerspectiveOptions />}
              {activeIndex === 6 && <PositionOptions />}
            </div>
          </ScrollArea>
        </div>
        <SelectoComponent />
        <FloatingOptions />
      </section>

      {attribution.name !== null && (
        <div className="absolute bottom-2 right-4 rounded-md bg-sidebar/80 p-2 text-[0.85rem] text-dark/70 backdrop-blur-md">
          Img by{' '}
          <a
            className="text-blue-500"
            href={`https://unsplash.com/@${attribution.link}?utm_source=Prismify&utm_medium=referral`}
          >
            {attribution.name}
          </a>{' '}
          on{' '}
          <a
            className="underline underline-offset-2"
            href="https://unsplash.com/?utm_source=Prismify&utm_medium=referral"
          >
            Unsplash
          </a>
        </div>
      )}
    </>
  )
}
