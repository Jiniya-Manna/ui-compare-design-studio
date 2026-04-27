import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Dashboard UI UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/dashboard-ui-ux-design",
    "dashboard-ui-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});