'use client'

import {
  Dribbble,
  Facebook,
  GalleryThumbnails,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  UserSquare2,
  Youtube,
  GalleryHorizontalEnd,
  MonitorPlay,
  Smartphone,
  GalleryVerticalEnd,
  RectangleHorizontal,
} from 'lucide-react'
import { resolutions } from '@/utils/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { useResizeCanvas } from '@/hooks/use-resize-canvas'
import { Separator } from '@/components/ui/Separator'
import { ResolutionButton } from './ResolutionButton'
import RoundnessSettings from './RoundnessSettings'

const icons = {
  Youtube: <Youtube size={18} />,
  Instagram: <Instagram size={18} />,
  Facebook: <Facebook size={18} />,
  Linkedin: <Linkedin size={18} />,
  Twitter: <Twitter size={18} />,
  Dribble: <Dribbble size={18} />,
  UserSquare2: <UserSquare2 size={18} />,
  GalleryThumbnails: <GalleryThumbnails size={18} />,
  GalleryHorizontalEnd: <GalleryHorizontalEnd size={18} />,
  MonitorPlay: <MonitorPlay size={18} />,
  Smartphone: <Smartphone size={18} />,
  GalleryVerticalEnd: <GalleryVerticalEnd size={18} />,
  RectangleHorizontal: <RectangleHorizontal size={18} />,
}

const splitResolution = (resolution: string) => resolution.split('x')

export default function CanvasOptions() {
  const { resolution, domResolution } = useResizeCanvas()

  const [width, height] = splitResolution(domResolution)

  return (
    <>
      <h1 className="mb-3 mt-4 px-1 text-[0.85rem]">Current Resolution</h1>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="w-full rounded-lg border border-border bg-formDark px-4 py-2 text-sm ">
          {width}
        </div>
        <span className="mx-2 my-auto">x</span>
        <div className="w-full rounded-lg border border-border bg-formDark px-4 py-2 text-sm ">
          {height}
        </div>
      </div>

      <h1 className="mb-3 mt-8 px-1 text-[0.85rem]">Aspect ratio</h1>
      <div className="flex flex-wrap gap-3">
        {resolutions.slice(0, 7).map((res, index) => (
          <ResolutionButton
            key={index}
            resolution={res.resolution}
            name={res.name}
            icon={icons[res.icon as keyof typeof icons]}
            variant={res.resolution === resolution ? 'stylish' : 'outline'}
            className="rounded-lg"
          />
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={`flex items-center gap-2 rounded-lg`}
              variant="outline"
            >
              <span>
                <Plus size={20} />
              </span>
              <span>More...</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-[350px] flex-wrap gap-3">
            {resolutions.slice(7).map((res, index) => (
              <ResolutionButton
                key={index}
                resolution={res.resolution}
                name={res.name}
                icon={icons[res.icon as keyof typeof icons]}
                variant={res.resolution === resolution ? 'stylish' : 'outline'}
                className="rounded-lg"
              />
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <Separator className="mt-8 h-[0.1rem] w-full" />

      <RoundnessSettings />
    </>
  )
}