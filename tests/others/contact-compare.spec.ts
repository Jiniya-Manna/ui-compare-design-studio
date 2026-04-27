import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Contact Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/contact",
    "contact"
  );
  
  expect(result.success).toBeTruthy();
});