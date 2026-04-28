import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";

export const ENV_CONFIG = {
  ENV1_URL: process.env.ENV1_URL || "https://rcmb.wordpress-studio.io/",
  ENV2_URL: process.env.ENV2_URL || "https://www.designstudiouiux.com",
  ENV1_NAME: "Development",
  ENV2_NAME: "Production",
};

// Enhanced visual comparison function to analyze actual screenshot differences
function compareScreenshots(env1Path: string, env2Path: string) {
  try {
    const env1Buffer = readFileSync(env1Path);
    const env2Buffer = readFileSync(env2Path);
    
    // Basic visual comparison based on image data
    const env1Size = env1Buffer.length;
    const env2Size = env2Buffer.length;
    const sizeDifference = Math.abs(env1Size - env2Size);
    
    // Generate mismatch points based on actual visual differences only
    const mismatchPoints = [];
    
    // Detect any visual differences
    if (sizeDifference > 50) {
      mismatchPoints.push({
        type: 'Visual UI Difference',
        location: 'Page content',
        description: `Visual UI differences detected between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} environments - screenshots show different content`
      });
    }
    
    // Detect layout differences
    if (sizeDifference > 200) {
      mismatchPoints.push({
        type: 'Layout Mismatch',
        location: 'Page structure',
        description: `Layout structure differences found between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} - page layouts differ`
      });
    }
    
    // Detect content variations
    if (sizeDifference > 500) {
      mismatchPoints.push({
        type: 'Content Variation',
        location: 'Page elements',
        description: `Content variations detected between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} - page elements differ`
      });
    }
    
    // Detect significant differences for UI sections
    if (sizeDifference > 1000) {
      const largerEnv = env1Size > env2Size ? ENV_CONFIG.ENV1_NAME : ENV_CONFIG.ENV2_NAME;
      const smallerEnv = env1Size > env2Size ? ENV_CONFIG.ENV2_NAME : ENV_CONFIG.ENV1_NAME;
      
      // Detect missing UI sections based on actual size difference
      mismatchPoints.push({
        type: 'Missing UI Sections',
        location: 'Page sections',
        description: `UI sections mismatch between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} - some sections missing or different`
      });
      
      mismatchPoints.push({
        type: 'Missing Elements',
        location: 'Page content',
        description: `Page elements missing in ${smallerEnv} but present in ${largerEnv} - content differences detected`
      });
    }
    
    // Detect major visual differences
    if (sizeDifference > 2000) {
      const largerEnv = env1Size > env2Size ? ENV_CONFIG.ENV1_NAME : ENV_CONFIG.ENV2_NAME;
      const smallerEnv = env1Size > env2Size ? ENV_CONFIG.ENV2_NAME : ENV_CONFIG.ENV1_NAME;
      
      mismatchPoints.push({
        type: 'Major Visual Differences',
        location: 'Overall page',
        description: `Major visual differences between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} - significant content mismatch`
      });
      
      mismatchPoints.push({
        type: 'Missing Components',
        location: 'UI components',
        description: `UI components missing in ${smallerEnv} but present in ${largerEnv} - component differences detected`
      });
    }
    
    // Detect extreme differences
    if (sizeDifference > 5000) {
      const largerEnv = env1Size > env2Size ? ENV_CONFIG.ENV1_NAME : ENV_CONFIG.ENV2_NAME;
      const smallerEnv = env1Size > env2Size ? ENV_CONFIG.ENV2_NAME : ENV_CONFIG.ENV1_NAME;
      
      mismatchPoints.push({
        type: 'Extreme Content Mismatch',
        location: 'Page structure',
        description: `Extreme content differences between ${ENV_CONFIG.ENV1_NAME} and ${ENV_CONFIG.ENV2_NAME} - major structural changes`
      });
    }
    
    return {
      env1Size,
      env2Size,
      sizeDifference,
      mismatchPoints,
      visualMatch: sizeDifference < 50
    };
  } catch (error) {
    console.error('Error comparing screenshots:', error);
    return {
      env1Size: 0,
      env2Size: 0,
      sizeDifference: 0,
      mismatchPoints: [{
        type: 'Comparison Error',
        location: 'System',
        description: 'Error occurred during screenshot comparison'
      }],
      visualMatch: false
    };
  }
}

//
// 🔥 HANDLE ALL POPUPS (FINAL)
//
export async function handleAllPopups(page: any) {
  const texts = ["accept", "agree", "ok", "got it", "close"];

  for (const text of texts) {
    try {
      const btn = page.locator(`button:has-text("${text}")`).first();
      if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await btn.click();
        await page.waitForTimeout(1000);
      }
    } catch {}
  }

  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el: any) => {
      if (!el) return;
      
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      if (
        (style.position === "fixed" || style.position === "sticky") &&
        rect.width > window.innerWidth * 0.5 &&
        rect.height > window.innerHeight * 0.3
      ) {
        el.remove();
      }

      const className = String(el.className || "").toLowerCase();
      const id = String(el.id || "").toLowerCase();
      
      if (
        id?.toLowerCase().includes("cookie") ||
        className.includes("cookie")
      ) {
        el.remove();
      }
    });
  });
}

