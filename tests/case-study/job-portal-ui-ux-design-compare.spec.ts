import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Job Portal UI UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/job-portal-ui-ux-design",
    "job-portal-ui-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});