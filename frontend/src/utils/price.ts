/**
 * Returns the effective unit price after applying any discount.
 */
export function calculateDiscountedPrice(price: number, discount?: number): number {
  return discount != null && discount > 0 ? price * (1 - discount) : price;
}
