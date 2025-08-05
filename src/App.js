import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ContactForm from "./ContactForm";
import ProjectCard from "./ProjectCard";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [showReturnTop, setShowReturnTop] = useState(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const starBgRef = useRef(null);
  const galaxyRef = useRef(null);

  const letterRefs = useRef({});
  const skillRefs = useRef([]);

  const handPointer = `${process.env.PUBLIC_URL}/images/HandPointer.png`;

  const glowSkill = (idx) => {
    gsap.to(skillRefs.current[idx], {
      boxShadow: "0 0 10px 5px #61fb73, 0 0 10px #fff",
      background: "linear-gradient(135deg, #61fb73 0%, #3b50b6 100%)",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const unglowSkill = (idx) => {
    gsap.to(skillRefs.current[idx], {
      boxShadow: "#000 0px 0px 10px",
      background: "linear-gradient(135deg, #3b50b6 0%, #000000 100%)",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const wiggleLetter = (skillIdx, letterIdx) => {
    const el = letterRefs.current[`${skillIdx}-${letterIdx}`];
    if (!el) return;
    gsap.fromTo(
      el,
      { rotation: 0 },
      {
        rotation: 15,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
        onComplete: () => gsap.to(el, { rotation: 0, duration: 0.1 }),
      }
    );
  };

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML",
    "CSS",
    "Git",
    "REST APIs",
    "Responsive Design",
  ];

  const toggleNav = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/menu-move.mp3`);
    audio.volume = 0.3;
    audio.play();
    setNavOpen(true);
  };

  const onNavClick = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/menu-move.mp3`);
    audio.volume = 0.3;
    audio.play();
    setNavOpen(false);
  };

  const onDownloadClick = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/menu-move.mp3`);
    audio.volume = 0.3;
    audio.play();
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        setShowReturnTop(window.scrollY > header.offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const starContainer = starBgRef.current;
    if (!starContainer) return;

    function generateStars() {
      starContainer.innerHTML = "";
      const numStars = Math.floor(window.innerWidth / 30);
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        starContainer.appendChild(star);

        gsap.to(star, {
          opacity: Math.random(),
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 2,
        });
      }
    }

    generateStars();

    // Shooting star function
    const shootStar = () => {
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      // Random start position (top 80% of screen)
      const startTop = Math.random() * window.innerHeight * 0.8;
      const startLeft = Math.random() * window.innerWidth * 0.7;
      shootingStar.style.top = `${startTop}px`;
      shootingStar.style.left = `${startLeft}px`;

      // Calculate movement and angle
      const xMove = -200 - Math.random() * 300;
      const yMove = 100 + Math.random() * 100;
      const angleRad = Math.atan2(yMove, xMove);
      const angleDeg = angleRad * (180 / Math.PI);

      shootingStar.style.transform = `rotate(${angleDeg + 180}deg)`;

      starContainer.appendChild(shootingStar);

      gsap.to(shootingStar, {
        x: xMove,
        y: yMove,
        opacity: 0,
        duration: 1.2 + Math.random(),
        ease: "power2.out",
        onComplete: () => {
          shootingStar.remove();
        },
      });
    };

    // Interval for shooting stars
    const shootingInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 50% chance per interval
        shootStar();
      }
    }, 1500);

    // Cleanup
    window.addEventListener("resize", generateStars);
    return () => {
      window.removeEventListener("resize", generateStars);
      starContainer.innerHTML = "";

      clearInterval(shootingInterval);
    };
  });

  useEffect(() => {
    const galaxy = document.querySelector(".galaxy-bg");
    if (galaxy) {
      gsap.to(galaxy, {
        opacity: 0.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="background-elements">
        <div className="blue-bg"></div>
        <div className="galaxy-bg" ref={galaxyRef}></div>
        <div className="star-bg" ref={starBgRef}></div>
      </div>
      <div className="app-content">
        <header className="header">
          <p className="header-title">
            Hello, I'm Olivia Bruce. A passionate{" "}
            <span className="highlight">Full-Stack</span> developer.
          </p>
          <div className={"header-nav" + (navOpen ? " nav-open" : "")}>
            {navOpen && (
              <ul className="nav-links">
                <li>
                  <div className="nav-hover-container">
                    <a
                      className="nav-link-hover"
                      href="#skills"
                      onClick={onNavClick}
                    >
                      Skills
                    </a>
                    <img
                      className="nav-hover-image"
                      src={handPointer}
                      alt="Preview"
                    />
                  </div>
                </li>
                <li>
                  <div className="nav-hover-container">
                    <a
                      className="nav-link-hover"
                      href="#projects"
                      onClick={onNavClick}
                    >
                      Projects
                    </a>
                    <img
                      className="nav-hover-image"
                      src={handPointer}
                      alt="Preview"
                    />
                  </div>
                </li>
                <li>
                  <div className="nav-hover-container">
                    <a
                      className="nav-link-hover"
                      href="#contact"
                      onClick={onNavClick}
                    >
                      Contact me
                    </a>
                    <img
                      className="nav-hover-image"
                      src={handPointer}
                      alt="Preview"
                    />
                  </div>
                </li>
              </ul>
            )}
            {!navOpen && (
              <ul className="nav-links">
                <li>
                  <div className="nav-hover-container">
                    <button
                      className="nav-link-hover nav-btn"
                      onClick={toggleNav}
                    >
                      Navigation
                    </button>
                    <img
                      className="nav-hover-image"
                      src={handPointer}
                      alt="Preview"
                    />
                  </div>
                </li>
                <li>
                  <div className="nav-hover-container">
                    <a
                      className="nav-link-hover nav-download"
                      href={`${process.env.PUBLIC_URL}/OliviaBruceResume.pdf`}
                      onClick={onDownloadClick}
                      download={true}
                    >
                      Download Resume
                    </a>
                    <img
                      className="nav-hover-image"
                      src={handPointer}
                      alt="Preview"
                    />
                  </div>
                </li>
              </ul>
            )}
          </div>
        </header>
        <main className="main">
          <div className="main-content">
            <div className="main-section">
              <div className="main-div main-skills">
                <h2 className="main-div-title" id="skills">
                  Skills
                </h2>
                <span className="main-div-border-bottom"></span>
                <div className="skills-list">
                  <ul className="skills-list-container">
                    {skills.map((skill, skillIdx) => (
                      <li
                        className="skill"
                        key={skill}
                        ref={(el) => (skillRefs.current[skillIdx] = el)}
                        onMouseEnter={() => glowSkill(skillIdx)}
                        onMouseLeave={() => unglowSkill(skillIdx)}
                      >
                        {skill.split("").map((letter, letterIdx) => (
                          <span
                            key={letterIdx}
                            ref={(el) =>
                              (letterRefs.current[`${skillIdx}-${letterIdx}`] =
                                el)
                            }
                            onMouseEnter={() =>
                              wiggleLetter(skillIdx, letterIdx)
                            }
                            style={{
                              display: "inline-block",
                              cursor: "pointer",
                              minWidth: letter === " " ? "0.5em" : undefined,
                            }}
                          >
                            {letter === " " ? "\u00A0" : letter}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-section">
              <div className="main-div main-projects" id="projects">
                <h2 className="main-div-title">Projects</h2>
                <span className="main-div-border-bottom"></span>
                <div className="projects-list">
                  <ProjectCard
                    project={{
                      image: `${process.env.PUBLIC_URL}/images/ColorMuller.png`,
                      title: "ColorMuller",
                      tech: "JavaScript, React, HTML, CSS, Node.js",
                      description:
                        "This app allows users to create palettes, either random or based on an image, and save them.",
                      bulletpoints: [
                        "Implemented responsive UI using React, improving mobile usability across 3+ device types.",
                        "Developed reusable and maintainable React components, reducing code duplication by 30%.",
                      ],
                      link: "https://olivebruce.github.io/se_final_colormuller_frontend/",
                    }}
                  />
                  <ProjectCard
                    project={{
                      image: `${process.env.PUBLIC_URL}/images/WTWR.png`,
                      title: "What To Wear?",
                      tech: "JavaScript, React, HTML, CSS, Node.js, Express, MongoDB",
                      description:
                        "This app allows users to see what clothes to wear based on the weather in their location.",
                      bulletpoints: [
                        "Built RESTful APIs using Express.js and MongoDB, handling ~500 requests per day during peak usage.",
                        "Deployed production code on AWS EC2, achieving 99.9% uptime during testing.",
                        "Integrated weather API to display clothing suggestions for 1000+ global cities.",
                        "Reduced average page response time by 25% using backend optimization techniques.",
                      ],
                      link: "http://whatshouldiwear.awiki.org/",
                    }}
                  />
                  <ProjectCard
                    project={{
                      image: `${process.env.PUBLIC_URL}/images/AroundTheUS.png`,
                      title: "Around The US",
                      tech: "JavaScript, React, HTML, CSS, Node.js, Express, MongoDB",
                      description:
                        "This is an Instagram-like web application that allows users to share their photo content.",
                      bulletpoints: [
                        "Developed and launched full-featured frontend and backend, supporting 200+ photo uploads.",
                        "Implemented user authentication and session management, increasing session security by 80%.",
                        "Built scalable architecture with modular components, allowing for future integration of social features.",
                      ],
                      link: "https://olivebruce.github.io/se_project_aroundtheus/",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="main-section">
              <div className="main-div main-contact" id="contact">
                <h2 className="main-div-title">Contact me</h2>
                <span className="main-div-border-bottom"></span>
                <div className="contact-form">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <p>© 2025 Olivia Bruce</p>
        </footer>
        <div
          className="return-to-top"
          style={{
            visibility: showReturnTop ? "visible" : "hidden",
          }}
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <a
            href="#top"
            className="text-btn"
            style={{
              display: showReturnTop ? "block" : "none",
            }}
          >
            <img
              src={
                isArrowHovered
                  ? `${process.env.PUBLIC_URL}/images/ArrowUp.gif`
                  : `${process.env.PUBLIC_URL}/images/ArrowUpStatic.png`
              }
              alt="Return to top"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
