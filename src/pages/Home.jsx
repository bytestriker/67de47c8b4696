import { Element } from 'react-scroll';

// Components
import Video from '@Components/Video/Video';
import Planets from '@Components/PlanetContent/PlanetContent';
import Footer from '@Components/Footer';

import '@Sass/pages/planets.scss';

const Home = () => {
  return (
    <>
      <Video/>
      <Element name="bio">
        <Planets />
      </Element>
      <Footer />
    </>
  );
};

export default Home;
