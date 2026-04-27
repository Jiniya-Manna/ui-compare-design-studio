import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../../utils/ui-comparison-utils";

test("AR VR Website Design Comparison", async ({ page }) => {
  const result = await runPageComparison(
    page,
    "/case-study/ar-vr-website-design",
    "ar-vr-website-design"
  );
  
  expect(result.success).toBeTruthy();
});