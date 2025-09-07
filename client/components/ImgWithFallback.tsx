import React, { useState } from "react";

interface ImgWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function ImgWithFallback({
  fallback = "/placeholder.svg",
  onError,
  ...props
}: ImgWithFallbackProps) {
  const [src, setSrc] = useState(props.src);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      {...props}
      src={src}
      onError={(e) => {
        if (src !== fallback) {
          setSrc(fallback);
        }
        if (onError) onError(e as any);
      }}
    />
  );
}
