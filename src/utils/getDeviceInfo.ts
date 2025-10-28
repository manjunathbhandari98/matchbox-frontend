/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/getDeviceInfo.ts
export async function getDeviceInfo(): Promise<string> {
  const nav = navigator as any;

  if (nav.userAgentData) {
    const uaData = nav.userAgentData;
    const brands = uaData.brands
      .filter((b: any) => !b.brand.match(/not.?a.?brand/i)) // remove Not-A-Brand variations
      .map((b: any) => b.brand)
      .join(', ');
    const platform = uaData.platform;

    return `${brands} on ${platform}`;
  }

  // Fallback for older browsers
  const ua = navigator.userAgent;
  return parseUserAgent(ua);
}

// Simple fallback parser
function parseUserAgent(ua: string): string {
  if (/windows/i.test(ua)) return "Windows PC";
  if (/mac/i.test(ua)) return "macOS Device";
  if (/android/i.test(ua)) return "Android Device";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS Device";
  if (/linux/i.test(ua)) return "Linux Device";
  return "Unknown Device";
}
