import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'
import { ChevronDown } from 'lucide-react'
import ColorPicker from '@/components/ColorPicker'

export default function PopupColorPicker({
  onChange,
  color,
}: {
  onChange: (color: string) => void
  color: string
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-14 w-24 rounded-xl bg-formDark">
          <div className="ml-4 flex h-full basis-[70%] items-center">
            <div
              className="flex h-[55%] w-[70%] rounded-md bg-sidebar"
              style={{ background: `${color}` }}
            ></div>
          </div>
          <div className="mr-4 flex flex-1 items-center">
            <ChevronDown
              size={20}
              className="text-primary/70 dark:text-dark/80"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex-center w-[350px] flex-wrap gap-3"
      >
        <ColorPicker
          colorState={color}
          onChange={(color) => {
            onChange(color)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}