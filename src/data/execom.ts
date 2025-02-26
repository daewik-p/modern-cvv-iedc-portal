// Types for team member data
export interface ExecomMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export interface ExecomMembers {
  nodalOfficers: ExecomMember[];
  cio: ExecomMember[];
  epl: ExecomMember[];
  qo: ExecomMember[];
  finance: ExecomMember[];
  hiad: ExecomMember[];
  ht: ExecomMember[];
  si: ExecomMember[];
  hd: ExecomMember[];
  rc: ExecomMember[];
  bm: ExecomMember[];
  we: ExecomMember[];
  ipr: ExecomMember[];
  hc: ExecomMember[];
  itd: ExecomMember[];
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
  cio: [
    {
      name: "Krishna K",
      role: "Chief Innovation Officer",
      image: "execom/krishna.jpg",
      linkedin: "https://www.linkedin.com/in/krishnak535",
    }
  ],
  epl: [
    {
      name: "Rosemary Tomy",
      role: "Executive Program Lead",
      image: "execom/rosemary.jpg",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    }
  ],
  ht: [
    {
      name: "Daewik Prasheen",
      role: "Head of Technology",
      image: "/execom/daewik.jpg",
      linkedin: "https://linkedin.com/in/daewik",
    }
  ],
  qo: [
    {
      name: "Gopika V K",
      role: "Head of Quality & Operations",
      image: "execom/gopika.jpg",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Nakshathra S Nair",
      role: "Sub Lead - Quality & Operations",
      image: "execom/nakshathra.jpg",
      linkedin: "https://www.linkedin.com/in/nakshathranaksh"
    }
  ],
  finance: [
    {
      name: "Mathews Varghese",
      role: "Head of Finance",
      image: "execom/mathews.jpg",
      linkedin: "https://www.linkedin.com/in/mathews-varghese"
    }
  ],
  hiad:[
    {
      name: "Anuja S Nair",
      role: "Head of Innovation & Development",
      image: " execom/anuja.jpg",
      linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
    }
  ],
  si:[
    {
      name: "Niranjana Uday",
      role: "Head of Startup Incubation",
      image: "execom/niranjanau.jpg",
      linkedin: "https://www.linkedin.com/in/niranjana-uday/"
    }
  ],
  hd: [
    {
      name: "Bharathi Devi",
      role: "Head of Documentation",
      image: " execom/bharathi.jpg",
      linkedin: "https://www.linkedin.com/in/bharathi47"
    }
  ],
  rc: [
    {
      name: "Anjana Prakash",
      role: "Head of Research & Collaboration",
      image: "execom/anjana.jpg",
      linkedin: "https://www.linkedin.com/in/anjanaprakash017"
    }
  ],
  bm: [
    {
      name: "Aarcha Praveen",
      role: "Head of Branding & Marketing",
      image: "execom/aarcha.jpg",
      linkedin: "http://www.linkedin.com/in/aarchapraveen012"
    },
    {
      name: "Potla Akhil",
      role: "Branding & Marketing",
      image: "execom/akhil.jpg",
      linkedin: "http://www.linkedin.com/in/akhil0719"
    },
    {
      name: "M Rudra Varma",
      role: "Branding & Marketing",
      image: " execom/rudra.jpg",
      linkedin: "https://www.linkedin.com/in/mrudravarmaa"
    }
  ],
  we: [
    {
      name: "Anagha Suresh",
      role: "Head of Women Entrepreneurship",
      image: "execom/anagha.jpg",
      linkedin: "http://www.linkedin.com/in/anaghasuresh04"
    },
    {
      name: "Sona Monichen",
      role: "Women Entrepreneurship",
      image: "execom/sona.JPG",
      linkedin: "https://www.linkedin.com/in/sona-monichen-23a830313/"
    }
  ],
  hc: [
    {
      name: "Nayana Anna Biju",
      role: "Head of Community",
      image: "execom/nayana.jpg",
      linkedin: "https://www.linkedin.com/in/nayana-anna-biju-454903255"
    }
  ],
  ipr: [
    {
      name: "Gowri Gopika",
      role: "Head of IPR",
      image: "execom/gowri.jpg",
      linkedin: "https://www.linkedin.com/in/gowri-gopika-"
    } 
  ],
  itd: [
    {
      name: "Niranjana Gireesh",
      role: "Head of Internship & Talent Development",
      image: "execom/niranjanag.jpg",
      linkedin: "https://www.linkedin.com/in/niranjanagireesh0410"
    }, 
    {
      name: "Akshara U",
      role: "Internship & Talent Development",
      image: "execom/akshara.jpg",
      linkedin: ""
    }
    ]
  };