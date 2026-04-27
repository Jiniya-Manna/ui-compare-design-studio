import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Ecommerce Website Redesign Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ecommerce-website-redesign-services",
    "ecommerce-website-redesign-services"
  );
  
  expect(result.success).toBeTruthy();
});