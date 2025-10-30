export const PRODUCT_NAME_BY_CODE = {
  "43722": "Kaspersky Safe Kids for 1 Device 1 Year",
  "43720": "Kaspersky Standard Mobile for 1 Device 1 Year",
  "43728": "Kaspersky Standard Security for 1 Device 1 Year",
  "43726": "Kaspersky Premium Security for 1 Device 1 Year",
};

export function getProductName(code) {
  return PRODUCT_NAME_BY_CODE[String(code)] ?? `Product ${code}`;
}
