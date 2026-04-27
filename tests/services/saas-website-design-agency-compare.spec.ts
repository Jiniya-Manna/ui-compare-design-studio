import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("SaaS Website Design Agency Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/saas-website-design-agency",
    "saas-website-design-agency"
  );
  
  expect(result.success).toBeTruthy();
});