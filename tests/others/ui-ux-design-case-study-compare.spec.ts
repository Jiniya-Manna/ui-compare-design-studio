import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UI UX Design Case Study Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ui-ux-design-case-study",
    "ui-ux-design-case-study"
  );
  
  expect(result.success).toBeTruthy();
});