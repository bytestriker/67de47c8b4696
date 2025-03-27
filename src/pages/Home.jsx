import { Element } from 'react-scroll';

// Components
import Video from '@Components/Video/Video';
import Planets from '@Components/PlanetContent/PlanetContent';
import Footer from '@Components/Footer';

import style from '@Sass/pages/general.module.scss';

const Home = () => {

  return (
    <>
      <section className={style.bgStars}>
        <Video/>
        <Element name="bio">
          <Planets />
        </Element>
      </section>
      <Footer />
    </>
  );
};

export default Home;
