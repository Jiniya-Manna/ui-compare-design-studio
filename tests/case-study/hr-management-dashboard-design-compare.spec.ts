import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("HR Management Dashboard Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/hr-management-dashboard-design",
    "hr-management-dashboard-design"
  );
  
  expect(result.success).toBeTruthy();
});