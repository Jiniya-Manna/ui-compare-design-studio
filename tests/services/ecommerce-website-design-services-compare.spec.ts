import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Ecommerce Website Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ecommerce-website-design-services",
    "ecommerce-website-design-services"
  );
  
  expect(result.success).toBeTruthy();
});