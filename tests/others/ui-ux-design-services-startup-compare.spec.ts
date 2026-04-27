import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UI UX Design Services Startup Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ui-ux-design-services-startup",
    "ui-ux-design-services-startup"
  );
  
  expect(result.success).toBeTruthy();
});