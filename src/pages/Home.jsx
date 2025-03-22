import { Element } from 'react-scroll';

// Components
import Video from '@Components/Video/Video';
import Planets from '@Components/PlanetContent/PlanetContent';
import Footer from '@Components/Footer';

import style from '@Sass/pages/general.module.scss';

const Home = () => {
  return (
    <div>
      <div className={style.bodyLayout}>
        <div className="parallax">
          <div className="clouds" id="clouds">
            <div className="stars" id="stars">
              <section className="Home">
                <Video />
                <Element name="bio">
                  <Planets />
                </Element>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footerLayout}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
