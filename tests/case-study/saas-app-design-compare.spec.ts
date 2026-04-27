import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("SaaS App Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/saas-app-design",
    "saas-app-design"
  );
  
  expect(result.success).toBeTruthy();
});