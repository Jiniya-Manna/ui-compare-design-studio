import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Custom Shopify Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/custom-shopify-website-design",
    "custom-shopify-website-design"
  );
  
  expect(result.success).toBeTruthy();
});