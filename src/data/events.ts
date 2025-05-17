
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
    id: "Catalyst2025",
    title: "Catalyst Phase 2",
    date: "June 9, 2025",
    time: "2.00 PM",
    location: "Online-Zoom",
    image: "Events/CATALYST.webp",
    category: "Competition",
    registerLink: "https://forms.gle/6Vh6cxziRznVqox19",
    description: `Catalyst 2025, organized by the Innovation and Entrepreneurship Development Center (IEDC) at CVV, is an ideathon designed to foster innovation and entrepreneurial thinking among students. The event provides a platform for participants to pitch creative startup ideas addressing real-world challenges. With teams from various disciplines, the competition features insightful mentorship sessions, expert feedback, and collaborative discussions that help refine and shape promising business concepts.
`,
  }
];

export const pastEvents: Event[] = [
  {
    id: "Aarohi",
    title: "Aarohi : Ascending Beyond Limits",
    date: "March 7, 2025",
    time: "9.45 AM",
    location: "LP Atrium",
    image: "Events/aarohi.webp",
    category: "Celebration",
    description: `CVV-IEDC and IIC hosted AAROHI: Ascending Beyond Limits at the LP Atrium, bringing together over 220 participants for an inspiring Women’s Day celebration. Centered around the theme "Empower, Inspire, Elevate," the event created a vibrant platform to honor women's achievements, encourage leadership, and drive conversations on gender equality. The day began with a ceremonial lamp lighting, followed by a warm welcome from Dr. Sunitha Grandhee and a presidential address by Prof. Ajay Kapoor, who emphasized the role of education in women's empowerment. Ms. Sujata Madhav Chandran, Global Head at TCS, delivered the inaugural address, highlighting the importance of fostering inclusive ecosystems and recognizing women’s contributions in every sphere.

The celebration continued with a spirited dance performance by students from the Institute of Science and Technology, choreographed by Akshara M. K, and a dynamic session by Ms. Raji P, founder of RastelX Technologies, who spoke on breaking barriers in technology and empowering women entrepreneurs. A cultural performance led by students from B.Tech Cyber Security added to the festive atmosphere, followed by an insightful talk by Dr. Usha Narayanan on women in business, leadership, and the significance of financial independence and mental wellness. Post-lunch sessions featured exciting competitions such as the Exit or Extinct escape room challenge, the EmpowHER idea-pitching event, and the Battle of Brains quiz, celebrating the achievements of women across various domains. The day concluded with a lively prize distribution ceremony and a cultural showcase led by Aadarsh P. Hareesh and team, leaving the audience inspired and energized.

With the efforts of faculty coordinator Dr. Uma Narayanan and student coordinators Krishna K and Anagha Suresh, Aarohi 2025 stood out as a memorable celebration of empowerment, leadership, and progress, marking another milestone in CVV’s journey toward fostering gender equality and innovation.
`,
  },
  {
    id: "SheLeads",
    title: "She Leads : Women in Business",
    date: "March 7, 2025",
    time: "11.45 AM",
    location: "LP Atrium",
    image: "Events/sheleads.webp",
    category: "Talk Session",
    description: `As part of the Aarohi 2025 celebrations, CVV-IEDC hosted SheLeads: Women in Business, an inspiring offline session on March 7, 2025, bringing together 90 participants eager to learn and grow. The session featured a powerful talk by Dr. Usha Narayanan, who drew from her rich background in dentistry, psychology, and entrepreneurship to offer a holistic perspective on women’s leadership journeys. Addressing critical themes such as financial independence, decision-making, resilience, and emotional intelligence, Dr. Usha captivated the audience with real-life examples and practical insights.

SheLeads wasn’t just about leadership in theory; it delved into the realities of navigating male-dominated industries, the transformative impact of women-led startups, and the crucial link between mental well-being and professional success. The interactive Q&A session that followed enabled participants to engage deeply on topics like work-life balance, career planning, and self-confidence, making the event even more impactful.

Expertly coordinated by Dr. Uma Narayanan and student coordinator Ms. Gowri Gopika, SheLeads was a transformational experience that ignited ambition and reinforced the spirit of Aarohi—empowering, inspiring, and elevating women to lead with passion and purpose.`,
  },
  {
    id: "WomenInTech",
    title: "Women in Tech : Empowering Future",
    date: "March 7, 2025",
    time: "10.45 AM",
    location: "LP Atrium",
    image: "Events/womenintech.webp",
    category: "Talk Session",
    description: `As part of the Aarohi 2025 celebrations, CVV-IEDC organized the impactful session Women in Tech: Powering the Future on March 7, 2025, gathering 90 participants for an afternoon of inspiration and learning. The event featured Ms. Raji P, a dynamic tech entrepreneur and advocate for women in STEM, who shared her powerful journey of breaking barriers and leveraging technology for social good. Through stories of her ventures like Village Zone—an e-commerce platform empowering rural women—and Companion SOS—a mobile safety app—Ms. Raji illustrated how innovation can create meaningful change.

She emphasized the importance of venturing into emerging domains like Artificial Intelligence, Cybersecurity, and IoT, and encouraged the audience to actively seek mentorship, invest in continuous learning, and build strong professional networks. Breaking gender stereotypes, promoting digital literacy, and fostering inclusive ecosystems were key themes that resonated throughout the session. An engaging Q&A session further fueled the energy, with students delving into discussions on startup strategies, women-focused tech communities, and carving successful paths in AI and cybersecurity.

Expertly coordinated by Dr. Uma Narayanan and student coordinator Ms. Bharathi Devi Vipparthi, Women in Tech was a defining moment of Aarohi 2025—lighting the way for future women leaders to not just participate in, but lead, the tech revolution`,
  },
  {
    id: "ExitorExtinct",
    title: "Exit or Extinct : Escape Room Challenge",
    date: "March 7, 2025",
    time: "02:00 PM",
    location: "LP Academic Block",
    image: "Events/exitorextinct.webp",
    category: "Competition",
    description: `As part of the Aarohi Women's Day celebrations, CVV-IEDC and IIC hosted an exciting escape room competition titled Exit or Extinct at the LP Academic Block. Designed to challenge the participants' problem-solving skills, logical reasoning, and teamwork under pressure, the event offered a thrilling and dynamic experience. Set against the backdrop of an imagined extinction event, participants were tasked with navigating through a series of intricate puzzles, coded messages, and physical tasks, all while racing against time.

Each team worked collaboratively to decode clues, devise strategies, and unlock challenges within a limited timeframe, demonstrating sharp thinking, creativity, and strong coordination. The sense of urgency infused into the simulation kept the energy levels high, making it one of the most engaging activities of the day. Judging was based on the time taken to escape, the level of collaboration, innovation in problem-solving, and overall strategy. With 50 participants showcasing impressive skills and teamwork, “Exit or Extinct” emerged as a major highlight of Aarohi 2025, leaving a lasting impact on everyone involved.

The event was expertly coordinated by Dr. Uma Narayanan, along with student coordinators Ms. Anagha Suresh and Ms. Nakshathra S, ensuring smooth execution and a memorable experience for all.`,
  },
  {
    id: "EmpowHER",
    title: "EmpowHER : Problem Solving Competition",
    date: "March 7, 2025",
    time: "02:00 PM",
    location: "LP - A212",
    image: "Events/empowher.webp",
    category: "Competition",
    description: `As part of the Aarohi Women’s Day celebrations, CVV-IEDC and IIC organized EmpowHER, a dynamic problem-solving competition held on March 7, 2025, at LP – A-212. Designed to spark innovation rooted in empathy, the event challenged participants to address real-world challenges faced by women through tech-enabled and inclusive solutions. Working in small, focused teams, students engaged deeply with issues affecting women’s everyday lives, brainstorming creative, human-centered ideas under the guidance of mentors and pitching their solutions before an expert jury comprising Mr. Sharath from the Department of Mechanical Engineering and Mr. Arghyadeep Gosh from the Department of Computer Science, CVV-IST.

EmpowHER stood out by pushing students to design with empathy—encouraging them to truly understand the struggles of women and translate those insights into actionable, scalable ideas. From digital safety innovations to inclusive platforms supporting women entrepreneurs, the pitches reflected a strong blend of purpose-driven creativity and practical impact. The competition created a space where collaboration, compassion, and critical thinking thrived, making it a deeply meaningful part of the Women’s Day celebrations.

With expert coordination by Dr. Uma Narayanan, along with student leaders Ms. Sona Monichen and Ms. Niranjana Uday, EmpowHER successfully showcased the powerful change that young innovators can drive when inspired by empathy and guided by vision.`,
  },
  {
    id: "BattleofBrains",
    title: "Battle of Brains : Quiz Competition",
    date: "March 7, 2025",
    time: "02:00 PM",
    location: "LP Atrium",
    image: "Events/battleofbrains.webp",
    category: "Competition",
    description: `As part of the vibrant Aarohi 2025 Women's Day celebrations, CVV-IEDC and IIC hosted Battle of Brains, an engaging quiz competition on March 7, 2025, at the LP Atrium. Designed to challenge participants’ knowledge and critical thinking, the event explored themes around women-led innovations, gender equality, and the transformative contributions of women changemakers worldwide. Participants, organized into spirited teams, navigated through multiple thematic rounds that celebrated the achievements of trailblazing women, historic milestones, and the ongoing journey toward equality.

Battle of Brains was more than just a contest of quick recall—it created a dynamic environment where intellect, awareness, and empowerment converged. The quiz fostered lively discussions, showcased strategic thinking, and highlighted stories that continue to inspire generations. The enthusiastic participation from both contestants and the audience added to the electric atmosphere, making it a memorable and impactful experience.

Expertly coordinated by Dr. Uma Narayanan and student coordinator Ms. Rosemary Tomy, the event stood as a true celebration of knowledge, spirit, and the power of learning to drive positive change.`,
  },
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
    category: "Collaboration",
    description: "On February 19, 2025, the Innovation and Entrepreneurship Development Centre (IEDC) and Institution's Innovation Council (IIC) of Chinmaya Vishwa Vidyapeeth (CVV) organized an exploratory visit to the Rajagiri School of Engineering and Technology (RSET), Kakkanad. The visit aimed to offer the newly appointed executive committee members valuable insights into how RSET’s IEDC and IIC collaborate to drive innovation and entrepreneurship within their institution. Led by dignitaries including Mr. Nitheesh Kurian, Nodal Officer of IEDC-RSET, the session opened with a detailed presentation on the organizational structure, roles, and best practices followed by their vibrant innovation ecosystem. An engaging role-based interaction session allowed CVV’s team to openly dialogue with RSET’s IEDC and IIC members, fostering a dynamic exchange of ideas, responsibilities, and visions for student-driven innovation. This hands-on exposure was instrumental in helping participants gain clarity about their own roles and responsibilities, while also sparking ideas for cross-institutional collaboration. The visit concluded with a tour of the Rajagiri Incubation Centre, currently under development, giving participants a glimpse into the infrastructural strategies essential for nurturing startups and innovation hubs.Guided by faculty coordinators Ms. Anupama Jims, Dr. Savitesh M Sharma, and Dr. Deepu Benson, along with student coordinator Mr. Krishna K, the visit proved to be a milestone moment for CVV’s IEDC and IIC teams. It strengthened their commitment to building a thriving entrepreneurial culture at CVV, inspired by the best practices and visionary leadership observed at RSET.",
  },
  {
    id: "brandyou_01",
    title: "Brand You : LinkedIn Mastery Workshop",
    date: "February 10, 2025",
    time: "3:00 PM",
    location: "LP - A404",
    image: "Events/brand.jpg",
    category: "Internal Workshop",
    description: "On February 10, 2025, CVV's Innovation and Entrepreneurship Development Centre (IEDC) hosted the “Brand You: LinkedIn Mastery” workshop at LP A-404, bringing together 36 enthusiastic participants eager to strengthen their digital professional identity. In today's competitive and network-driven world, the workshop aimed to equip students with practical tools to establish a compelling presence on LinkedIn — the global hub for career growth and professional opportunities.The session began with a warm welcome by Gayathi M R (First Year, B.Tech Computer Science), who introduced the importance of digital identity in modern careers. Dr. Raisun Mathew, Assistant Professor at CVV-IST, led the core session, offering in-depth guidance on creating and optimizing a standout LinkedIn profile. Through a step-by-step walkthrough, Dr. Raisun covered key areas such as writing impactful headlines and summaries, showcasing skills and achievements, and leveraging LinkedIn’s visibility tools for maximum professional reach. Students engaged in real-time profile updates, receiving immediate feedback that made the workshop highly interactive and hands-on.Participants left with actionable takeaways: understanding LinkedIn’s algorithm, profile-building hacks to capture recruiter attention, professional networking etiquette, and motivation to nurture a consistent personal brand. The energy and engagement throughout the session highlighted the students’ eagerness to step into the digital professional world with confidence. Coordinated by Ms. Anupama Jims (Faculty Coordinator) and Mr. Krishna K (Student Coordinator), Brand You: LinkedIn Mastery proved to be a transformative experience — empowering students to strategically position themselves for future opportunities and success.",
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
