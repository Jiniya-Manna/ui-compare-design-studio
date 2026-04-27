import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Enterprise Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/enterprise-website-design",
    "enterprise-website-design"
  );
  
  expect(result.success).toBeTruthy();
});