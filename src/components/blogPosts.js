import radioSilence from "../assets/audio/Radio_Silence.wav";

// Function to create a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

const blogPosts = [
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
  // Add more posts...
];

export default blogPosts;