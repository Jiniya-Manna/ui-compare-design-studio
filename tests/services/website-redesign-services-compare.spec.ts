import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Website Redesign Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/website-redesign-services",
    "website-redesign-services"
  );
  
  expect(result.success).toBeTruthy();
});