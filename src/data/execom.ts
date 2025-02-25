// Types for team member data
export interface ExecomMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  studentLeads: ExecomMember[];
  correspondingLeads: ExecomMember[];
}

// Team member data
export const execomMembers: ExecomMembers = {
  nodalOfficers: [
    {
      name: "Mrs. Anupama Jims",
      role: "Nodal Officer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      linkedin: "https://linkedin.com/in/example",
    },
  ],
  studentLeads: [
    {
      name: "Krishna K",
      role: "Chief Innovation Officer",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      linkedin: "https://www.linkedin.com/in/krishnak535",
    },
    {
      name: "Rosemary Tomy",
      role: "Executive Program Lead",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Daewik Prasheen",
      role: "Head of Technology",
      image: "/execom/daewik.jpg",
      linkedin: "https://linkedin.com/in/daewik",
    },  
    {
      name: "Gopika V K",
      role: "Head of Quality & Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Mathews Varghese",
      role: "Head of Finance",
      image: "file",
      linkedin: "https://www.linkedin.com/in/mathews-varghese"
    },
    {
      name: "Anuja S Nair",
      role: "Head of Innovation & Development",
      image: "file",
      linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
    },
    {
      name: "Niranjana Uday",
      role: "Head of Startup Incubation",
      image: "file",
      linkedin: "https://www.linkedin.com/in/niranjana-uday/"
    },
    {
      name: "Bharathi Devi",
      role: "Head of Documentation",
      image: "file",
      linkedin: "https://www.linkedin.com/in/bharathi47"
    },
    {
      name: "Anjana Prakash",
      role: "Head of Research & Collaboration",
      image: "file",
      linkedin: "https://www.linkedin.com/in/anjanaprakash017"
    },
    {
      name: "Aarcha Praveen",
      role: "Head of Branding & Marketing",
      image: "file",
      linkedin: "http://www.linkedin.com/in/aarchapraveen012"
    },
    {
      name: "Anagha Suresh",
      role: "Head of Women Entrepreneurship",
      image: "file",
      linkedin: "http://www.linkedin.com/in/anaghasuresh04"
    },
    {
      name: "Nayana Anna Biju",
      role: "Head of Community",
      image: "file",
      linkedin: "https://www.linkedin.com/in/nayana-anna-biju-454903255"
    },
    {
      name: "Gowri Gopika",
      role: "Head of IPR",
      image: "file",
      linkedin: "https://www.linkedin.com/in/gowri-gopika-"
    },
    {
      name: "Niranjana Gireesh",
      role: "Head of Internship & Talent Development",
      image: "file",
      linkedin: "https://www.linkedin.com/in/niranjanagireesh0410"
    },  
  ],
  correspondingLeads: [
    {
      name: "Nakshathra S Nair",
      role: "Quality & Operations",
      image: "file",
      linkedin: "https://www.linkedin.com/in/nakshathranaksh"
    },
    {
      name: "Sona Monichen",
      role: "Women Entrepreneurship",
      image: "file",
      linkedin: "https://www.linkedin.com/in/sona-monichen-23a830313/"
    },
    {
      name: "Akshara U",
      role: "Internship & Talent Development",
      image: "file",
      linkedin: ""
    },
    {
      name: "Potla Akhil",
      role: "Branding & Marketing",
      image: "file",
      linkedin: "http://www.linkedin.com/in/akhil0719"
    },
    {
      name: "M Rudra Varma",
      role: "Branding & Marketing",
      image: "file",
      linkedin: "https://www.linkedin.com/in/mrudravarmaa"
    },
  ],
};