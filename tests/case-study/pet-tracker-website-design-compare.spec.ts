import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Pet Tracker Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/pet-tracker-website-design",
    "pet-tracker-website-design"
  );
  
  expect(result.success).toBeTruthy();
});