import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogPosts from "../components/blogPosts.js";
import { fetchRSSFeed, truncateText } from "../services/rssService.js";
import WavesurferPlayer from '@wavesurfer/react'
import AnimatedText from "../components/AnimatedText";
import "../css/Blog.css"
import "../css/UniversalButtons.css";


const BLOG_PATH = "/blogs/";
// Replace with your actual Substack RSS feed URL
const SUBSTACK_RSS_URL = "https://rachiedoesthings.substack.com/feed";


const Blog = () => {
  const [contents, setContents] = useState([]);
  const [firstParagraphs, setFirstParagraphs] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const [wavesurfers, setWavesurfers] = useState({})
  const [playingStates, setPlayingStates] = useState({})

  const onReady = (ws, postKey) => {
    setWavesurfers(prev => ({
      ...prev,
      [postKey]: ws
    }))
    setPlayingStates(prev => ({
      ...prev,
      [postKey]: false
    }))
  }

  const onPlayPause = (postKey) => {
    wavesurfers[postKey] && wavesurfers[postKey].playPause()
  }

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      
      // Fetch local markdown files
      const markdownContents = await Promise.all(
        blogPosts.map(async (post) => {
          if (post.file) {
            try {
              const res = await fetch(BLOG_PATH + post.file);
              return await res.text();
            } catch (error) {
              console.error(`Error fetching ${post.file}:`, error);
              return "";
            }
          }
          return "";
        })
      );
      setContents(markdownContents);
      
      // Extract first paragraphs for previews
      const paragraphs = markdownContents.map(content => {
        if (!content) return "";
        const firstParagraph = content.split('\n\n')[0].trim();
        return firstParagraph.length > 150 
          ? firstParagraph.substring(0, 150) + "..." 
          : firstParagraph;
      });
      setFirstParagraphs(paragraphs);

      // Fetch RSS feed from Substack
      console.log("Fetching RSS feed...");
      const rssPosts = await fetchRSSFeed(SUBSTACK_RSS_URL);
      console.log("RSS posts received:", rssPosts);
      
      // Combine local posts with RSS posts (RSS posts first for recency)
      const combined = [...(rssPosts || []), ...blogPosts];
      console.log("Combined posts:", combined);
      
      setAllPosts(combined);
      setLoading(false);
    };
    
    fetchAllContent();
  }, []);

  return (
    <div className="pipboy-blog-main">
      {loading && (
        <div className="blog-loading">
          <p>[ LOADING POSTS... ]</p>
        </div>
      )}
      
      {!loading && allPosts.length === 0 && (
        <div className="blog-empty">
          <p>[ NO POSTS FOUND ]</p>
        </div>
      )}

      {!loading && allPosts.map((blog, idx) => {
        const isLocal = blog.file !== undefined;
        const blogIndex = blogPosts.findIndex(p => p.file === blog.file);
        const content = isLocal ? contents[blogIndex] : "";
        const excerpt = isLocal ? firstParagraphs[blogIndex] : truncateText(blog.description || "", 200);
        
        return (
          <div className="pipboy-blog-list-post" key={`${blog.source || 'local'}-${idx}`}>
            <div className="blog-post-header">
              {blog.audio ? (
                <div className="pipboy-blog-list-title">
                  {blog.title}
                  {blog.isExternal && <span className="external-badge"> [EXTERNAL]</span>}
                </div>
              ) : (
                <div 
                  className="pipboy-blog-list-title" 
                  onClick={() => {
                    if (isLocal) {
                      navigate(`/blog/${blog.slug}`);
                    } else {
                      window.open(blog.link, '_blank');
                    }
                  }}
                >
                  {blog.title}
                  {blog.isExternal && <span className="external-badge"> [EXTERNAL]</span>}
                </div>
              )}
            </div>
            <div className="pipboy-blog-list-meta">
              {blog.date && (
                <>
                  {blog.date}
                </>
              )}
            </div>
            {blog.audio ? (
             <div className="pipboy-blog-audio">
              <div className="waveform-responsive">
                <WavesurferPlayer
                  height={60}
                  progressColor="#ffd52c"
                  url={blog.audio}
                  onReady={(ws) => onReady(ws, `audio-${idx}`)}
                  onPlay={() => setPlayingStates(prev => ({ ...prev, [`audio-${idx}`]: true }))}
                  onPause={() => setPlayingStates(prev => ({ ...prev, [`audio-${idx}`]: false }))}
                  width="100%"
                  responsive={true}
                />
              </div>
              <button
                className="btn-primary"
                onClick={() => onPlayPause(`audio-${idx}`)}
                style={{ width: "100%", margin: "0.5rem 0" }}
                onMouseEnter={() => setHoveredButton(`play-${idx}`)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <AnimatedText 
                  text={playingStates[`audio-${idx}`] ? '[ Pause ]' : '[ Play ]'} 
                  isHovered={hoveredButton === `play-${idx}`}
                />
              </button>
            </div>
            ) : (
              <div className="pipboy-blog-list-excerpt">
                <ReactMarkdown>
                  {excerpt || ""}
                </ReactMarkdown>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (isLocal) {
                      navigate(`/blog/${blog.slug}`);
                    } else {
                      window.open(blog.link, '_blank');
                    }
                  }}
                  style={{ width: "100%", margin: "0.5rem 0" }}
                  onMouseEnter={() => setHoveredButton(`read-${idx}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <AnimatedText 
                    text={isLocal ? "[ READ MORE ]" : "[ READ ON SUBSTACK ]"} 
                    isHovered={hoveredButton === `read-${idx}`}
                  />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Blog;