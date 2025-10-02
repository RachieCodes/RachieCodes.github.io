import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogPosts from "../components/blogPosts.js";
import WavesurferPlayer from '@wavesurfer/react'
import AnimatedText from "../components/AnimatedText";
import "../css/Blog.css"
import "../css/UniversalButtons.css";


const BLOG_PATH = "/blogs/";


const Blog = () => {
  const [contents, setContents] = useState([]);
  const [firstParagraphs, setFirstParagraphs] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  useEffect(() => {
    const fetchAllMarkdown = async () => {
      const all = await Promise.all(
        blogPosts.map(async (post) => {
          if (post.file) {
            const res = await fetch(BLOG_PATH + post.file);
            return await res.text();
          }
          return "";
        })
      );
      setContents(all);
      
      // Extract first paragraphs for previews
      const paragraphs = all.map(content => {
        if (!content) return "";
        // Get first paragraph (text up to the first blank line or first 150 chars)
        const firstParagraph = content.split('\n\n')[0].trim();
        return firstParagraph.length > 150 
          ? firstParagraph.substring(0, 150) + "..." 
          : firstParagraph;
      });
      setFirstParagraphs(paragraphs);
    };
    fetchAllMarkdown();
  }, []);

  return (
    <div className="pipboy-blog-main">
      {blogPosts.map((blog, idx) => (
        <div className="pipboy-blog-list-post" key={idx}>
          <div 
            className="pipboy-blog-list-title" 
            onClick={() => navigate(`/blog/${blog.slug}`)}
          >
            {blog.title}
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
                onReady={onReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                width="100%"
                responsive={true}
              />
            </div>
            <button
              className="btn-primary"
              onClick={onPlayPause}
              style={{ width: "100%", margin: "0.5rem 0" }}
              onMouseEnter={() => setHoveredButton(`play-${idx}`)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <AnimatedText 
                text={isPlaying ? '[ Pause ]' : '[ Play ]'} 
                isHovered={hoveredButton === `play-${idx}`}
              />
            </button>
          </div>
          ) : (
            <div className="pipboy-blog-list-excerpt">
              <ReactMarkdown>
                {firstParagraphs[idx] || ""}
              </ReactMarkdown>
              <button
                className="btn-primary"
                onClick={() => navigate(`/blog/${blog.slug}`)}
                style={{ width: "100%", margin: "0.5rem 0" }}
                onMouseEnter={() => setHoveredButton(`read-${idx}`)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <AnimatedText 
                  text="[ READ MORE ]" 
                  isHovered={hoveredButton === `read-${idx}`}
                />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blog;