import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Website UX Redesign Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/website-ux-redesign",
    "website-ux-redesign"
  );
  
  expect(result.success).toBeTruthy();
});