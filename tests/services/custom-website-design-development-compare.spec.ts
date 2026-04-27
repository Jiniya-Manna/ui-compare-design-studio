import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Custom Website Design Development Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/custom-website-design-development",
    "custom-website-design-development"
  );
  
  expect(result.success).toBeTruthy();
});