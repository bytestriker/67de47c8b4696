import { Link } from "react-router-dom";

// IMAGES
import _Facebook from "@Assets/images/icon_facebook.svg";
import _Twitter from "@Assets/images/icon_twitter.svg";
import _LinkedIn from "@Assets/images/icon_linkedIn.svg";
import _Youtube from "@Assets/images/icon_youtube.svg";
import _Logo from "@Assets/images/rocket_footer.svg";

// styles
import styles from "@Sass/pages/footer.module.scss";

const Footer = () => {

  const hanldeDate = () => {
    const date = new Date();
    return date.getFullYear();
  }

  return (
    <footer className={styles.Footer}>
      <div className={styles.footer_content}>
        <section className={styles.f1}>
          <div className={styles.footer_social}>
          <img src={_Logo} alt="Logo" />
          </div>
          <div className={styles.footer_social}>
            <p>Siguenos en:</p>
            <Link to="/">
              <img src={_Facebook} alt="facebook" />
            </Link>
            <Link to="/">
              <img src={_Twitter} alt="twitter" />
            </Link>
            <Link to="/">
              <img src={_LinkedIn} alt="linkedIn" />
            </Link>
            <Link to="/">
              <img src={_Youtube} alt="youtube" />
            </Link>
          </div>
          <div className={styles.linksFooter}>
            <Link to="/acercade" className={styles.linkFooter}>
              ACERCA DE NOSOTROS |
            </Link>
            <Link to="/privacidad" className={styles.linkFooter}>
              AVISO DE PRIVACIDAD |
            </Link>
            <Link to="/terminos" className={styles.linkFooter}>
              TÉRMINOS Y CONDICIONES 
            </Link>
          </div>
          <p className={styles.copy}>ROCKET NOW {hanldeDate()}. TODOS LOS DERECHOS RESERVADOS</p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

