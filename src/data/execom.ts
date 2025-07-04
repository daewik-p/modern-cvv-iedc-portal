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
export const execomMembers  : ExecomMembers = {
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
      name: "Anjana Prakash",
      role: "Head of Research & Collaboration",
      image: "execom/anjana.jpg",
      linkedin: "https://www.linkedin.com/in/anjanaprakash017"
    },
    {
      name: "Anuja S Nair",
      role: "Head of Innovation & Development",
      image: " execom/anuja.jpg",
      linkedin: "https://www.linkedin.com/in/anuja-s-nair-777315322"
    },
    {
      name: "Bharathi Devi",
      role: "Head of Documentation",
      image: " execom/bharathi.jpg",
      linkedin: "https://www.linkedin.com/in/bharathi47"
    },
    {
      name: "Daewik Prasheen",
      role: "Head of Technology",
      image: " execom/daewik.jpg",
      linkedin: "https://www.linkedin.com/in/daewik"
    },
    {
      name: "Gopika V K",
      role: "Head of Quality & Operations",
      image: "execom/gopika.jpg",
      linkedin: "https://linkedin.com/in/rosemarytomy1212",
    },
    {
      name: "Gowri Gopika",
      role: "Head of IPR",
      image: "execom/gowri.jpg",
      linkedin: "http://www.linkedin.com/in/gowri-gopika-041bb0296"
    },
    {
      name: "Mathews Varghese",
      role: "Head of Finance",
      image: "execom/mathews.jpg",
      linkedin: "https://www.linkedin.com/in/mathews-varghese"
    },
    {
      name: "Nayana Anna Biju",
      role: "Head of Community",
      image: "execom/nayana.jpg",
      linkedin: "https://www.linkedin.com/in/nayana-anna-biju-454903255"
    },
    {
      name: "Niranjana Gireesh",
      role: "Head of Internship & Talent Development",
      image: "execom/niranjanag.jpg",
      linkedin: "https://www.linkedin.com/in/niranjanagireesh0410"
    },
    {
      name: "Niranjana Uday",
      role: "Head of Startup Incubation",
      image: "execom/niranjanau.jpg",
      linkedin: "https://www.linkedin.com/in/niranjana-uday/"
    }
  ],
  sl: [
    {
      name: "Akshara U",
      role: "Sub-Lead of Internship & Talent Development",
      image: "execom/akshara.jpg",
      linkedin: ""
    },
    {
      name: "Amrutha S Nair",
      role: "Sub-Lead of Research & Collaboration",
      image: "execom/amrutha.jpg",
      linkedin: "https://www.linkedin.com/in/amruthasn"
    },
    {
      name: "Nakshathra S Nair",
      role: "Sub Lead - Quality & Operations",
      image: "execom/nakshathra.jpg",
      linkedin: "https://www.linkedin.com/in/nakshathranaksh"
    },
    {
      name: "Sona Monichen",
      role: "Sub-Lead of Women Entrepreneurship",
      image: "execom/sona.jpg",
      linkedin: "https://www.linkedin.com/in/sona-monichen-23a830313/"
    }
    
  ],
};
export const mediaTeamMembers: ExecomMembers = {
  nodalOfficers: [],
  iph: [
    {
      name: "Potla Akhil ",
      role: "Media Team Member",
      image: "execom/akhil.jpg",
      linkedin: "https://linkedin.com/in/potla-akhil-0b1a5a1b6"
    },
    {
      name: "Anandhu Prakash ",
      role: "Media Team Member",
      image: "execom/anandhu.jpg",
      linkedin: "https://www.linkedin.com/in/s-anandhu-prakash-b1b224320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Farsana N S ",
      role: "Media Team Member",
      image: "execom/farsana.jpg",
      linkedin: "https://www.linkedin.com/in/farsana-ns-92294a323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    {
      name: "Namitha Manoj",
      role: "Media Team Member",
      image: "execom/namitha.jpg",
      linkedin: "https://www.linkedin.com/in/namitha-manoj-42936032a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Titus M Sunil",
      role: "Media Team Member",
      image: "execom/titus.jpg",
      linkedin: "https://www.linkedin.com/in/titus-m-sunil",
    },


  ],
  crl: [],
  sl: []
};
export const createTeamMembers: ExecomMembers = {
  nodalOfficers: [],
  iph: [],
  crl: [
    {
      name: "Fathima Nasrin C P",
      role: "Create Team Member",
      image: "execom/nasrin.jpg",
      linkedin: "https://www.linkedin.com/in/fathima-nasrin-c-p-743293322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Mohammed Midhilaj",
      role: "Create Team Member",
      image: "execom/midhilaj.jpg",
      linkedin: "https://www.linkedin.com/in/mohammed-midhilaj-024936301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Abhijith P Ajith",
      role: "Create Team Member",
      image: "execom/abhijith.jpg",
      linkedin: "https://www.linkedin.com/in/abhijithpajith-tech?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Saparya Swaroop",
      role: "Create Team Member",
      image: "execom/saparya.jpg",
      linkedin: "https://in.linkedin.com/in/saparya-swaroop-0a515b323",
    },
    {
      name: "Adithya M",
      role: "Create Team Member",
      image: "execom/adithya.jpg",
      linkedin: "https://www.linkedin.com/in/adithya-m-ba4858274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ],
  sl: []
};
export const orbitTeamMembers: ExecomMembers = {
  nodalOfficers: [],
  iph: [],
  crl: [],
  sl: [
    {
      name: "Vishnu R Das",
      role: "Orbit Team Member",
      image: "execom/vishnu.jpg",
      linkedin: "https://www.linkedin.com/in/rdvishnu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Rohana K Ajesh",
      role: "Orbit Team Member",
      image: "execom/rohana.jpg",
      linkedin: "https://www.linkedin.com/in/rohana-k-ajesh-041711364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Darsana A",
      role: "Orbit Team Member",
      image: "execom/darsana.jpg",
      linkedin: "https://www.linkedin.com/in/darsana-a-125565321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Vaishnav Darsan",
      role: "Orbit Team Member",
      image: "execom/vaishnav.jpg",
      linkedin: "https://www.linkedin.com/in/vaishnav-darsan-952645323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Sachin R",
      role: "Orbit Team Member",
      image: "execom/sachin.jpg",
      linkedin: "https://www.linkedin.com/in/sachin-r-15612a323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Sayooj Sunil Kumar",
      role: "Orbit Team Member",
      image: "execom/sayooj.jpg",
      linkedin: "https://www.linkedin.com/in/sayooj-sunil-kumar-9a5b29323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Varsha S Kumar",
      role: "Orbit Team Member",
      image: "execom/varsha.jpg",
      linkedin: "https://www.linkedin.com/in/varsha-s-kumar-563aa5353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    
  ]
};
