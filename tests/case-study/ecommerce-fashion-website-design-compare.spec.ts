import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Ecommerce Fashion Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/ecommerce-fashion-website-design",
    "ecommerce-fashion-website-design"
  );
  
  expect(result.success).toBeTruthy();
});