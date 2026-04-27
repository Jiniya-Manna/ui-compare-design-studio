import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Ecommerce Website UX Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/ecommerce-website-ux",
    "ecommerce-website-ux"
  );
  
  expect(result.success).toBeTruthy();
});