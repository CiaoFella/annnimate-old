export type colorOptions = 'primary' | 'secondary' | 'accent'

export type StrapiImage = {
  data: ImageData
}

type ImageData = {
  attributes: ImageAttributes
}

type ImageAttributes = {
  name: string
  alternativeText: string
  caption: string
  url: string
}
