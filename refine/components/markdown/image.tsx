import NextImage, { ImageProps } from "next/image";
import { DetailedHTMLProps, ImgHTMLAttributes, ReactElement } from "react";

type MDXImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

type CustomImageProps = MDXImgProps & {
  src?: string;  // make optional
  alt?: string;  // make optional
  width?: string | number;
  height?: string | number;
} & Partial<Omit<ImageProps, "width" | "height" | "src" | "alt">>;

export default function Image({
  src,
  alt,
  width = 800,
  height = 400,
  ...rest
}: CustomImageProps): ReactElement | null {
  if (!src) {
    // render null or fallback if no src is provided
    return null;
  }

  // parse width/height to numbers if they come as strings
  const widthNum = typeof width === "string" ? parseInt(width, 10) : width;
  const heightNum = typeof height === "string" ? parseInt(height, 10) : height;

  // alt fallback for accessibility (empty string if missing)
  const altText = alt ?? "";

  return (
    <NextImage
      src={src}
      alt={altText}
      width={widthNum}
      height={heightNum}
      unoptimized={process.env.NODE_ENV === "development"}
      {...rest}
    />
  );
}
