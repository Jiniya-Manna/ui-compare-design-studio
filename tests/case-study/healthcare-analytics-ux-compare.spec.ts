import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Healthcare Analytics UX Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/healthcare-analytics-ux",
    "healthcare-analytics-ux"
  );
  
  expect(result.success).toBeTruthy();
});