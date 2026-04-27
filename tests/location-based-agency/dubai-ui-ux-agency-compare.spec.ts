import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Dubai UI UX Agency Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/dubai-ui-ux-agency",
    "dubai-ui-ux-agency"
  );
  
  expect(result.success).toBeTruthy();
});