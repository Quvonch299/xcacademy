export const mockCurrentUser = {
  id: 1,
  name: "Quvonch Muminov",
  email: "quvonch@example.com",
  role: "admin", // "user" ham bo‘lishi mumkin
  image: "https://i.pravatar.cc/150?img=3",
  courses: [
    {
      id: 1,
      title: "React Basics",
      videos: [
        {
          title: "Introduction to React",
          url: "https://www.youtube.com/embed/dGcsHMXbSOA",
          progress: 40,
        },
        {
          title: "React Components",
          url: "https://www.youtube.com/embed/Ke90Tje7VS0",
          progress: 20,
        },
      ],
    },
    {
      id: 2,
      title: "Next.js Advanced",
      videos: [
        {
          title: "Next.js Routing",
          url: "https://www.youtube.com/embed/1WmNXEVia8I",
          progress: 10,
        },
        {
          title: "API Routes in Next.js",
          url: "https://www.youtube.com/embed/Mt1bmsFqR34",
          progress: 0,
        },
      ],
    },
    {
      id: 3,
      title: "Tailwind CSS",
      videos: [
        {
          title: "Getting Started with Tailwind",
          url: "https://www.youtube.com/embed/dFgzHOX84xQ",
          progress: 70,
        },
        {
          title: "Responsive Design",
          url: "https://www.youtube.com/embed/6zIuAyLZPH0",
          progress: 50,
        },
      ],
    },
  ],
};

export const mockUsers = [
  { id: 2, name: "Ali", email: "ali@example.com" },
  { id: 3, name: "Sara", email: "sara@example.com" },
  { id: 4, name: "Bek", email: "bek@example.com" },
];