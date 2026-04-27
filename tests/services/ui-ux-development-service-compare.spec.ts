import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UI UX Development Service Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ui-ux-development-service",
    "ui-ux-development-service"
  );
  
  expect(result.success).toBeTruthy();
});