import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UX Research Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ux-research-services",
    "ux-research-services"
  );
  
  expect(result.success).toBeTruthy();
});