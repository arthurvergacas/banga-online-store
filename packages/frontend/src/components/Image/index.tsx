import { useState } from 'react';
import Spinner from 'components/Spinner';

interface ImageProps {
  src: string;
  alt: string;

  spinnerClassName?: string;
  imgClassName?: string;
}

export default function Image(props: ImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      {imageLoading && (
        <div className={props.spinnerClassName}>
          <Spinner />
        </div>
      )}

      <img
        src={props.src}
        alt={props.alt}
        loading="lazy"
        className={props.imgClassName}
        style={{ display: imageLoading ? 'none' : undefined }}
        onLoad={() => setImageLoading(false)}
      />
    </>
  );
}
