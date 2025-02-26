
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  description: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "innovation-workshop-2024",
    title: "Innovation Workshop",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Workshop",
    description: "Join us for an intensive workshop on innovation and entrepreneurship. Learn from industry experts about the latest trends and techniques in innovation.",
  },
];

export const pastEvents: Event[] = [
  {
    id: "brandyou_01",
    title: "Brand You : LinkedIn Mastery Workshop",
    date: "February 10, 2024",
    time: "3:00 PM",
    location: "LP - A404",
    image: "Events\brand.jpg",
    category: "Internal Workshop",
    description: "A gathering of entrepreneurs and innovators discussing the future of business.",
  },
  {
    id: "cat24",
    title: "Catalyst 2024",
    date: "November 10, 2024",
    time: "2:00 PM",
    location: "LP - A325",
    image: "Events\catalyst.jpg",
    category: "Ideathon",
    description: "Our first idea pitching competition in collaboration with IIC.",
  },
];
