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
      name: "Dr. Anoop V S",
      role: "Nodal Officer",
      image: "/execom/Anoop_Sir.jpg",
      linkedin: "https://www.linkedin.com/in/anoop-v-s-054a3b27/",
    },
    {
      name: "Dr. Jiji Anna Idicula",
      role: "Nodal Officer",
      image: "/execom/Jiji_ मैम.jpg",
      linkedin: "https://www.linkedin.com/in/jiji-anna-idicula-61794128/",
    },
  ],
  studentLeads: [
    {
      name: "Abhishek S Nair",
      role: "Student Lead",
      image: "/execom/Abhishek.jpg",
      linkedin: "https://www.linkedin.com/in/abhishek-s-nair-25074622a/",
    },
    {
      name: "Gopikrishnan K S",
      role: "Student Lead",
      image: "/execom/Gopikrishnan.jpg",
      linkedin: "https://www.linkedin.com/in/gopikrishnan-k-s-82444a220/",
    },
    {
      name: "Sreelakshmi M",
      role: "Student Lead",
      image: "/execom/Sreelakshmi.jpg",
      linkedin: "https://www.linkedin.com/in/sreelakshmi-m-b43931229/",
    },
  ],
  correspondingLeads: [
    {
      name: "Sidharth S",
      role: "Corresponding Lead",
      image: "/execom/Sidharth.jpg",
      linkedin: "https://www.linkedin.com/in/sidharth-s-969839229/",
    },
    {
      name: "Gouri Nandana",
      role: "Corresponding Lead",
      image: "/execom/Gouri Nandana.jpg",
      linkedin: "https://www.linkedin.com/in/gouri-nandana-a58871296/",
    },
    {
      name: "Sreerag C",
      role: "Corresponding Lead",
      image: "/execom/Sreerag.jpg",
      linkedin: "https://www.linkedin.com/in/sreerag-c-881741296/",
    },
  ],
};
