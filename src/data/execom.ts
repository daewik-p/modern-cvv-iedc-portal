// Types for team member data
export interface ExecomMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  iph: ExecomMember[];
  crl: ExecomMember[];
  sl: ExecomMember[];
}

// Team member data
export const execomMembers: ExecomMembers = {
  nodalOfficers: [
    {
      name: "Mrs. Anupama Jims",
      role: "Nodal Officer",
      image: "execom/anupamaji.jpg",
      linkedin: "https://www.linkedin.com/in/anupamajims",
    },
    {
      name: "Dr. Savitesh M Sharma",
      role: "Nodal Officer",
      image: "execom/saviteshji.jpg",
      linkedin: "https://www.linkedin.com/in/savitesh-sharma-383a115",
    },
  ],
  iph: [
    {
      name: "Krishna K",
      role: "Chief Innovation Officer",
      image: "execom/krishna.jpg",
      linkedin: "https://www.linkedin.com/in/krishnak535",
    },
    {
      name: "Rosemary Tomy",
      role: "Executive Program Lead",
      image: "execom/rosemary.jpg",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    }
  ],
  crl: [
    {
      name: "Gopika V K",
      role: "Head of Quality & Operations",
      image: "execom/gopika.jpg",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Mathews Varghese",
      role: "Head of Finance",
      image: "execom/mathews.jpg",
      linkedin: "https://www.linkedin.com/in/mathews-varghese"
    },
    {
      name: "Anuja S Nair",
      role: "Head of Innovation & Development",
      image: " execom/anuja.jpg",
      linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
    },
    {
      name: "Niranjana Uday",
      role: "Head of Startup Incubation",
      image: "execom/niranjanau.jpg",
      linkedin: "https://www.linkedin.com/in/niranjana-uday/"
    },
    {
      name: "Bharathi Devi",
      role: "Head of Documentation",
      image: " execom/bharathi.jpg",
      linkedin: "https://www.linkedin.com/in/bharathi47"
    },
    {
      name: "Anjana Prakash",
      role: "Head of Research & Collaboration",
      image: "execom/anjana.jpg",
      linkedin: "https://www.linkedin.com/in/anjanaprakash017"
    },
    {
      name: "Aarcha Praveen",
      role: "Head of Branding & Marketing",
      image: "execom/aarcha.jpg",
      linkedin: "http://www.linkedin.com/in/aarchapraveen012"
    },
    {
      name: "Anagha Suresh",
      role: "Head of Women Entrepreneurship",
      image: "execom/anagha.jpg",
      linkedin: "http://www.linkedin.com/in/anaghasuresh04"
    },
    {
      name: "Nayana Anna Biju",
      role: "Head of Community",
      image: "execom/nayana.jpg",
      linkedin: "https://www.linkedin.com/in/nayana-anna-biju-454903255"
    },
    {
      name: "Gowri Gopika",
      role: "Head of IPR",
      image: "execom/gowri.jpg",
      linkedin: "http://www.linkedin.com/in/gowri-gopika-041bb0296"
    },
    {
      name: "Niranjana Gireesh",
      role: "Head of Internship & Talent Development",
      image: "execom/niranjanag.jpg",
      linkedin: "https://www.linkedin.com/in/niranjanagireesh0410"
    }
  ],
  sl: [
    {
      name: "Nakshathra S Nair",
      role: "Sub Lead - Quality & Operations",
      image: "execom/nakshathra.jpg",
      linkedin: "https://www.linkedin.com/in/nakshathranaksh"
    },
    {
      name: "Potla Akhil",

      role: "Sub-Lead of Branding & Marketing",
      image: "execom/akhil.jpg",
      linkedin: "http://www.linkedin.com/in/akhil0719"
    },
    {
      name: "M Rudra Varma",
      role: "Sub-Lead of Branding & Marketing",
      image: " execom/rudra.jpg",
      linkedin: "https://www.linkedin.com/in/mrudravarmaa"
    },
    {
      name: "Sona Monichen",
      role: "Sub-Lead of Women Entrepreneurship",
      image: "execom/sona.jpg",
      linkedin: "https://www.linkedin.com/in/sona-monichen-23a830313/"
    },
    {
      name: "Akshara U",
      role: "Sub-Lead of Internship & Talent Development",
      image: "execom/akshara.jpg",
      linkedin: ""
    }
  ],
};