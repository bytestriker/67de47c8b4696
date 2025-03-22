import { createRef, Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "@Sass/_slider.scss"

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.carousel = createRef();
  }
  
  render() {
    return (
      <>
        <AliceCarousel
          autoHeight
          autoWidth
          mouseTracking
          responsive={this.props.responsive}
          touchTracking={true}
          infinite={this.props.infinite}
          disableDotsControls={this.props.disableBullets}
          disableButtonsControls
          items={this.props.items}
          key={1}
          paddingLeft={this.props.paddingLeft}
          paddingRight={this.props.paddingRight}
          ref={this.carousel}
        />

        {this.props.controls && this.carousel && (
          <div className={`slider-controls ${this.props.controlsClass}`}>
            <div className="slider-control left" onClick={() => this.carousel.current.slidePrev()}></div>
            <div className="slider-control right" onClick={() => this.carousel.current.slideNext()}></div>
          </div>
        )}
      </>
    );
  }
}

export default SliderComponent;
