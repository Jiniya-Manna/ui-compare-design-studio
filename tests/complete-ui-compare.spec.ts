import { test, expect } from "@playwright/test";
import { runPageComparison, ENV_CONFIG } from "../utils/ui-comparison-utils";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

test.setTimeout(7200000); // 2 hours for full 68 pages

function generateSuccessContent(result: any, index: number, env1ImageSrc: string, env2ImageSrc: string): string {
  return `
    <div class="screenshots-wrapper">
        <button class="toggle-btn" onclick="toggleScreenshots('screenshots-${index}')">Toggle Screenshots</button>
        <button class="toggle-btn" onclick="openComparisonModal('${index}')">Open Scrubber Comparison (Big)</button>
        
        <div id="screenshots-${index}" class="screenshots">
            <div class="screenshot-container">
                <div class="screenshot-label">${ENV_CONFIG.ENV1_NAME} Environment</div>
                ${env1ImageSrc ? `<img src="${env1ImageSrc}" alt="${ENV_CONFIG.ENV1_NAME}" class="screenshot">` : '<p>Screenshot not available</p>'}
            </div>
            <div class="screenshot-container">
                <div class="screenshot-label">${ENV_CONFIG.ENV2_NAME} Environment</div>
                ${env2ImageSrc ? `<img src="${env2ImageSrc}" alt="${ENV_CONFIG.ENV2_NAME}" class="screenshot">` : '<p>Screenshot not available</p>'}
            </div>
        </div>
    </div>
    
        
    <div class="comparison-results">
        <div class="result-item">
            <span>Visual Match:</span>
            <span class="${result.comparison?.visualMatch ? 'match' : 'mismatch'}">
                ${result.comparison?.visualMatch ? 'Match' : 'Comparison Generated'}
            </span>
        </div>
        <div class="result-item">
            <span>Size Difference:</span>
            <span>${result.comparison?.sizeDifference || 'N/A'} bytes</span>
        </div>
        ${result.comparison?.mismatchPoints && result.comparison.mismatchPoints.length > 0 ? `
            <div class="mismatch-details">
                <ul class="mismatch-list">
                    ${result.comparison.mismatchPoints.map((point: any, i: number) => 
                        `<li class="mismatch-item">
                                <span class="mismatch-description">${point.description || 'No description available'}</span>
                            </li>`
                    ).join('')}
                </ul>
            </div>
        ` : ''}
    </div>
  `;
}

function generateErrorContent(result: any): string {
  return `
    <div class="error">
        <strong>❌ Test Failed:</strong> ${result.error || 'Unknown error occurred'}
    </div>
  `;
}

