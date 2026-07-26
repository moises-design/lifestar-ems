// Minimal, dependency-free responsive image: a WebP source with a JPG
// fallback. Explicit width/height on the <img> preserves aspect ratio to
// prevent layout shift; loading/fetchPriority are passed through per use.
export default function Picture({
  src,
  webp,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  className,
}) {
  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  )
}
