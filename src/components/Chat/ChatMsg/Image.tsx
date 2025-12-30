import { useState } from 'react'
import { Skeleton } from '@mui/material'
import { styled } from '@mui/material/styles'

const ImageSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  height: 150,
  width: 250,
}))

const getAlt = (image: string) => {
  const alt = image.split('/').at(-1)
  return alt
}

function Image({ imageUrl, ...props }: { imageUrl: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imageLoading, setImageLoading] = useState(!!imageUrl)

  const handleImageClick = () => {
    window.open(imageUrl, '_blank')
  }
  return (
    <div style={{ borderRadius: 8, overflow: 'hidden' }} onClick={handleImageClick}>
      {imageUrl && imageLoading && <ImageSkeleton variant="rectangular" animation="wave" />}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={getAlt(imageUrl)}
          style={{
            width: '100%',
            maxWidth: 250,
            maxHeight: 350,
            cursor: 'pointer',
            display: imageLoading ? 'none' : 'block',
          }}
          onLoad={() => setImageLoading(false)}
          {...props}
        />
      )}
    </div>
  )
}

export default Image
