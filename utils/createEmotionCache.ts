import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

/**
 * Instructions:
 * On the client side, create a meta tag at the top of the <head> and set it as insertionPoint.
 * This makes MUI styles loads first.
 * @returns EmotionCache
 */
export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
}