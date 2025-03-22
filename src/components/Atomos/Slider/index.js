import SliderComponent from './carrusel';

const Slider = ({
  responsive,
  infinite,
  disableBullets,
  items,
  paddingLeft,
  paddingRight,
  controls,
  controlsClass,
}) => {
  return (
    <>
      <SliderComponent
        responsive={responsive}
        infinite={infinite}
        disableBullets={disableBullets}
        items={items}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        controls={controls}
        controlsClass={controlsClass}
      />
    </>
  );
};

export default Slider;
