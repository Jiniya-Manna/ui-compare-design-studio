import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Energy Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/energy-website-design",
    "energy-website-design"
  );
  
  expect(result.success).toBeTruthy();
});