import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Custom WordPress Website Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/custom-wordpress-website-design-services",
    "custom-wordpress-website-design-services"
  );
  
  expect(result.success).toBeTruthy();
});