import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";


type DemoProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  webmSrc?: string;
  mp4Src?: string;
  imageSrc?: string;
  alt: string;
};

export const Demo = (props: DemoProps) => {
  const { webmSrc, mp4Src, imageSrc, alt, ...divProps } = props;

  const isVideo = webmSrc || mp4Src;

  return (
    <div
      {...divProps}
      className={twMerge(
        "relative col w-full justify-center max-w-2xl overflow-hidden shadow-lg round-rect",
        divProps.className
      )}
    >
      {isVideo ? (
        <video autoPlay loop muted playsInline aria-label={alt} tabIndex={-1}>
          {/* Need both for Safari compatibility */}
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      ) : (
        <img src={imageSrc} alt={alt} className="w-full h-auto" />
      )}
    </div>
  );
};
