
const parseXML = (xmlString) => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "text/xml");
};

const extractTextFromNode = (node) => {
  if (!node) return "";
  return node.textContent || "";
};

/**
 * Fetch and parse RSS feed from Substack or other sources
 * @param {string} feedUrl - The RSS feed URL
 * @returns {Promise<Array>} Array of blog posts
 */
export const fetchRSSFeed = async (feedUrl) => {
  try {
    console.log("Fetching RSS feed from:", feedUrl);
    
    // Add cache-busting parameter to force fresh feed data
    const timestamp = Date.now();
    const freshFeedUrl = `${feedUrl}?cachebust=${timestamp}`;
    
    // Try multiple CORS proxies in case one is down
    const corsProxies = [
      (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    ];
    
    let response;
    let lastError;
    
    for (const proxyFactory of corsProxies) {
      try {
        const proxyUrl = proxyFactory(freshFeedUrl);
        console.log("Trying CORS proxy:", proxyUrl);
        
        response = await fetch(proxyUrl);
        
        if (response.ok) {
          console.log("CORS proxy response status:", response.status);
          break;
        } else {
          lastError = new Error(`CORS proxy returned ${response.status}`);
          console.warn("CORS proxy failed, trying next...", lastError);
        }
      } catch (error) {
        lastError = error;
        console.warn("CORS proxy request failed, trying next...", error);
        continue;
      }
    }
    
    if (!response || !response.ok) {
      throw lastError || new Error("All CORS proxies failed");
    }

    const data = await response.text();
    console.log("Raw response received, parsing XML...");
    
    const xmlDoc = parseXML(data);

    // Check for parsing errors
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      console.error("XML parsing error detected");
      throw new Error("Failed to parse RSS feed");
    }

    const items = xmlDoc.querySelectorAll("item");
    console.log("Found items in feed:", items.length);
    
    const posts = [];

    items.forEach((item) => {
      const title = extractTextFromNode(item.querySelector("title"));
      const link = extractTextFromNode(item.querySelector("link"));
      const pubDate = extractTextFromNode(item.querySelector("pubDate"));
      const description = extractTextFromNode(item.querySelector("description"));
      
      console.log("Processing item:", { title, link });
      
      // Only include posts with valid links
      if (!link || !title) {
        console.warn("Skipping item - missing link or title");
        return;
      }
      
      // Create slug from title
      const slug = createSlug(title);
      
      // Parse date to a readable format
      const date = formatDate(new Date(pubDate));

      posts.push({
        title,
        link,
        pubDate,
        date,
        description: stripHtmlTags(description),
        slug,
        source: "rss",
        isExternal: true,
        isValid: true, // Mark as valid initially
      });
    });

    console.log("Total posts parsed:", posts.length);
    
    // Only validate posts if we have them
    if (posts.length === 0) {
      console.warn("No posts found in RSS feed");
      return [];
    }

    // Return posts directly - RSS feed only includes published posts
    // Deleted posts are automatically removed from RSS feeds
    return posts;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
};

/**
 * Strip HTML tags from text
 */
const stripHtmlTags = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

/**
 * Create URL-friendly slug from title
 */
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};


const formatDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};


export const truncateText = (text, maxLength = 200) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};
