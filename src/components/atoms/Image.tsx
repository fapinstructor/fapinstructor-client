export type ImageProps = {
  alt: string;
  src: string;
};

export default function Image({ alt, src }: ImageProps) {
  return (
    <img
      style={{ objectFit: "contain", width: "100%", height: "100%" }}
      alt={alt}
      src={src}
    />
  );
}
