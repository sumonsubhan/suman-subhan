export default function getEmbedUrl(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    if (parsed.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${parsed.pathname.split("/")[2]}`;
    }

    const id = parsed.searchParams.get("v");

    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}
