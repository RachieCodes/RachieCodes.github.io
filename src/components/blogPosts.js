import radioSilence from "../assets/audio/Radio_Silence.wav";
import complicated from "../assets/audio/complicated.mp3";

// Function to create a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-'); 
};

const blogPosts = [
    {
    title: "Complicated - Avril Lavigne",
    date: "02-03-2026",
    audio: complicated,
    slug: "complicated-avril-lavigne",
  },
  {
    title: "Why Every Developer Needs a Side Quest",
    date: "10-02-2025",
    file: "developer-side-quests.md",
    audio: null,
    slug: "developer-side-quests",
  },
  {
    title: "Ramblings of a Dev - Portfolio Launch",
    date: "07-08-2025",
    file: "firstBlog.md",
    audio: null,
    slug: "ramblings-of-a-dev-portfolio-launch",
  },
  {
    title: "Radio Silence - Alice Oseman",
    date: "07-08-2025",
    audio: radioSilence,
    slug: "radio-silence-alice-oseman",
  },
];

export default blogPosts;