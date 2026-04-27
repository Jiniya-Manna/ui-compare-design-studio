import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Agriculture Farming App Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/agriculture-farming-app-design",
    "agriculture-farming-app-design"
  );
  
  expect(result.success).toBeTruthy();
});