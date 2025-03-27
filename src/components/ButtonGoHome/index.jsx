
const ButtonGoHome = ({ onClick = () => {return null}, text = "Volver al Inicio", className = "planetBackToTheHomepage" }) => <button className={className} onClick={onClick}><span>{text}</span></button>;
export default ButtonGoHome;