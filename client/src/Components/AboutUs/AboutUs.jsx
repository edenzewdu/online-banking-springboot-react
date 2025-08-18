import React from "react"; 
import Female from "../../assets/images/Female.png";
import Navbar from "../LandingPage/Navbar";

const AboutUs = () => {
  const teamData = [
    {
      name: "Eden Zewdu",
      role: "Lead",
      image: Female,
      contribution:
        "Designed backend layers for transactions, account, Fundtransfer like controller, services and repository. Also designed frontend pages for backend functionality using React.js. Connected backend with frontend.",
      learnings:
        "Learned UI design, three-tier architecture, SpringBoot, security, Git & GitHub, and connecting backend with frontend.",
      bg: "bg-gray-800 text-gray-100"
    },
    {
      name: "Eden Zewdu",
      role: "Lead",
      image: Female,
      contribution:
        "Contributed to project architecture and frontend-backend integration.",
      learnings: "Learned teamwork and collaboration in remote environment.",
      bg: "bg-gray-700 text-gray-100"
    },
    {
      name: "Eden Zewdu",
      role: "Lead",
      image: Female,
      contribution:
        "Managed project planning, supervised integrations, and optimized backend queries.",
      learnings:
        "Gained experience in project management, debugging complex queries, and teamwork.",
      bg: "bg-gray-600 text-gray-100"
    }
  ];

  return (
    <div >
      <Navbar/>
      {/* Section 1 */}
      <section className="container mx-auto py-16 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-4xl font-bold pb-4 text-gray-900">
              About Project
            </h1>
            <p className="text-gray-900 leading-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              libero facilis nesciunt, doloribus explicabo dolore aliquam
              inventore porro cumque aspernatur.
            </p>
          </div>
          <div className="lg:w-7/12">
            <img
              className="w-full h-full rounded-xl shadow-2xl"
              src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
              alt="A group of People"
            />
          </div>
        </div>
      </section>

      {/* Section 2 - Title */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-8 bg-gray-900">
          Our Contributions And Learnings
        </h1>
      </section>

      {/* Team Sections */}
      {teamData.map((item, idx) => (
        <section
          key={idx}
          className={`${item.bg} w-full flex flex-col lg:flex-row justify-center items-center my-12 p-8 rounded-3xl shadow-xl border border-gray-700`}
        >
          <div className="flex flex-col items-center lg:items-start lg:w-1/3">
            <div className="border-4 border-gray-600 rounded-full p-1">
              <img
                className="w-64 h-64 object-cover rounded-full"
                src={item.image}
                alt={`${item.name}'s pic`}
              />
            </div>
            <h3 className="text-xl font-bold mt-6">{`NAME: ${item.name}`}</h3>
            <h3 className="text-lg font-semibold mt-2">{item.role}</h3>
          </div>

          <div className="lg:w-2/3 flex flex-col mt-8 lg:mt-0 lg:pl-12 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">My Contribution</h2>
              <p className="text-gray-200">{item.contribution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">My Learnings</h2>
              <p className="text-gray-200">{item.learnings}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Thank You */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Thank You!
        </h1>
      </section>
    </div>
  );
};

export default AboutUs;
