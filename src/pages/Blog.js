import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import blogPosts from "../components/blogPosts.js";
import WavesurferPlayer from '@wavesurfer/react'
import "../css/Blog.css"


const BLOG_PATH = "/blogs/";


const Blog = () => {
  const [contents, setContents] = useState([]);

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
    };
    fetchAllMarkdown();
  }, []);

  return (
    <div className="pipboy-blog-main">
      {blogPosts.map((blog, idx) => (
        <div className="pipboy-blog-list-post" key={idx}>
          <div className="pipboy-blog-list-title">{blog.title}</div>
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
              className="pipboy-audio-btn"
              onClick={onPlayPause}
              style={{ width: "100%", margin: "0.5rem 0" }}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          ) : (
            <div className="pipboy-blog-list-excerpt">
              <ReactMarkdown>
                {contents[idx]
                  ? contents[idx].slice(0, 400) +
                    (contents[idx].length > 400 ? "..." : "")
                  : ""}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blog;