import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Banking Mobile App UI UX Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/banking-mobile-app-ui-ux",
    "banking-mobile-app-ui-ux"
  );
  
  expect(result.success).toBeTruthy();
});