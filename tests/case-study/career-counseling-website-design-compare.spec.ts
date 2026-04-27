import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Career Counseling Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/career-counseling-website-design",
    "career-counseling-website-design"
  );
  
  expect(result.success).toBeTruthy();
});