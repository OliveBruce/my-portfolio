import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [showReturnTop, setShowReturnTop] = useState(false);
  const starBgRef = useRef(null);
  const galaxyRef = useRef(null);

  const handPointer = `${process.env.PUBLIC_URL}/images/HandPointer.png`;

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
      // Example: 1 star per 30px of width
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
                  <ul>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Git</li>
                    <li>REST APIs</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="main-section">
              <div className="main-div main-projects" id="projects">
                <h2 className="main-div-title">Projects</h2>
                <span className="main-div-border-bottom"></span>
              </div>
            </div>
            <div className="main-section">
              <div className="main-div main-contact" id="contact">
                <h2 className="main-div-title">Contact me</h2>
                <span className="main-div-border-bottom"></span>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <p>© 2025 Olivia Bruce</p>
        </footer>
        <div className="return-to-top">
          <a
            href="#top"
            className="text-btn"
            style={{ display: showReturnTop ? "block" : "none" }}
          >
            Return to top
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
