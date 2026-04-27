import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("B2B Web App UX Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/b2b-web-app-ux-design",
    "b2b-web-app-ux-design"
  );
  
  expect(result.success).toBeTruthy();
});
