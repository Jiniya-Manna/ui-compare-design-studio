import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Website Branding Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/website-branding-design",
    "website-branding-design"
  );
  
  expect(result.success).toBeTruthy();
});