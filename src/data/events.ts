
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
    id: "entrepreneurship-summit-2023",
    title: "Entrepreneurship Summit 2023",
    date: "December 10, 2023",
    time: "9:00 AM",
    location: "Conference Hall",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Summit",
    description: "A gathering of entrepreneurs and innovators discussing the future of business.",
  },
];
