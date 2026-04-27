import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("B2B Website Design Agency Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/b2b-website-design-agency",
    "b2b-website-design-agency"
  );
  
  expect(result.success).toBeTruthy();
});