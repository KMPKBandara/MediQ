import React from "react";

const Home = () => {
  return (
    <>
      {/* ===== hero section ===== */}
      <section className="hero_section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ===== hero content ===== */}
            <div>
              <div className="lg:w-[570px]">
                <h1>We help patient live a healthy, longer life</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
