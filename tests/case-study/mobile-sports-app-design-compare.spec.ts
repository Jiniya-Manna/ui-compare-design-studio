import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Mobile Sports App Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/mobile-sports-app-design",
    "mobile-sports-app-design"
  );
  
  expect(result.success).toBeTruthy();
});