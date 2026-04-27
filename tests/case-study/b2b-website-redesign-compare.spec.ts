import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("B2B Website Redesign Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/b2b-website-redesign",
    "b2b-website-redesign"
  );
  
  expect(result.success).toBeTruthy();
});