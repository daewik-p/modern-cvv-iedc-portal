
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
    date: "November 08, 2024",
    time: "2:00 PM",
    location: "LP - A325",
    image: "Events/catalyst.jpg",
    category: "Ideathon",
    description: "Catalyst 2024, organized by the Innovation and Entrepreneurship Development Center (IEDC) at CVV, was an ideathon designed to foster innovation and entrepreneurial thinking among students. Held on November 8, 2024, the event provided a platform for participants to pitch creative startup ideas addressing real-world challenges. With 11 teams from various disciplines, the competition featured insightful mentorship sessions, expert feedback, and collaborative discussions that helped refine and shape promising business concepts. \n\n\n\nGuided by an esteemed panel of judges, including Dr. Praveen K M and Dr. Savitesh Madhulika Sharma, the participants received valuable insights to improve and scale their ideas. The success of Catalyst 2024 was made possible by the dedication of the IEDC team, faculty mentors, and student coordinators, with Krishna K and Rosemary Tomy playing key leadership roles. The event reinforced CVV's commitment to fostering an entrepreneurial ecosystem, bridging academia with industry, and inspiring students to turn ideas into impactful startups.",
  },
];
