import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("About Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/about",
    "about"
  );
  
  expect(result.success).toBeTruthy();
});