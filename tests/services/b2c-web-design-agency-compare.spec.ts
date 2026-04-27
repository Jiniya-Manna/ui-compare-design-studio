import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("B2C Web Design Agency Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/b2c-web-design-agency",
    "b2c-web-design-agency"
  );
  
  expect(result.success).toBeTruthy();
});