import './button.scss';

const Button = ({
  text = "Click me",
  type = "button",
  className = "",
  onClick = () => {},
  isCompleted = false,
  isCentered = false,
  isAstronaut = false,
  disabled = false,
  size = "md", // "sm" | "md" | "lg"
  shape = "default", // "default" | "alt"
}) => {
  
  const buttonShapes = {
    middle: (
      <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H100V1H0V0ZM0 39H100V40H0V39Z" fill="#E0FF4E"/>
      </svg>
    ),
    default: {
      left: (
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.0001 0.999884L23.1173 0.999882L1.71105 38.9999L32.0001 38.9999L32.0001 39.9999L0.000115076 39.9999L22.5323 -0.000118131L32.0001 -0.000116475L32.0001 0.999884Z" fill="#E0FF4E"/>
        </svg>
      ),
      right: (
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 19.1307L27.8271 10.4344L11.1367 10.4344L1.12304 -0.000122267L-6.99382e-06 -0.00012207L-6.81898e-06 0.999878L0.696282 0.999878L10.416 11.1268L10.7109 11.4344L27.1982 11.4344L30.8906 19.1298L21.3564 38.9999L-1.74845e-07 38.9999L0 39.9999L21.9854 39.9999L32 19.1307Z" fill="#E0FF4E"/>
        </svg>
      )
    },
    alt: {
      left: (
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.000123895 20.869L4.17298 29.5653L20.8634 29.5653L30.8771 39.9999L32.0001 39.9999L32.0001 38.9999L31.3038 38.9999L21.5841 28.8729L21.2892 28.5653L4.80188 28.5653L1.1095 20.87L10.6437 0.99988L32.0001 0.999878L32.0001 -0.00012207L10.0148 -0.000120148L0.000123895 20.869Z" fill="#E0FF4E"/>
        </svg>
      ),
      right: (
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.74228e-08 38.9999L8.88281 38.9999L30.2891 0.999878L3.40949e-06 0.999875L3.49691e-06 -0.000124868L32 -0.00012207L9.46777 39.9999L0 39.9999L8.74228e-08 38.9999Z" fill="#E0FF4E"/>
        </svg>
      )
    }
  };

  const selectedShape = buttonShapes[shape] || buttonShapes.default;

  return (
    <div className={isCentered ? "centerButton" : null}>
      <button 
        className={`buttonPrimary ${shape} ${className}`}
        type={type} 
        onClick={onClick} 
        disabled={disabled}
      >
        <div className="buttonPrimaryBg">
          {selectedShape.left}
          {buttonShapes.middle}
          {selectedShape.right}
        </div>
        {text !== 'Click me' && <span className="button-text">{text}</span>}
        {isAstronaut && (
          <svg
            className="astronaut-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="41.142857142857146"
            viewBox="0 0 448 512"
          >
            <path
              fill="white"
              d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9c24.6 56.6 81 96.1 146.7 96.1s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9v-64c0-16.8-12.9-30.5-29.3-31.9M336 144v16c0 53-43 96-96 96h-32c-53 0-96-43-96-96v-16c0-26.5 21.5-48 48-48h128c26.5 0 48 21.5 48 48m-146.7 18.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2l-21.2 6c-3.3.9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6l6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2l21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3zm-76.6 153.8C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128v-64c0-17.7 14.3-32 32-32h128c17.7 0 32 14.3 32 32v64h98.3c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5M176 448c-8.8 0-16 7.2-16 16v48h32v-48c0-8.8-7.2-16-16-16m96 32a16 16 0 1 0 0-32a16 16 0 1 0 0 32"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Button;
