import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import blogPosts from "../components/blogPosts.js";
import WavesurferPlayer from '@wavesurfer/react';
import AnimatedText from "../components/AnimatedText";
import "../css/Blog.css";
import "../css/UniversalButtons.css";

const BLOG_PATH = "/blogs/";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.slug === id);
  
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  useEffect(() => {
    const fetchMarkdown = async () => {
      setLoading(true);
      if (post && post.file) {
        try {
          const res = await fetch(BLOG_PATH + post.file);
          const text = await res.text();
          setContent(text);
        } catch (error) {
          console.error("Error fetching blog post:", error);
          setContent("Failed to load blog post content.");
        }
      }
      setLoading(false);
    };
    
    fetchMarkdown();
  }, [post]);

  if (!post) {
    return (
      <div className="pipboy-blog-main">
        <div className="pipboy-blog-post">
          <h2>Blog post not found</h2>
          <Link to="/blog" className="pipboy-back-link">
            ← All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pipboy-blog-main">
      <div className="pipboy-blog-post">
        <Link to="/blog" className="pipboy-back-link">
          ← All Blogs
        </Link>
        
        <h1 className="pipboy-blog-post-title">{post.title}</h1>
        <div className="pipboy-blog-post-meta">
          {post.date && <div className="pipboy-blog-post-date">{post.date}</div>}
        </div>
        
        {post.audio ? (
          <div className="pipboy-blog-audio">
            <div className="waveform-responsive">
              <WavesurferPlayer
                height={60}
                progressColor="#ffd52c"
                url={post.audio}
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
              onMouseEnter={() => setHoveredButton('play')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <AnimatedText 
                text={isPlaying ? '[ Pause ]' : '[ Play ]'} 
                isHovered={hoveredButton === 'play'}
              />
            </button>
          </div>
        ) : (
          <div className="pipboy-blog-post-content">
            {loading ? (
              <div className="pipboy-loading">Loading...</div>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;