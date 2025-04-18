
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
  
];

export const pastEvents: Event[] = [
  {
    id: "GeeksandGiggles",
    title: "Geeks and Giggles : Tech Meme Competition",
    date: "March 4, 2025",
    time: "4:00 PM",
    location: "Online",
    image: "Events/techmeme.webp",
    category: "Online",
    description: `The “Geeks & Giggles – Tech Meme Competition” was a vibrant event designed to foster creativity and humor among students by providing a platform to express their experiences with technology through memes. Held from February 20th to March 4th, the competition encouraged participants to explore relatable tech-themed categories such as “The Wi-Fi Struggle,” “Life of a Developer,” and “Generational Tech Gap”. The event aimed to bridge the gap between technical expertise and lighthearted fun, promoting community, engagement, and innovation.
The competition saw high participation and generated significant buzz on social media. Participants showcased exceptional creativity and humor, producing relatable content that resonated with the student body. The positive feedback from participants highlighted the event’s success in providing an opportunity for creative expression and enjoyment.
Anjana Prakash, the Student Coordinator and Creative and Innovation Sub-Lead, was acknowledged for her exceptional leadership and creative vision in organizing the competition. The event's success has paved the way for future plans to increase participation and introduce new themes, further building on the momentum of “Geeks & Giggles”.
`,
  },
  {
    id: "talesontape",
    title: "Tales on Tape : Vlogging Competition",
    date: "February 6-20, 2025",
    time: "3:00 PM",
    location: "Online",
    image: "Events/tot.webp",
    category: "Online",
    description: `The “Tales on Tape” Vlogging Competition, organized by the Innovation and Entrepreneurship Development Centre (IEDC) of Chinmaya Vishwavidyapeeth, was an online event held from February 6th to 19th, 2025. This competition was designed to ignite student creativity and provide a platform for self-expression through vlogging, with the overarching objectives of fostering creativity, enhancing digital skills, promoting self-expression, building community engagement, showcasing university life, and developing storytelling abilities. The program encouraged students to create 2-5 minute vlogs on themes like “University Experience,” “Events,” “A Day in My Life as a CVVian,” or other creative topics, and submit them via Google Forms.
The online format of “Tales on Tape” facilitated broad participation and allowed students to showcase their diverse talents and perspectives. The event successfully highlighted student skills in video production and editing, with submissions covering various aspects of student life. J Samana of B.tech AIMl 2 won the competition for an outstanding vlog, while consolation prizes were awarded to Theertha C, Luceeta George, Agna Mariya CS, and Benitta Reji.
The success of the competition was largely attributed to the dedication of the IEDC creative team and members. Special acknowledgment was given to student coordinator Anuja S Nair, Creative and Innovation Lead, IEDC CVV, for her pivotal role in organizing the event. Her innovative vision and leadership were crucial in ensuring seamless coordination and fostering an inspiring atmosphere, significantly contributing to the overall success of the event and highlighting the spirit of Chinmaya Vishwavidyapeeth.
`,
  },
  {
    id: "rajagiri",
    title: "Rajagiri IEDC Visit",
    date: "February 10, 2025",
    time: "4:30 PM",
    location: "IEDC-RSET, Rajagiri Valley, Ernakulam",
    image: "Events/rajagiri.jpg",
    category: "Visit",
    description: "RSET IEDC orientation and Incubation Centre Visit.",
  },
  {
    id: "brandyou_01",
    title: "Brand You : LinkedIn Mastery Workshop",
    date: "February 10, 2025",
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
