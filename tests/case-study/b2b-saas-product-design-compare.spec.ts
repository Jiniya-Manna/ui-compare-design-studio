import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("B2B SaaS Product Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/b2b-saas-product-design",
    "b2b-saas-product-design"
  );
  
  expect(result.success).toBeTruthy();
});