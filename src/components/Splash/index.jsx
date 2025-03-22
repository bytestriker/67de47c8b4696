import { useEffect } from "react";

// LIBS
import anime from "animejs";

// IMAGES
import splashLogo from "@Assets/images/logoSplash.png";

// STYLES
import "@Components/Splash/Splash.scss";

const Splash = () => {

  useEffect(() => {
    anime({
      targets: ".splashMove",
      opacity: ["0", "1"],
      easing: "spring(1, 100, 10, 0)",
      width: ["0", "320px"],
      translateY: 240,
      loop: false,
      duration: 2000,
    });
  }, []);

  return (
    <section className="Splash" id="splashId">
      <div className="container">
        <div className="splash_content">
          <img
            src={splashLogo}
            alt="splash"
            id="splashLogo"
            className="splashMove"
          />
        </div>
      </div>
    </section>
  );
};

export default Splash;
