import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Blog Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/blog",
    "blog"
  );
  
  expect(result.success).toBeTruthy();
});