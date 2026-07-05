import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../api';
import NameSpace from '../../components/NameSpace'
import MemberBox from './MemberBox';
function MembersDashboard({ onOpenModal }) {
  const [dbMembers, setDbMembers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function loadMembers() {
      try {
        const members = await apiRequest("/members");
        setDbMembers(members);
      } catch (error) {
        setStatus("Backend members unavailable; showing sample members.");
      }
    }

    loadMembers();
  }, []);

  const sampleUsers = [
    {
      name: "Olivia Bennett",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      position: "Senior Software Engineer",
      companyName: "TechNova Solutions"
    },
    {
      name: "Ethan Sullivan",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      position: "Product Manager",
      companyName: "Vision Labs"
    },
    {
      name: "Sophia Ramirez",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      position: "UX Designer",
      companyName: "PixelWorks Studio"
    },
    {
      name: "Noah Peterson",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      position: "Cloud Architect",
      companyName: "SkyNet Systems"
    },
    {
      name: "Ava Collins",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      position: "Marketing Director",
      companyName: "Elevate Media"
    },
    {
      name: "Liam Foster",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      position: "DevOps Engineer",
      companyName: "CloudForge"
    },
    {
      name: "Charlotte Reed",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      position: "Business Analyst",
      companyName: "Insight Partners"
    },
    {
      name: "Benjamin Price",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      position: "Data Scientist",
      companyName: "Quantum Analytics"
    },
    {
      name: "Harper Bailey",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      position: "HR Manager",
      companyName: "PeopleFirst Inc."
    },
    {
      name: "Lucas Morgan",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      position: "Frontend Developer",
      companyName: "BrightApps"
    },
    {
      name: "Ella Brooks",
      img: "https://randomuser.me/api/portraits/women/13.jpg",
      position: "Content Strategist",
      companyName: "Creative Pulse"
    },
    {
      name: "Henry Richardson",
      img: "https://randomuser.me/api/portraits/men/14.jpg",
      position: "Cybersecurity Analyst",
      companyName: "SecureNet"
    },
    {
      name: "Grace Murphy",
      img: "https://randomuser.me/api/portraits/women/15.jpg",
      position: "Operations Manager",
      companyName: "Prime Logistics"
    },
    {
      name: "Jack Cooper",
      img: "https://randomuser.me/api/portraits/men/16.jpg",
      position: "Backend Engineer",
      companyName: "CoreStack"
    },
    {
      name: "Chloe Simmons",
      img: "https://randomuser.me/api/portraits/women/17.jpg",
      position: "Graphic Designer",
      companyName: "Studio Hive"
    },
    {
      name: "Daniel Turner",
      img: "https://randomuser.me/api/portraits/men/18.jpg",
      position: "Solutions Architect",
      companyName: "BluePeak Technologies"
    },
    {
      name: "Scarlett Hayes",
      img: "https://randomuser.me/api/portraits/women/19.jpg",
      position: "Finance Manager",
      companyName: "Summit Financial"
    },
    {
      name: "Matthew Kelly",
      img: "https://randomuser.me/api/portraits/men/20.jpg",
      position: "QA Engineer",
      companyName: "Precision Testing"
    },
    {
      name: "Lily Ward",
      img: "https://randomuser.me/api/portraits/women/21.jpg",
      position: "Community Manager",
      companyName: "Unity Network"
    },
    {
      name: "Samuel Ross",
      img: "https://randomuser.me/api/portraits/men/23.jpg",
      position: "AI Researcher",
      companyName: "FutureMind AI"
    },
    {
      name: "Victoria Hughes",
      img: "https://randomuser.me/api/portraits/women/24.jpg",
      position: "Sales Executive",
      companyName: "NextGen Commerce"
    },
    {
      name: "Andrew Perry",
      img: "https://randomuser.me/api/portraits/men/25.jpg",
      position: "Mobile Developer",
      companyName: "AppSphere"
    },
    {
      name: "Natalie Powell",
      img: "https://randomuser.me/api/portraits/women/26.jpg",
      position: "Legal Advisor",
      companyName: "Bridge Legal Group"
    },
    {
      name: "Christopher Gray",
      img: "https://randomuser.me/api/portraits/men/27.jpg",
      position: "IT Support Specialist",
      companyName: "HelpDesk Pro"
    },
    {
      name: "Zoe Bryant",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      position: "Recruiter",
      companyName: "TalentSource"
    },
    {
      name: "Nathan Ellis",
      img: "https://randomuser.me/api/portraits/men/29.jpg",
      position: "Network Engineer",
      companyName: "ConnectX"
    },
    {
      name: "Madison Cox",
      img: "https://randomuser.me/api/portraits/women/30.jpg",
      position: "Project Coordinator",
      companyName: "Momentum Group"
    },
    {
      name: "Ryan Jenkins",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      position: "Technical Writer",
      companyName: "ClearDocs"
    },
    {
      name: "Isabella Sanders",
      img: "https://randomuser.me/api/portraits/women/33.jpg",
      position: "Customer Success Manager",
      companyName: "ClientBridge"
    },
    {
      name: "Gabriel Watson",
      img: "https://randomuser.me/api/portraits/men/34.jpg",
      position: "Machine Learning Engineer",
      companyName: "NeuralWorks"
    }
  ];
  return (
    <>
    
    <img src="https://images.unsplash.com/photo-1607748825003-e5868d49fc33?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGJ1c2luZXNzJTIwbWVtYmVycyUyMGxhdWdoaW5nfGVufDB8fDB8fHww" alt="" className="memPic" />
    <NameSpace name={"Members Only"}/>
    {status && <p className="formStatus">{status}</p>}
    
    <div className="memberDashHolster">
    {[...dbMembers, ...sampleUsers].map((person,i)=>{
      return(
        <div key={i}>
        
        <MemberBox
          memObj={person}
          onOpenModal={() => onOpenModal(person)}
        />
      
        </div>
      )
    })}

    </div>
    </>


  )
}

export default MembersDashboard
