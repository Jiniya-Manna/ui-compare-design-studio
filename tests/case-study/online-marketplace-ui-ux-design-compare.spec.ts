import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Online Marketplace UI UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/online-marketplace-ui-ux-design",
    "online-marketplace-ui-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});