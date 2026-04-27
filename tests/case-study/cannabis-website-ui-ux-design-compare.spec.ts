import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Cannabis Website UI UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/cannabis-website-ui-ux-design",
    "cannabis-website-ui-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});