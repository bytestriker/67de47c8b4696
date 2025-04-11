import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "@Sass/_slider.scss"
import chevronLeft from '@Assets/images/chevronLeft.svg'
import chevronRight from '@Assets/images/chevronRight.svg'

const Slider = ({items}) => {

  const responsive = {
    0: { items: 1 },
    568: { items: 2 }
  };

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      infinite={true}
      responsive={responsive}
      controlsStrategy="responsive"
      renderPrevButton={() => {
        return <span><img src={chevronLeft} alt="Previous Button" />{}</span>
      }}
      renderNextButton={() => {
        return <span><img src={chevronRight} alt="Next Button" />{}</span>
      }}
      disableDotsControls={true}
    />
  );
};

export default Slider;
