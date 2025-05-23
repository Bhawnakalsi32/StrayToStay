import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
              const target = +counter.getAttribute("data-target");
              const count = +counter.innerText;
              const speed = 200;
              const increment = Math.ceil(target / speed);

              if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 10);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
            observer.unobserve(counter);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    counters.forEach((counter) => {
      counter.innerText = "0";
      observer.observe(counter);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* slider_area_start */}
      <div className="slider_area">
        <div className="single_slider slider_bg_1 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="slider_text">
                  <h3>
                    We Care <br /> <span>Your Pets</span>
                  </h3>
                  <p>
                    Because every paw matters. Providing love, health, and safety
                    to your furry companions.
                  </p>
                  <Link to="/contact" className="boxed-btn4">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dog_thumb d-none d-lg-block">
            <img src="/assets/img/banner/dog.png" alt="" />
          </div>
        </div>
      </div>
      {/* slider_area_end */}

      {/* service_area_start */}
      <div className="service_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10">
              <div className="section_title text-center mb-95">
                 <h3>Services We Provide</h3>
                <p>
                  Discover premium care, nourishment, and comfort tailored
                  specifically for your best friend.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="single_service">
                <div className="service_thumb service_icon_bg_1 d-flex align-items-center justify-content-center">
                  <div className="service_icon">
                    <img src="/assets/img/service/service_icon_1.png" alt="" />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Pet Adoption</h3>
                  <p>
At Stray to Stay, we believe every stray deserves a safe, loving home. Our mission is to rescue abandoned, homeless, and neglected animals and provide them with the care they need until they find their forever families                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single_service active">
                <div className="service_thumb service_icon_bg_1 d-flex align-items-center justify-content-center">
                  <div className="service_icon">
                    <img src="/assets/img/service/service_icon_2.png" alt="" />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3> Donation</h3>
                  <p>
                    At Stray to Stay, every donation directly impacts the lives of stray and abandoned animals. Your generous support helps us rescue, shelter, feed, and provide medical care to countless dogs and cats in need.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single_service">
                <div className="service_thumb service_icon_bg_1 d-flex align-items-center justify-content-center">
                  <div className="service_icon">
                    <img src="/assets/img/service/service_icon_3.png" alt="" />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Pet Posts</h3>
                  <p>
                   At Stray to Stay, our volunteers are the heart of our mission. Through their eyes, you get to see the real stories of resilience, love, and transformation. By sharing pet posts—photos, rescue updates. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* service_area_end */}

      {/* pet_care_area_start */}
      <div className="pet_care_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="pet_thumb">
                <img src="/assets/img/about/pet_care.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 col-md-6">
              <div className="pet_info">
                <div className="section_title">
                  <h3>
                    <span>We care your pet </span> <br />
                    As you care
                  </h3>
                  <p>
                    Our passion is your pet's well-being. From playful pups to
                    wise old whiskers, we treat every animal like family.
                  </p>
                  <Link to="/about" className="boxed-btn3">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pet_care_area_end */}

      {/* adapt_area_start */}
      <div className="adapt_area">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="adapt_help">
                <div className="section_title">
                  <h3>
                    <span>We need your</span>
                    help Adopt Us
                  </h3>
                  <p>
                    Open your heart and home to a loyal companion. Every adoption
                    is a new beginning for a furry friend in need.
                  </p>
                  <Link to="/contact" className="boxed-btn3">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="adapt_about">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <img src="/assets/img/adapt_icon/1.png" alt="" />
                      <div className="adapt_content">
                        <h3 className="counter" data-target="452">0</h3>
                        <p>Pets Available</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <img src="/assets/img/adapt_icon/3.png" alt="" />
                      <div className="adapt_content">
                        <h3>
                          <span className="counter" data-target="52">0</span>+
                        </h3>
                        <p>Adoptions This Month</p>
                      </div>
                    </div>
                    <div className="single_adapt text-center">
                      <img src="/assets/img/adapt_icon/2.png" alt="" />
                      <div className="adapt_content">
                        <h3>
                          <span className="counter" data-target="52">0</span>+
                        </h3>
                        <p>Volunteers Joined</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* adapt_area_end */}

      {/* team_area_start */}
      <div className="team_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10">
              <div className="section_title text-center mb-95">
                <h3>Meet Our Team</h3>
                <p>
                  A passionate group of animal lovers dedicated to giving pets the
                  care, respect, and joy they deserve.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single_team">
                <div className="thumb">
                  <img src="/assets/img/team/1.png" alt="" />
                </div>
                <div className="member_name text-center">
                  <div className="mamber_inner">
                    <h4>Bhawna</h4>
                    <p>Senior Director</p>
                  </div>
                </div>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 ">
              <div className="single_team">
                <div className="thumb">
                  <img src="/assets/img/team/3.png" alt="" />
                </div>
                <div className="member_name text-center">
                  <div className="mamber_inner">
                    <h4>Sunidhi</h4>
                    <p>Senior Director</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {/* team_area_end */}
    </>
  );
}

export default Home;
