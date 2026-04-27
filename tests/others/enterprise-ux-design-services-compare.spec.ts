import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Enterprise UX Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/enterprise-ux-design-services",
    "enterprise-ux-design-services"
  );
  
  expect(result.success).toBeTruthy();
});