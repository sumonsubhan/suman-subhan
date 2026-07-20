export default function validateImage(
  image,
  maxSize = 5 * 1024 * 1024
) {
  if (!image) {
    return {
      success: false,
      message: "Image is required.",
    };
  }

  if (image.size > maxSize) {
    return {
      success: false,
      message: `Image size must be less than ${Math.round(
        maxSize / 1024 / 1024
      )} MB.`,
    };
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(image.type)) {
    return {
      success: false,
      message: "Only JPG, PNG and WEBP images are allowed.",
    };
  }

  return {
    success: true,
  };
}