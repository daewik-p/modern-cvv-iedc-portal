
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  description: string;
  registerLink?: string; //optional field for register button
}

export const upcomingEvents: Event[] = [
  {
    id: "GeeksandGiggles",
    title: "Geeks and Giggles : Tech Meme Competition",
    date: "March 4, 2024",
    time: "4:00 PM",
    location: "Online",
    image: "Events/techmeme.webp",
    category: "Online",
    description: "Tech Meme Competition.",
    registerLink: "https://youtu.be/dQw4w9WgXcQ?si=AKFpXRnUgXIhYPQJ",

  },
];

export const pastEvents: Event[] = [
  {
    id: "talesontape",
    title: "Tales on Tape : Vlogging Competition",
    date: "February 6-20, 2024",
    time: "3:00 PM",
    location: "Online",
    image: "Events/tot.webp",
    category: "Online",
    description: "Vlogging Competition.",
  },
  {
    id: "rajagiri",
    title: "Rajagiri IEDC Visit",
    date: "February 10, 2024",
    time: "4:30 PM",
    location: "IEDC-RSET, Rajagiri Valley, Ernakulam",
    image: "Events/rajagiri.jpg",
    category: "Visit",
    description: "RSET IEDC orientation and Incubation Centre Visit.",
  },
  {
    id: "brandyou_01",
    title: "Brand You : LinkedIn Mastery Workshop",
    date: "February 10, 2024",
    time: "3:00 PM",
    location: "LP - A404",
    image: "Events/brand.jpg",
    category: "Internal Workshop",
    description: "A gathering of entrepreneurs and innovators discussing the future of business.",
  },
  {
    id: "cat24",
    title: "Catalyst 2024",
    date: "November 10, 2024",
    time: "2:00 PM",
    location: "LP - A325",
    image: "Events/catalyst.jpg",
    category: "Ideathon",
    description: `Catalyst 2024 - Igniting Innovation at CVV

Catalyst 2024, organized by the Innovation and Entrepreneurship Development Center (IEDC) at CVV, provided a dynamic platform for students to brainstorm, pitch, and refine startup ideas aimed at solving real-world challenges. Held on November 8, 2024, the event brought together aspiring entrepreneurs, expert mentors, and a distinguished panel of judges to foster innovation and critical thinking.

Event Highlights:
- Idea Pitching: 11 teams from IST, EGCS, and PPSH presented innovative solutions ranging from sustainable designs to tech-driven services.
- Expert Feedback: Judges, including Dr. Praveen K M and Dr. Savitesh Madhulika Sharma, provided insights to help teams refine and scale their ideas.
- Collaborative Learning: Participants engaged in hands-on discussions, mentorship sessions, and networking opportunities to strengthen their entrepreneurial vision.

Acknowledgments:
The success of Catalyst 2024 was made possible by the dedication of the IEDC media team, faculty mentors, and student coordinators. Special thanks to Ms. Anupama Jims and Dr. Savitesh M. Sharma, whose guidance shaped the event. Student leaders Krishna K and Rosemary Tomy played a crucial role in organizing and ensuring a seamless experience for all participants.

Catalyst 2024 reinforced CVV's commitment to fostering an entrepreneurial mindset, bridging academia with industry, and empowering students to transform ideas into impactful startups. As the journey continues, the momentum from this event will carry forward into future editions, driving innovation and creativity.`,
  },
];
