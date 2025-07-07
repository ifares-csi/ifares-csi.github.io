/**
 * Visitor Tracker with Country Detection
 * This script tracks visitor information including country and stores it in localStorage
 */

// Main function to register a visit and update visitor information
function registerVisit() {
    // Get existing visitor data or initialize new data
    const visitorData = getVisitorData();
    
    // Update visit count
    visitorData.totalVisits++;
    visitorData.lastVisit = new Date().toISOString();
    
    // Collect current visit information (without country initially)
    const currentVisit = collectVisitInfo();
    
    // Detect country and then complete the process
    detectCountry().then(country => {
      // Add country to current visit data
      currentVisit.country = country;
      
      // Add current visit to history (limited to last 10 visits)
      visitorData.visitHistory.unshift(currentVisit);
      if (visitorData.visitHistory.length > 10) {
        visitorData.visitHistory.pop();
      }
      
      // Update browser statistics
      updateBrowserStats(visitorData, currentVisit.browser);
      
      // Update device statistics
      updateDeviceStats(visitorData, currentVisit.deviceType);
      
      // Update referrer statistics
      updateReferrerStats(visitorData, currentVisit.referrer);
      
      // Update country statistics
      updateCountryStats(visitorData, currentVisit.country);
      
      // Save updated data
      saveVisitorData(visitorData);
      
      // Update the displayed summary if needed
      if (typeof displayVisitorSummary === 'function') {
        displayVisitorSummary();
      }
      
      console.log('Visitor Information Updated:', summarizeVisitorData(visitorData));
    });
    
    // Return initial data summary
    return summarizeVisitorData(visitorData);
  }
  
  // Function to detect visitor's country using a geolocation API
  async function detectCountry() {
    try {
      // Using ipinfo.io as one option (free tier allows 50,000 requests per month)
      const response = await fetch('https://ipinfo.io/json?token=YOUR_IPINFO_TOKEN');
      const data = await response.json();
      return data.country || 'Unknown';
    } catch (error) {
      console.error('Error detecting country:', error);
      
      // Fallback option: try a different API
      try {
        const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_IPGEOLOCATION_API_KEY');
        const data = await response.json();
        return data.country_name || 'Unknown';
      } catch (fallbackError) {
        console.error('Error with fallback country detection:', fallbackError);
        return 'Unknown';
      }
    }
  }
  
  // Alternative option: Using a free API without tokens (may have rate limits)
  async function detectCountryAlternative() {
    try {
      const response = await fetch('https://ip-api.com/json/');
      const data = await response.json();
      return data.status === 'success' ? data.country : 'Unknown';
    } catch (error) {
      console.error('Error detecting country:', error);
      return 'Unknown';
    }
  }
  
  // Function to update country statistics
  function updateCountryStats(data, country) {
    // Initialize countries object if it doesn't exist
    if (!data.countries) {
      data.countries = {};
    }
    
    if (!data.countries[country]) {
      data.countries[country] = 0;
    }
    data.countries[country]++;
  }
  
  // Function to collect information about the current visit
  function collectVisitInfo() {
    const userAgent = navigator.userAgent;
    const now = new Date();
    
    return {
      timestamp: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      browser: detectBrowser(userAgent),
      deviceType: detectDeviceType(userAgent),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language || navigator.userLanguage,
      referrer: document.referrer || 'direct',
      path: window.location.pathname,
      queryParams: window.location.search,
      country: 'Detecting...' // Will be updated asynchronously
    };
  }
  
  // Helper function to detect browser type
  function detectBrowser(userAgent) {
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
    if (userAgent.indexOf("Edg") > -1) return "Edge";
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "Internet Explorer";
    return "Unknown";
  }
  
  // Helper function to detect device type
  function detectDeviceType(userAgent) {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
      if (/iPad|Tablet/i.test(userAgent)) return "Tablet";
      return "Mobile";
    }
    return "Desktop";
  }
  
  // Function to update browser statistics
  function updateBrowserStats(data, browser) {
    if (!data.browsers[browser]) {
      data.browsers[browser] = 0;
    }
    data.browsers[browser]++;
  }
  
  // Function to update device statistics
  function updateDeviceStats(data, deviceType) {
    if (!data.devices[deviceType]) {
      data.devices[deviceType] = 0;
    }
    data.devices[deviceType]++;
  }
  
  // Function to update referrer statistics
  function updateReferrerStats(data, referrer) {
    // Extract domain from referrer
    let domain = 'direct';
    if (referrer && referrer !== 'direct') {
      try {
        domain = new URL(referrer).hostname || 'direct';
      } catch (e) {
        domain = referrer;
      }
    }
    
    if (!data.referrers[domain]) {
      data.referrers[domain] = 0;
    }
    data.referrers[domain]++;
  }
  
  // Function to get existing visitor data from localStorage or initialize new data
  function getVisitorData() {
    const savedData = localStorage.getItem('visitorData');
    
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Error parsing visitor data:', e);
        return initializeVisitorData();
      }
    }
    
    return initializeVisitorData();
  }
  
  // Function to initialize new visitor data structure
  function initializeVisitorData() {
    return {
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      totalVisits: 0,
      visitHistory: [],
      browsers: {},
      devices: {},
      referrers: {},
      countries: {}
    };
  }
  
  // Function to save visitor data to localStorage
  function saveVisitorData(data) {
    try {
      localStorage.setItem('visitorData', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving visitor data:', e);
    }
  }
  
  // Function to create a summary of visitor data
  function summarizeVisitorData(data) {
    // Calculate time since first visit
    const firstVisitDate = new Date(data.firstVisit);
    const now = new Date();
    const daysSinceFirstVisit = Math.floor((now - firstVisitDate) / (1000 * 60 * 60 * 24));
    
    // Find most common browser, device, referrer, and country
    const mostCommonBrowser = findMaxKey(data.browsers);
    const mostCommonDevice = findMaxKey(data.devices);
    const mostCommonReferrer = findMaxKey(data.referrers);
    const mostCommonCountry = data.countries ? findMaxKey(data.countries) : 'Unknown';
    
    return {
      summary: {
        totalVisits: data.totalVisits,
        firstVisit: data.firstVisit,
        lastVisit: data.lastVisit,
        daysSinceFirstVisit,
        visitFrequency: daysSinceFirstVisit > 0 ? (data.totalVisits / daysSinceFirstVisit).toFixed(2) : data.totalVisits,
        mostCommonBrowser,
        mostCommonDevice,
        mostCommonReferrer,
        mostCommonCountry
      },
      details: {
        visitHistory: data.visitHistory,
        browsers: data.browsers,
        devices: data.devices,
        referrers: data.referrers,
        countries: data.countries || {}
      }
    };
  }
  
  // Helper function to find the key with the maximum value in an object
  function findMaxKey(obj) {
    return Object.entries(obj).reduce((max, current) => {
      return current[1] > max[1] ? current : max;
    }, ['none', 0])[0];
  }
  
  // Function to display visitor summary on the page (optional)
  function displayVisitorSummary() {
    const data = summarizeVisitorData(getVisitorData());
    
    // Create or get container element
    let container = document.getElementById('visitor-summary');
    if (!container) {
      container = document.createElement('div');
      container.id = 'visitor-summary';
      document.body.appendChild(container);
    }
    
    // // Format the summary
    // container.innerHTML = `
    //   <h3>Visitor Summary</h3>
    //   <p>Total Visits: ${data.summary.totalVisits}</p>
    //   <p>First Visit: ${new Date(data.summary.firstVisit).toLocaleString()}</p>
    //   <p>Last Visit: ${new Date(data.summary.lastVisit).toLocaleString()}</p>
    //   <p>Days Since First Visit: ${data.summary.daysSinceFirstVisit}</p>
    //   <p>Most Common Browser: ${data.summary.mostCommonBrowser}</p>
    //   <p>Most Common Device: ${data.summary.mostCommonDevice}</p>
    //   <p>Most Common Referrer: ${data.summary.mostCommonReferrer}</p>
    //   <p>Most Common Country: ${data.summary.mostCommonCountry}</p>
    // `;
  }
  
  // Register visit immediately when script is loaded
  const visitorSummary = registerVisit();
  console.log('Initial Visitor Information:', visitorSummary);
  
  // Uncomment the line below to display visitor summary on the page
  displayVisitorSummary();