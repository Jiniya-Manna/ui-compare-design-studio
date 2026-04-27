import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Enterprise UI UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/enterprise-ui-ux-design",
    "enterprise-ui-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});