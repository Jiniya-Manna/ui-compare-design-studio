import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Brand Identity Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/brand-identity-design-services",
    "brand-identity-design-services"
  );
  
  expect(result.success).toBeTruthy();
});