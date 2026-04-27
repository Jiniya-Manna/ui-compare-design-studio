import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("SEO UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/seo-ux-design",
    "seo-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});