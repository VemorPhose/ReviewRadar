import "./content.css";

// Content script for ReviewRadar
console.log("ReviewRadar content script loaded.");

let currentMode = "confidence"; // Default mode

// Function to scan reviews and add badges/tags
function scanReviews() {
  console.log("Scanning reviews...");
  // Placeholder: Find review elements on the page
  // This will be specific to the site (e.g., Amazon)
  const reviewElements = document.querySelectorAll(".review"); // This is a generic selector, update for Amazon

  reviewElements.forEach((reviewElement, index) => {
    // Placeholder: Simulate ML model prediction
    const confidenceScore = Math.random(); // Random score between 0 and 1
    const isFake = confidenceScore < 0.5; // Example threshold

    // Remove any existing badge
    const existingBadge = reviewElement.querySelector(".review-radar-badge");
    if (existingBadge) {
      existingBadge.remove();
    }

    const badge = document.createElement("span");
    badge.classList.add("review-radar-badge");
    badge.style.marginLeft = "8px";
    badge.style.padding = "2px 6px";
    badge.style.borderRadius = "4px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "bold";
    badge.style.color = "white";

    if (currentMode === "confidence") {
      const percentage = Math.round(confidenceScore * 100);
      badge.textContent = `${percentage}% Genuine`;
      badge.style.backgroundColor =
        percentage < 30 ? "#ef4444" : percentage < 70 ? "#f59e0b" : "#22c55e"; // Red, Yellow, Green
    } else if (currentMode === "classification") {
      if (confidenceScore > 0.7) {
        badge.textContent = "Genuine";
        badge.style.backgroundColor = "#22c55e"; // Green
      } else if (confidenceScore < 0.3) {
        badge.textContent = "Fake";
        badge.style.backgroundColor = "#ef4444"; // Red
      } else {
        badge.textContent = "Unsure";
        badge.style.backgroundColor = "#f59e0b"; // Yellow
      }
    }
    reviewElement.appendChild(badge);
  });
}

// Listen for messages from the background script (e.g., mode changes)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "modeChanged") {
    console.log("Mode changed to:", request.newMode);
    currentMode = request.newMode;
    scanReviews(); // Re-scan reviews with the new mode
    sendResponse({ success: true });
  }
  return true;
});

// Initial scan and setup
function init() {
  // Get the initial mode from storage
  chrome.storage.local.get(["mode"], (result) => {
    if (result.mode) {
      currentMode = result.mode;
    }
    scanReviews();
  });

  // TODO: Add mutation observer to detect dynamically loaded reviews
  // For now, we can re-scan on a timer or a specific user action if needed.
  // Example: Re-scan when new reviews might be loaded (e.g., scrolling, pagination)
  // For Amazon, you'll need to identify how reviews are loaded (e.g. infinite scroll, pagination clicks)
  // and trigger scanReviews() accordingly.
}

// Run init when the page is fully loaded or when appropriate for the target site
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Example of how you might trigger re-scan on Amazon for new review loads (VERY SIMPLIFIED):
// const targetNode = document.getElementById('cm_cr-review_list'); // Example target node for Amazon reviews
// if (targetNode) {
//   const config = { childList: true, subtree: true };
//   const callback = function(mutationsList, observer) {
//       for(const mutation of mutationsList) {
//           if (mutation.type === 'childList') {
//               console.log('New reviews potentially loaded.');
//               scanReviews();
//           }
//       }
//   };
//   const observer = new MutationObserver(callback);
//   observer.observe(targetNode, config);
// } else {
//   console.warn("Review list container not found for mutation observer.");
// }
