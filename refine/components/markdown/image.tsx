import { ComponentProps } from "react";
import NextImage from "next/image";


interface Props extends Omit<ComponentProps<typeof NextImage>, "width" | "height"> {
  width?: string | number;
  height?: string | number;
}

export default function Image({
  src,
  alt = "alt",
  width = 800,
  height = 350,
  ...props
}: Props) {
  if (!src) return null;

  const widthNum = typeof width === "string" ? parseInt(width, 10) : width;
  const heightNum = typeof height === "string" ? parseInt(height, 10) : height;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={widthNum}
      height={heightNum}
      quality={40}
      // Remove unoptimized for production to enable Next.js optimization
      {...props}
    />
  );
}
