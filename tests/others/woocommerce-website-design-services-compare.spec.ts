import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("WooCommerce Website Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/woocommerce-website-design-services",
    "woocommerce-website-design-services"
  );
  
  expect(result.success).toBeTruthy();
});