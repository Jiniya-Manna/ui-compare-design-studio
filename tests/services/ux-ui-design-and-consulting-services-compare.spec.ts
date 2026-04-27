import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("UX UI Design and Consulting Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/ux-ui-design-and-consulting-services",
    "ux-ui-design-and-consulting-services"
  );
  
  expect(result.success).toBeTruthy();
});