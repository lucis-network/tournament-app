import NextImage, { ImageProps } from 'next/image'

type OptimizeOption = {
  src: string,
  width: number,
  quality: number,
}
const localNoOptimizeLoader = ({ src, width, quality }: OptimizeOption): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '/'
  return `${baseUrl}/${src}?w=${width}&q=${quality || 75}`
}

const Image = (props: ImageProps) => {
  // @ts-ignore
  return <NextImage unoptimized loader={localNoOptimizeLoader} {...props} />
}

export default Image
