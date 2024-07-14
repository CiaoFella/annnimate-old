import ArrowUpRight from '../static/arrow-up-right.svg?react'
import { colorOptions } from '../type'

interface ButtonProps {
  type: 'cta' | 'fill' | 'outline'
  primaryColor: colorOptions
  secondaryColor?: colorOptions
  url: string
  text: string
  icon?: boolean
}

export default function Button({
  type,
  primaryColor,
  secondaryColor,
  url,
  text,
  icon,
}: ButtonProps) {
  return type === 'cta' ? (
    <a
      href={url}
      className={`btn cta bg-${primaryColor} text-${secondaryColor}`}
    >
      {text}
      <div
        className={`rounded-icon bg-${
          primaryColor === 'accent' ? 'primary' : 'accent'
        } text-${primaryColor === 'accent' ? 'secondary' : 'primary'}`}
      >
        <ArrowUpRight />
      </div>
    </a>
  ) : type === 'fill' ? (
    <a
      href={url}
      className={`btn bg-${primaryColor} text-${
        primaryColor === 'primary' ? 'secondary' : 'primary'
      }`}
    >
      {text}
    </a>
  ) : (
    <a
      href={url}
      className={`btn bg-transparent border border-${primaryColor} text-${primaryColor}`}
    >
      {text}
    </a>
  )
}
