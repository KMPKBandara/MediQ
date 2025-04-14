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
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patient live a healthy, longer life
                </h1>
                <p className="text_para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis molestias fugiat natus ipsa. Pariatur ad id
                  perferendis ratione asperiores, ullam incidunt. Accusamus
                  aliquam ipsa unde quo fugiat suscipit nobis nostrum!
                </p>
                <button className="btn">Request an Appointment</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
