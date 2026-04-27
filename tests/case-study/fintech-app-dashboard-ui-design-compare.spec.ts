import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("FinTech App Dashboard UI Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/fintech-app-dashboard-ui-design",
    "fintech-app-dashboard-ui-design"
  );
  
  expect(result.success).toBeTruthy();
});