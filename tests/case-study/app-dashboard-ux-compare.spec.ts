import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("App Dashboard UX Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/app-dashboard-ux",
    "app-dashboard-ux"
  );
  
  expect(result.success).toBeTruthy();
});