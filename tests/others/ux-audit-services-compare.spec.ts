import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UX Audit Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ux-audit-services",
    "ux-audit-services"
  );
  
  expect(result.success).toBeTruthy();
});