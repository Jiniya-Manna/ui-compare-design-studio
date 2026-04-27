import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("AI SaaS Website Redesign Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/ai-saas-website-redesign",
    "ai-saas-website-redesign"
  );
  
  expect(result.success).toBeTruthy();
});