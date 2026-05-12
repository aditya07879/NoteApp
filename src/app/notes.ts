export type Note = {
  id: number;
  heading: string;
  description: string;
  tag: string;
  date: string;
};

const notes: Note[] = [
  {
    id: 1,
    heading: "Learn React Hooks",
    date: "01/05/2025",
    description: "Studied useState, useEffect, and custom hooks with practical examples.",
    tag: "React"
  },
  {
    id: 2,
    heading: "MongoDB Schema Design",
    date: "02/05/2025",
    description: "Created optimized schemas for user roles and permissions.",
    tag: "MongoDB"
  },
  {
    id: 3,
    heading: "Build Resume Generator",
    date: "03/05/2025",
    description: "Integrated Gemini API for AI-generated resume content.",
    tag: "Project"
  },
  {
    id: 4,
    heading: "Authentication Setup",
    date: "04/05/2025",
    description: "Implemented Google OAuth2 login with JWT authentication.",
    tag: "Backend"
  },
  {
    id: 5,
    heading: "Dijkstra Algorithm Practice",
    date: "05/05/2025",
    description: "Built shortest path logic for map-based project.",
    tag: "DSA"
  },
  {
    id: 6,
    heading: "Hashnode Blog Integration",
    date: "06/05/2025",
    description: "Fetched blogs dynamically using GraphQL API.",
    tag: "API"
  },
  {
    id: 7,
    heading: "Portfolio UI Improvements",
    date: "07/05/2025",
    description: "Improved typography and layout consistency.",
    tag: "Design"
  },
  {
    id: 8,
    heading: "UNIX Architecture Notes",
    date: "08/05/2025",
    description: "Prepared notes on Shell, Kernel, and Hardware layers.",
    tag: "OS"
  },
  {
    id: 9,
    heading: "Virtual DOM Revision",
    date: "09/05/2025",
    description: "Revised reconciliation and rendering optimization.",
    tag: "React"
  },
  {
    id: 10,
    heading: "Express MVC Refactor",
    date: "10/05/2025",
    description: "Refactored backend using MVC architecture.",
    tag: "Express"
  }
];

export default notes;