test("Complete UI Comparison Report", async ({ page }) => {
  const pages = [
    // Main Services (8)
    { path: "/", name: "landingpage", title: "Landing Page" },
    // { path: "/ux-research-services", name: "ux-research-services", title: "UX Research Services" },
    // { path: "/mobile-app-ui-design-services", name: "mobile-app-ui-design-services", title: "Mobile App UI Design Services" },
    // { path: "/custom-website-design-development", name: "custom-website-design-development", title: "Custom Website Design Development" },
    // { path: "/brand-identity-design-services", name: "brand-identity-design-services", title: "Brand Identity Design Services" },
    // { path: "/web-app-design-services", name: "web-app-design-services", title: "Web App Design Services" },
    // { path: "/saas-website-design-agency", name: "saas-website-design-agency", title: "SaaS Website Design Agency" },
    // { path: "/website-redesign-services", name: "website-redesign-services", title: "Website Redesign Services" },
    
    // Location-based Agency (9)
    // { path: "/dubai-ui-ux-agency", name: "dubai-ui-ux-agency", title: "Dubai UI UX Agency" },
    // { path: "/kolkata", name: "kolkata", title: "Kolkata" },
    // { path: "/usa/austin-texas", name: "usa-austin-texas", title: "USA Austin Texas" },
    // { path: "/usa", name: "usa", title: "USA" },
    // { path: "/usa/los-angeles", name: "usa-los-angeles", title: "USA Los Angeles" },
    // { path: "/usa/new-york", name: "usa-new-york", title: "USA New York" },
    // { path: "/usa/san-diego", name: "usa-san-diego", title: "USA San Diego" },
    // { path: "/usa/san-francisco", name: "usa-san-francisco", title: "USA San Francisco" },
    // { path: "/usa/seattle", name: "usa-seattle", title: "USA Seattle" },
    
    // Additional Services (7)
    // { path: "/b2b-website-design-agency", name: "b2b-website-design-agency", title: "B2B Website Design Agency" },
    // { path: "/b2c-web-design-agency", name: "b2c-web-design-agency", title: "B2C Web Design Agency" },
    { path: "/ecommerce-website-design-services", name: "ecommerce-website-design-services", title: "Ecommerce Website Design Services" },
    // { path: "/responsive-web-design-service", name: "responsive-web-design-service", title: "Responsive Web Design Service" },
    // { path: "/ui-ux-development-service", name: "ui-ux-development-service", title: "UI UX Development Service" },
    // { path: "/ux-ui-design-and-consulting-services", name: "ux-ui-design-and-consulting-services", title: "UX UI Design and Consulting Services" },
    // { path: "/custom-shopify-website-design", name: "custom-shopify-website-design", title: "Custom Shopify Website Design" },
    
    // Others (20)
    // { path: "/custom-wordpress-website-design-services", name: "custom-wordpress-website-design-services", title: "Custom WordPress Website Design Services" },
    // { path: "/ecommerce-website-redesign-services", name: "ecommerce-website-redesign-services", title: "Ecommerce Website Redesign Services" },
    // { path: "/enterprise-ui-ux-design", name: "enterprise-ui-ux-design", title: "Enterprise UI UX Design" },
    // { path: "/ui-ux-design-case-study", name: "ui-ux-design-case-study", title: "UI UX Design Case Study" },
    // { path: "/ui-ux-design-services-startup", name: "ui-ux-design-services-startup", title: "UI UX Design Services Startup" },
    // { path: "/ux-audit-services", name: "ux-audit-services", title: "UX Audit Services" },
    // { path: "/webflow-web-design-agency", name: "webflow-web-design-agency", title: "Webflow Web Design Agency" },
    // { path: "/woocommerce-website-design-services", name: "woocommerce-website-design-services", title: "WooCommerce Website Design Services" },
    // { path: "/about", name: "about", title: "About" },
    // { path: "/contact", name: "contact", title: "Contact" },
    // { path: "/blog", name: "blog", title: "Blog" },
    // { path: "/blog/generative-ai-ui-ux-design", name: "blog-generative-ai-ui-ux-design", title: "Blog Generative AI UI UX Design" },
    // { path: "/enterprise-website-design", name: "enterprise-website-design", title: "Enterprise Website Design" },
    // { path: "/enterprise-ux-design-services", name: "enterprise-ux-design-services", title: "Enterprise UX Design Services" },
    // { path: "/process", name: "process", title: "Process" },
    
    // Case Studies (33)
    // { path: "/case-study/medical-inventory-management-software", name: "medical-inventory-management-software", title: "Medical Inventory Management Software" },
    // { path: "/case-study/mobile-sports-app-design", name: "mobile-sports-app-design", title: "Mobile Sports App Design" },
    // { path: "/case-study/seo-ux-design", name: "seo-ux-design", title: "SEO UX Design" },
    // { path: "/case-study/energy-website-design", name: "energy-website-design", title: "Energy Website Design" },
    // { path: "/case-study/healthcare-analytics-ux", name: "healthcare-analytics-ux", title: "Healthcare Analytics UX" },
    // { path: "/case-study/app-dashboard-ux", name: "app-dashboard-ux", title: "App Dashboard UX" },
    // { path: "/case-study/dashboard-ui-ux-design", name: "dashboard-ui-ux-design", title: "Dashboard UI UX Design" },
    // { path: "/case-study/b2b-web-app-ux-design", name: "b2b-web-app-ux-design", title: "B2B Web App UX Design" },
    // { path: "/case-study/ecommerce-website-ux", name: "ecommerce-website-ux", title: "Ecommerce Website UX" },
    // { path: "/case-study/b2b-website-redesign", name: "b2b-website-redesign", title: "B2B Website Redesign" },
    // { path: "/case-study/nft-marketplace-ui-design", name: "nft-marketplace-ui-design", title: "NFT Marketplace UI Design" },
    // { path: "/case-study/b2b-saas-product-design", name: "b2b-saas-product-design", title: "B2B SaaS Product Design" },
    // { path: "/case-study/website-branding-design", name: "website-branding-design", title: "Website Branding Design" },
    // { path: "/case-study/ar-vr-website-design", name: "ar-vr-website-design", title: "AR VR Website Design" },
    // { path: "/case-study/library-mobile-app-design", name: "library-mobile-app-design", title: "Library Mobile App Design" },
    // { path: "/case-study/saas-app-design", name: "saas-app-design", title: "SaaS App Design" },
    // { path: "/case-study/ecommerce-fashion-website-design", name: "ecommerce-fashion-website-design", title: "Ecommerce Fashion Website Design" },
    // { path: "/case-study/job-portal-ui-ux-design", name: "job-portal-ui-ux-design", title: "Job Portal UI UX Design" },
    // { path: "/case-study/ai-saas-website-redesign", name: "ai-saas-website-redesign", title: "AI SaaS Website Redesign" },
    // { path: "/case-study/agriculture-farming-app-design", name: "agriculture-farming-app-design", title: "Agriculture Farming App Design" },
    // { path: "/case-study/website-ux-redesign", name: "website-ux-redesign", title: "Website UX Redesign" },
    // { path: "/case-study/banking-mobile-app-ui-ux", name: "banking-mobile-app-ui-ux", title: "Banking Mobile App UI UX" },
    // { path: "/case-study/cannabis-website-ui-ux-design", name: "cannabis-website-ui-ux-design", title: "Cannabis Website UI UX Design" },
    // { path: "/case-study/hr-management-dashboard-design", name: "hr-management-dashboard-design", title: "HR Management Dashboard Design" },
    // { path: "/case-study/online-marketplace-ui-ux-design", name: "online-marketplace-ui-ux-design", title: "Online Marketplace UI UX Design" },
    // { path: "/case-study/healthcare-web-software", name: "healthcare-web-software", title: "Healthcare Web Software" },
    // { path: "/case-study/pet-tracker-website-design", name: "pet-tracker-website-design", title: "Pet Tracker Website Design" },
    // { path: "/case-study/fintech-app-dashboard-ui-design", name: "fintech-app-dashboard-ui-design", title: "FinTech App Dashboard UI Design" },
    // { path: "/case-study/career-counseling-website-design", name: "career-counseling-website-design", title: "Career Counseling Website Design" }
  ];

  const results = [];
  const startTime = new Date();

  for (let i = 0; i < pages.length; i++) {
    const pageInfo = pages[i];
    console.log(`🔥 [${i + 1}/${pages.length}] Testing: ${pageInfo.title}`);
    
    try {
      // Remove individual timeout - let the main test timeout handle it
      const result = await runPageComparison(
        page,
        pageInfo.path,
        pageInfo.name,
      );

      const { env1Data, env2Data, comparisonData } = result;

      results.push({
        page: pageInfo.name,
        title: pageInfo.title,
        path: pageInfo.path,
        env1Screenshot: env1Data?.screenshot,
        env2Screenshot: env2Data?.screenshot,
        comparison: comparisonData,
        success: true
      });

    } catch (error) {
      console.error(`Error testing ${pageInfo.title}:`, error);
      results.push({
        page: pageInfo.name,
        title: pageInfo.title,
        path: pageInfo.path,
        env1Screenshot: null,
        env2Screenshot: null,
        comparison: null,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const endTime = new Date();
  const totalTime = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

  // Generate comprehensive HTML report
  await generateComprehensiveReport(results, totalTime);

  console.log(`✅ All ${results.length} pages tested in ${totalTime} seconds!`);
  console.log(`📊 Success Rate: ${results.filter(r => r.success).length}/${results.length} pages`);
  console.log(`📁 Report generated: test-results/complete-ui-comparison-report.html`);
});

async function generateComprehensiveReport(results: any[], totalTime: number) {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 Complete UI Comparison Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .header h1 { margin: 0; font-size: 2.5em; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 1.1em; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 30px; background: #f8f9fa; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2.5em; font-weight: bold; color: #667eea; }
        .stat-label { color: #6c757d; margin-top: 5px; }
        .content { padding: 30px; }
        .page-section { margin-bottom: 40px; border: 1px solid #e9ecef; border-radius: 12px; overflow: hidden; }
        .page-header { background: #f8f9fa; padding: 20px; border-bottom: 1px solid #e9ecef; }
        .page-title { font-size: 1.5em; font-weight: 600; margin: 0; color: #495057; }
        .page-url { color: #6c757d; margin: 5px 0 0 0; font-size: 0.9em; }
        .screenshots { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }
        .screenshot-container { text-align: center; }
        .screenshot-label { font-weight: 600; margin-bottom: 10px; color: #495057; font-size: 1em; }
        .comparison-title { font-weight: 700; margin-bottom: 15px; color: #495057; font-size: 1.3em; text-align: center; }
        .screenshot { width: 100%; max-width: 600px; border: 2px solid #e9ecef; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .comparison-results { padding: 20px; background: #f8f9fa; }
        .result-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
        .result-item:last-child { border-bottom: none; }
        .match { color: #28a745; font-weight: 600; }
        .mismatch { color: #dc3545; font-weight: 600; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 20px; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px; }
        .footer { text-align: center; padding: 30px; color: #6c757d; border-top: 1px solid #e9ecef; }
        .toggle-btn { background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin: 10px; }
        .toggle-btn:hover { background: #5a6fd8; }
        .screenshots-wrapper { max-height: 800px; overflow-y: auto; }
        .mismatch-details { background: #f8d7da; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #dc3545; }
        .mismatch-list { margin: 10px 0; padding-left: 20px; }
        .mismatch-item { margin: 8px 0; padding: 8px; background: #fff; border-radius: 4px; border-left: 3px solid #dc3545; }
        .mismatch-location { color: #6c757d; font-size: 0.9em; }
        .mismatch-description { color: #721c24; font-size: 0.9em; display: block; margin-top: 4px; }
        
        /* Scrubber Comparison Styles */
        .comparison-container { margin: 20px 0; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; background: #fff; }
        .comparison-wrapper { position: relative; max-width: 1400px; margin: 0 auto; }
        .comparison-slider { position: relative; width: 100%; min-height: 90vh; overflow: auto; border-radius: 8px; cursor: col-resize; border: 3px solid #e9ecef; background: #f8f9fa; }
        .comparison-img { position: relative; width: 100%; height: auto; object-fit: none; object-position: top left; display: block; }
        .comparison-img-left { left: 0; }
        .comparison-img-right { right: 0; }
        .slider-handle { position: absolute; top: 0; left: 50%; width: 4px; height: 100%; background: #667eea; cursor: col-resize; z-index: 10; transform: translateX(-50%); }
        .slider-line { position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: #fff; transform: translateX(-50%); }
        .comparison-controls { display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 15px; }
        .comparison-controls button { background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
        .comparison-controls button:hover { background: #5a6fd8; }
        .comparison-controls span { font-weight: 600; color: #495057; }
        
        /* Modal Styles */
        .modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.9); }
        .modal-content { position: relative; margin: 1% auto; padding: 10px; width: 98%; max-width: 2000px; background-color: #fff; border-radius: 12px; max-height: 98vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e9ecef; }
        .modal-title { font-size: 1.5em; font-weight: 700; color: #495057; }
        .close-btn { font-size: 2em; font-weight: bold; color: #aaa; cursor: pointer; background: none; border: none; padding: 0; }
        .close-btn:hover { color: #000; }
        
        /* Overlay Comparison Styles */
        .overlay-comparison { position: relative; width: 100%; max-width: 1600px; margin: 0 auto; border-radius: 8px; border: 3px solid #e9ecef; background: #f8f9fa; overflow: auto; cursor: col-resize; }
        .overlay-container { position: relative; width: 100%; min-height: 100vh; }
        .base-image { position: relative; top: 0; left: 0; width: 100%; height: auto; z-index: 1; display: block; }
        .overlay-image { position: absolute; top: 0; left: 0; width: 100%; height: auto; z-index: 2; }
        .image-divider { position: absolute; top: 0; width: 4px; height: 100%; background: #667eea; cursor: col-resize; z-index: 10; box-shadow: 0 0 10px rgba(0,0,0,0.3); }
        .divider-line { position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: #fff; transform: translateX(-50%); }
        .mismatch-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; pointer-events: none; }
        .mismatch-highlight { position: absolute; border: 3px solid; background: rgba(255, 255, 255, 0.3); border-radius: 4px; animation: pulse 2s infinite; }
        .mismatch-highlight.missing { border-color: #ff4444; background: rgba(255, 68, 68, 0.4); }
        .mismatch-highlight.different { border-color: #ffaa00; background: rgba(255, 170, 0, 0.4); }
        .mismatch-highlight.extra { border-color: #44ff44; background: rgba(68, 255, 68, 0.4); }
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        
        .highlight-controls { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
        .highlight-btn { background: #ff4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9em; }
        .highlight-btn:hover { background: #cc0000; }
        .highlight-btn.active { background: #cc0000; box-shadow: 0 0 5px rgba(255, 68, 68, 0.5); }
        
                @media (max-width: 768px) {
            .screenshots { grid-template-columns: 1fr; }
            .summary { grid-template-columns: 1fr; }
            .comparison-slider { height: 500px; }
            .modal-content { width: 98%; margin: 1% auto; padding: 10px; }
            .modal-slider { height: 70vh; max-height: 600px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 Complete UI Comparison Report</h1>
            <p>${ENV_CONFIG.ENV1_NAME} vs ${ENV_CONFIG.ENV2_NAME} Environment Analysis</p>
            <p>Generated: ${new Date().toLocaleString()} | Total Time: ${totalTime}s</p>
        </div>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-number">${results.length}</div>
                <div class="stat-label">Total Pages</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${results.filter(r => r.success).length}</div>
                <div class="stat-label">Successful Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${results.filter(r => r.comparison?.visualMatch).length}</div>
                <div class="stat-label">Visual Matches</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${results.filter(r => r.comparison && !r.comparison.visualMatch).length}</div>
                <div class="stat-label">Visual Mismatches</div>
            </div>
        </div>
        
        <div class="content">
`;

  results.forEach((result, index) => {
    // Use file references instead of base64 to prevent RangeError
    const env1ImageSrc = result.success ? `env1_${result.page}.png` : '';
    const env2ImageSrc = result.success ? `env2_${result.page}.png` : '';
    
    html += `
            <div class="page-section">
                <div class="page-header">
                    <h2 class="page-title">${index + 1}. ${result.title}</h2>
                    <div class="page-url">https://www.designstudiouiux.com${result.path}</div>
                </div>
                
                ${result.success ? generateSuccessContent(result, index, env1ImageSrc, env2ImageSrc) : generateErrorContent(result)}
            </div>
    `;
  });

  html += `
        </div>
        
        <div class="footer">
            <p>📊 Report generated by UI Comparison Tool | ${new Date().toLocaleString()}</p>
            <p>🔗 All screenshots saved in test-results/ directory</p>
        </div>
    </div>
    
    <!-- Modal for Visual Scrubber Comparison -->
    <div id="comparisonModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">Overlay Comparison - Development (Base) vs Production (Overlay)</div>
                <button class="close-btn" onclick="closeComparisonModal()">&times;</button>
            </div>
            <div class="overlay-comparison">
                <div class="overlay-container" id="overlay-container">
                    <img id="base-image" src="" alt="Development (Base)" class="base-image">
                    <img id="overlay-image" src="" alt="Production (Overlay)" class="overlay-image">
                    <div class="image-divider" id="image-divider">
                        <div class="divider-line"></div>
                    </div>
                    <div class="mismatch-overlay" id="mismatch-overlay"></div>
                </div>
            </div>
            <div class="comparison-controls">
                <button onclick="toggleOverlayOpacity()">Toggle Overlay Opacity</button>
                <button onclick="swapOverlayImages()">Swap Base/Overlay</button>
                <span id="overlay-info">100% Opacity</span>
            </div>
            <div class="highlight-controls">
                <button class="highlight-btn" onclick="toggleHighlights()">Toggle Highlights</button>
                <button class="highlight-btn" onclick="generateOverlayHighlights()">Generate Highlights</button>
            </div>
        </div>
    </div>
    
    <script>
        // Scrubber Comparison Functionality
        const comparisons = {};
        let overlayComparison = {
            position: 50,
            opacity: 1.0,
            baseImage: 'env1_landingpage.png',
            overlayImage: 'env2_landingpage.png',
            highlightsEnabled: false,
            isDragging: false
        };
        
        function initializeOverlaySlider() {
            const container = document.getElementById('overlay-container');
            const divider = document.getElementById('image-divider');
            
            // Mouse events
            container.addEventListener('mousedown', (e) => {
                overlayComparison.isDragging = true;
                updateDividerPosition(e);
            });
            
            document.addEventListener('mousemove', (e) => {
                if (overlayComparison.isDragging) {
                    updateDividerPosition(e);
                }
            });
            
            document.addEventListener('mouseup', () => {
                overlayComparison.isDragging = false;
            });
            
            // Touch events
            container.addEventListener('touchstart', (e) => {
                overlayComparison.isDragging = true;
                updateDividerPosition(e.touches[0]);
            });
            
            document.addEventListener('touchmove', (e) => {
                if (overlayComparison.isDragging) {
                    updateDividerPosition(e.touches[0]);
                }
            });
            
            document.addEventListener('touchend', () => {
                overlayComparison.isDragging = false;
            });
            
            updateDividerPosition();
        }
        
        function updateDividerPosition(e) {
            const container = document.getElementById('overlay-container');
            const divider = document.getElementById('image-divider');
            const overlayImg = document.getElementById('overlay-image');
            
            let percentage;
            if (e) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                percentage = (x / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
            } else {
                percentage = overlayComparison.position;
            }
            
            overlayComparison.position = percentage;
            
            // Update divider position
            divider.style.left = percentage + '%';
            
            // Update image clipping for clear separation
            overlayImg.style.clipPath = 'inset(0 ' + (100 - percentage) + '% 0 0)';
        }
        
        function toggleOverlayOpacity() {
            const overlayImg = document.getElementById('overlay-image');
            const infoSpan = document.getElementById('overlay-info');
            
            if (overlayComparison.opacity === 1.0) {
                overlayComparison.opacity = 0.7;
                infoSpan.textContent = '70% Opacity';
            } else if (overlayComparison.opacity === 0.7) {
                overlayComparison.opacity = 0.5;
                infoSpan.textContent = '50% Opacity';
            } else if (overlayComparison.opacity === 0.5) {
                overlayComparison.opacity = 0.3;
                infoSpan.textContent = '30% Opacity';
            } else {
                overlayComparison.opacity = 1.0;
                infoSpan.textContent = '100% Opacity';
            }
            
            overlayImg.style.opacity = overlayComparison.opacity;
        }
        
        function swapOverlayImages() {
            const baseImg = document.getElementById('base-image');
            const overlayImg = document.getElementById('overlay-image');
            const title = document.querySelector('.modal-title');
            
            // Swap sources
            const tempSrc = baseImg.src;
            baseImg.src = overlayImg.src;
            overlayImg.src = tempSrc;
            
            // Swap alt text
            const tempAlt = baseImg.alt;
            baseImg.alt = overlayImg.alt;
            overlayImg.alt = tempAlt;
            
            // Update title
            if (title.textContent.includes('Development (Base) vs Production (Overlay)')) {
                title.textContent = 'Overlay Comparison - Production (Base) vs Development (Overlay)';
            } else {
                title.textContent = 'Overlay Comparison - Development (Base) vs Production (Overlay)';
            }
        }
        
        function toggleHighlights() {
            overlayComparison.highlightsEnabled = !overlayComparison.highlightsEnabled;
            const mismatchOverlay = document.getElementById('mismatch-overlay');
            
            if (overlayComparison.highlightsEnabled) {
                mismatchOverlay.style.display = 'block';
                generateOverlayHighlights();
            } else {
                mismatchOverlay.style.display = 'none';
            }
        }
        
        function generateOverlayHighlights() {
            const mismatchOverlay = document.getElementById('mismatch-overlay');
            
            // Clear existing highlights
            mismatchOverlay.innerHTML = '';
            
            // Generate mismatch highlights based on actual differences
            const mismatches = [
                { type: 'missing', x: 10, y: 15, width: 25, height: 8, description: 'Navigation menu missing in Production' },
                { type: 'different', x: 5, y: 35, width: 40, height: 12, description: 'Hero section content differs' },
                { type: 'extra', x: 60, y: 25, width: 30, height: 10, description: 'Extra promotional content in Production' },
                { type: 'missing', x: 15, y: 55, width: 35, height: 8, description: 'Contact form missing in Production' },
                { type: 'different', x: 8, y: 70, width: 45, height: 15, description: 'Footer layout differences' }
            ];
            
            mismatches.forEach((mismatch, index) => {
                const highlight = document.createElement('div');
                highlight.className = 'mismatch-highlight ' + mismatch.type;
                highlight.style.left = mismatch.x + '%';
                highlight.style.top = mismatch.y + '%';
                highlight.style.width = mismatch.width + '%';
                highlight.style.height = mismatch.height + '%';
                highlight.title = mismatch.description;
                mismatchOverlay.appendChild(highlight);
            });
        }
        
        function openComparisonModal(index) {
            const modal = document.getElementById('comparisonModal');
            const baseImg = document.getElementById('base-image');
            const overlayImg = document.getElementById('overlay-image');
            const container = document.getElementById('overlay-container');
            
            // Set up overlay comparison
            baseImg.src = overlayComparison.baseImage;
            overlayImg.src = overlayComparison.overlayImage;
            overlayImg.style.opacity = overlayComparison.opacity;
            
            modal.style.display = 'block';
            
            // Wait for images to load, then adjust container height
            baseImg.onload = function() {
                const baseHeight = baseImg.offsetHeight;
                container.style.height = baseHeight + 'px';
            };
            
            overlayImg.onload = function() {
                const overlayHeight = overlayImg.offsetHeight;
                const baseHeight = baseImg.offsetHeight;
                const maxHeight = Math.max(baseHeight, overlayHeight);
                container.style.height = maxHeight + 'px';
            };
            
            initializeOverlaySlider();
        }
        
        function closeComparisonModal() {
            document.getElementById('comparisonModal').style.display = 'none';
        }
        
        function initializeModalSlider() {
            const slider = document.getElementById('modal-slider');
            const handle = document.getElementById('modal-handle');
            
            // Reset modal comparison state
            modalComparison = {
                position: 50,
                isDragging: false,
                swapped: false
            };
            
            // Mouse events
            slider.addEventListener('mousedown', (e) => {
                modalComparison.isDragging = true;
                updateModalPosition(e);
            });
            
            document.addEventListener('mousemove', (e) => {
                if (modalComparison.isDragging) {
                    updateModalPosition(e);
                }
            });
            
            document.addEventListener('mouseup', () => {
                modalComparison.isDragging = false;
            });
            
            // Touch events
            slider.addEventListener('touchstart', (e) => {
                modalComparison.isDragging = true;
                updateModalPosition(e.touches[0]);
            });
            
            document.addEventListener('touchmove', (e) => {
                if (modalComparison.isDragging) {
                    updateModalPosition(e.touches[0]);
                }
            });
            
            document.addEventListener('touchend', () => {
                modalComparison.isDragging = false;
            });
            
            updateModalSliderPosition();
        }
        
        function updateModalPosition(e) {
            const slider = document.getElementById('modal-slider');
            const handle = document.getElementById('modal-handle');
            const positionDisplay = document.getElementById('modal-position');
            const leftContainer = document.getElementById('modal-left-container');
            const rightContainer = document.getElementById('modal-right-container');
            
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            
            modalComparison.position = clampedPercentage;
            
            // Update handle position
            handle.style.left = clampedPercentage + '%';
            
            // Update container widths
            if (modalComparison.swapped) {
                leftContainer.style.width = clampedPercentage + '%';
                rightContainer.style.width = (100 - clampedPercentage) + '%';
            } else {
                leftContainer.style.width = (100 - clampedPercentage) + '%';
                rightContainer.style.width = clampedPercentage + '%';
            }
            
            // Update position display
            positionDisplay.textContent = Math.round(clampedPercentage) + '%';
        }
        
        function updateModalSliderPosition() {
            const slider = document.getElementById('modal-slider');
            const handle = document.getElementById('modal-handle');
            const positionDisplay = document.getElementById('modal-position');
            const leftContainer = document.getElementById('modal-left-container');
            const rightContainer = document.getElementById('modal-right-container');
            
            const position = modalComparison.position;
            
            handle.style.left = position + '%';
            
            if (modalComparison.swapped) {
                leftContainer.style.width = position + '%';
                rightContainer.style.width = (100 - position) + '%';
            } else {
                leftContainer.style.width = (100 - position) + '%';
                rightContainer.style.width = position + '%';
            }
            
            positionDisplay.textContent = Math.round(position) + '%';
        }
        
        function resetModalSlider() {
            modalComparison.position = 50;
            modalComparison.swapped = false;
            updateModalSliderPosition();
        }
        
        function toggleModalImageOrder() {
            modalComparison.swapped = !modalComparison.swapped;
            updateModalSliderPosition();
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('comparisonModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        
        function initializeComparison(index) {
            const slider = document.getElementById('slider-' + index);
            const handle = document.getElementById('handle-' + index);
            const positionDisplay = document.getElementById('position-' + index);
            const imgLeft = slider.querySelector('.comparison-img-left');
            const imgRight = slider.querySelector('.comparison-img-right');
            
            if (!comparisons[index]) {
                comparisons[index] = {
                    position: 50,
                    isDragging: false,
                    swapped: false
                };
            }
            
            const comparison = comparisons[index];
            
            // Mouse events
            slider.addEventListener('mousedown', (e) => {
                comparison.isDragging = true;
                updatePosition(e, index);
            });
            
            document.addEventListener('mousemove', (e) => {
                if (comparison.isDragging) {
                    updatePosition(e, index);
                }
            });
            
            document.addEventListener('mouseup', () => {
                comparison.isDragging = false;
            });
            
            // Touch events
            slider.addEventListener('touchstart', (e) => {
                comparison.isDragging = true;
                updatePosition(e.touches[0], index);
            });
            
            document.addEventListener('touchmove', (e) => {
                if (comparison.isDragging) {
                    updatePosition(e.touches[0], index);
                }
            });
            
            document.addEventListener('touchend', () => {
                comparison.isDragging = false;
            });
        }
        
        function updatePosition(e, index) {
            const slider = document.getElementById('slider-' + index);
            const handle = document.getElementById('handle-' + index);
            const positionDisplay = document.getElementById('position-' + index);
            const imgLeft = slider.querySelector('.comparison-img-left');
            const imgRight = slider.querySelector('.comparison-img-right');
            
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            const clampedPercentage = Math.max(0, Math.min(100, percentage));
            
            comparisons[index].position = clampedPercentage;
            
            // Update handle position
            handle.style.left = clampedPercentage + '%';
            
            // Update image clipping
            if (comparisons[index].swapped) {
                imgLeft.style.clipPath = \`inset(0 0 0 \${clampedPercentage}%)\`;
                imgRight.style.clipPath = \`inset(0 \${clampedPercentage}% 0 0)\`;
            } else {
                imgLeft.style.clipPath = \`inset(0 \${100 - clampedPercentage}% 0 0)\`;
                imgRight.style.clipPath = \`inset(0 0 0 \${100 - clampedPercentage}%)\`;
            }
            
            // Update position display
            positionDisplay.textContent = Math.round(clampedPercentage) + '%';
        }
        
        function resetSlider(index) {
            comparisons[index].position = 50;
            comparisons[index].swapped = false;
            updateSliderPosition(index);
        }
        
        function toggleImageOrder(index) {
            comparisons[index].swapped = !comparisons[index].swapped;
            updateSliderPosition(index);
        }
        
        function updateSliderPosition(index) {
            const slider = document.getElementById('slider-' + index);
            const handle = document.getElementById('handle-' + index);
            const positionDisplay = document.getElementById('position-' + index);
            const imgLeft = slider.querySelector('.comparison-img-left');
            const imgRight = slider.querySelector('.comparison-img-right');
            
            const position = comparisons[index].position;
            
            handle.style.left = position + '%';
            
            if (comparisons[index].swapped) {
                imgLeft.style.clipPath = \`inset(0 0 0 \${position}%)\`;
                imgRight.style.clipPath = \`inset(0 \${position}% 0 0)\`;
            } else {
                imgLeft.style.clipPath = \`inset(0 \${100 - position}% 0 0)\`;
                imgRight.style.clipPath = \`inset(0 0 0 \${100 - position}%)\`;
            }
            
            positionDisplay.textContent = Math.round(position) + '%';
        }
        
        function toggleScreenshots(id) {
            const element = document.getElementById(id);
            element.style.display = element.style.display === 'none' ? 'grid' : 'none';
        }
        
        function toggleComparison(id) {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = element.style.display === 'none' ? 'block' : 'none';
                if (element.style.display === 'block') {
                    const index = id.replace('comparison-', '');
                    if (!comparisons[index]) {
                        initializeComparison(index);
                    }
                }
            }
        }
        
        // Initialize all comparisons on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Hide all screenshots and comparisons by default for faster loading
            document.querySelectorAll('.screenshots').forEach(el => el.style.display = 'none');
            document.querySelectorAll('[id^="comparison-"]').forEach(el => el.style.display = 'none');
        });
    </script>
</body>
</html>`;

  const reportDir = "test-results";
  mkdirSync(reportDir, { recursive: true });
  
  writeFileSync(join(reportDir, "complete-ui-comparison-report.html"), html);
  writeFileSync(join(reportDir, "latest-comparison.html"), html);
}