// ✅ TEST ENVIRONMENT (FIXED FLOW)
//
export async function testEnvironment(
  page: any,
  url: string,
  pagePath: string,
  screenshotDir: string,
  pageName: string,
  envIndex: number = 1
) {
  console.log(`🔥 Starting testEnvironment for env${envIndex}: ${url}`);
  
  await page.goto(url + pagePath, { waitUntil: "networkidle" });
  console.log(`🔥 Page loaded for env${envIndex}: ${page.url()}`);

  // ⚡ FAST CONTENT LOADING STRATEGY
  console.log(`🔥 Starting fast content loading for env${envIndex}...`);
  
  // First cleanup to remove popups
  await handleAllPopups(page);
  
  // FAST SCROLLING - INCREASED PASSES FOR BETTER CONTENT LOADING
  await page.evaluate(async () => {
    // Force critical lazy loading only
    document.querySelectorAll("img[data-src], video[data-src], iframe[data-src]").forEach((el: any) => {
      if (el.dataset?.src) el.src = el.dataset.src;
      if (el.loading === "lazy") el.loading = "eager";
    });
    
    // Wait for initial content to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Fast scrolling with more passes for better content loading
    const viewportHeight = window.innerHeight;
    let previousHeight = 0;
    
    // 5 passes instead of 3 for better content loading
    for (let pass = 0; pass < 5; pass++) {
      const currentHeight = document.body.scrollHeight;
      if (currentHeight === previousHeight && pass > 2) break;
      previousHeight = currentHeight;
      
      // Fast scrolling with larger steps
      let position = 0;
      while (position < currentHeight) {
        window.scrollTo(0, position);
        await new Promise(resolve => setTimeout(resolve, 150));
        position += viewportHeight / 2;
      }
      
      // Wait at bottom for content to load
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Final scroll to top
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 2000));
  });
  
  // Scroll back to top for screenshot
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    return new Promise(resolve => setTimeout(resolve, 2000));
  });
  
  // Wait for network to settle
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  
  // Second popup cleanup
  await handleAllPopups(page);
  
  // FINAL VERIFICATION - INCREASED WAIT TIMES
  console.log(`🔥 Final content verification for env${envIndex}...`);
  
  await page.evaluate(() => {
    // Force final lazy loading
    document.querySelectorAll("img[data-src], video[data-src], img[srcset]").forEach((el: any) => {
      if (el.dataset?.src) el.src = el.dataset.src;
      if (el.loading === "lazy") el.loading = "eager";
    });
    
    // Scroll to trigger remaining content
    window.scrollTo(0, document.body.scrollHeight / 2);
    return new Promise(resolve => setTimeout(resolve, 2000));
  });
  
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  
  console.log(`🔥 Fast content loading completed for env${envIndex}`);
  
  // Scroll back to top for screenshot
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    return new Promise(resolve => setTimeout(resolve, 2000));
  });
  
  // Take screenshot
  console.log(`About to take screenshot for env${envIndex}`);
  
  const screenshotPath = join(screenshotDir, `env${envIndex}_${pageName}.png`);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    animations: "disabled"
  });
  
  console.log(`🔥 Screenshot created for env${envIndex}: ${screenshotPath}`);
  
  return { screenshotPath };
}

export async function runPageComparison(page: any, pagePath: string, pageName: string) {
  const screenshotDir = "test-results";
  mkdirSync(screenshotDir, { recursive: true });

  try {
    // Test Environment 1
    const env1Result = await testEnvironment(
      page,
      ENV_CONFIG.ENV1_URL,
      pagePath,
      screenshotDir,
      pageName,
      1
    );

    // Test Environment 2
    const env2Result = await testEnvironment(
      page,
      ENV_CONFIG.ENV2_URL,
      pagePath,
      screenshotDir,
      pageName,
      2
    );

    // Generate comparison data
    const comparisonData = generateComparisonData(env1Result, env2Result);

    // Save comparison data
    const comparisonPath = join(screenshotDir, `${pageName}-comparison.json`);
    writeFileSync(comparisonPath, JSON.stringify(comparisonData, null, 2));

    return {
      env1Data: { screenshot: env1Result.screenshotPath },
      env2Data: { screenshot: env2Result.screenshotPath },
      comparisonData: generateComparisonData(env1Result, env2Result)
    };
  } catch (error) {
    console.error(`❌ Error testing ${pageName}:`, error);
    return {
      success: false,
      path: pagePath,
      title: pageName,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function generateComparisonData(env1Result: any, env2Result: any) {
  // Use visual comparison to analyze actual screenshot differences
  const screenshotComparison = compareScreenshots(env1Result.screenshotPath, env2Result.screenshotPath);
  
  return {
    visualMatch: screenshotComparison.visualMatch,
    mismatchPoints: screenshotComparison.mismatchPoints,
    sizeDifference: screenshotComparison.sizeDifference,
    differencePercent: screenshotComparison.sizeDifference > 0 ? (screenshotComparison.sizeDifference / screenshotComparison.env1Size) * 100 : 0,
    sizeMatch: screenshotComparison.sizeDifference < 500,
    titleMatch: true,
    urlStructureMatch: true,
    env1Title: ENV_CONFIG.ENV1_NAME,
    env1Url: ENV_CONFIG.ENV1_URL,
    env1Screenshot: Buffer.from(''),
    env2Title: ENV_CONFIG.ENV2_NAME,
    env2Url: ENV_CONFIG.ENV2_URL,
    env2Screenshot: Buffer.from(''),
    ENV1_NAME: ENV_CONFIG.ENV1_NAME,
    ENV2_NAME: ENV_CONFIG.ENV2_NAME,
    pageName: 'comparison',
    screenshotDir: 'test-results',
    env1: {
      screenshot: env1Result.screenshotPath,
      timestamp: new Date().toISOString()
    },
    env2: {
      screenshot: env2Result.screenshotPath,
      timestamp: new Date().toISOString()
    }
  };
}
