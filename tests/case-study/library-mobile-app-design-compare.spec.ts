import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Library Mobile App Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/library-mobile-app-design",
    "library-mobile-app-design"
  );
  
  expect(result.success).toBeTruthy();
});