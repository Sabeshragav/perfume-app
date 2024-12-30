import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">About Us</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              Our Story
            </h3>
            <p className="text-purple-900">
              Purple Co. was founded in 2023 with a mission to bring color and
              creativity to the digital world. Our team of passionate designers
              and developers work tirelessly to create beautiful and functional
              web experiences.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              Our Mission
            </h3>
            <p className="text-purple-900">
              We strive to empower businesses and individuals with cutting-edge
              web solutions that not only look great but also deliver results.
              Our goal is to push the boundaries of what's possible in web
              design and development.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["CEO", "CTO", "Lead Designer"].map((role, index) => (
                <div
                  key={index}
                  className="bg-purple-100 p-4 rounded-md text-center"
                >
                  <img
                    className="w-20 h-20 bg-purple-300 rounded-full mx-auto mb-2"
                    src={`./assets/avatars/av${index + 1}.jpg`}
                    alt={role}
                  />

                  <h4 className="font-bold text-purple-800">{role}</h4>
                  <p className="text-purple-700">Team Member {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
