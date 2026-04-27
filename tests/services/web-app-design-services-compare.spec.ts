import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("Web App Design Services Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/web-app-design-services",
    "web-app-design-services"
  );
  
  expect(result.success).toBeTruthy();
});