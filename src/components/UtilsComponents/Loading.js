import _lauchLuna from "@Assets/images/lauchLuna.png";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading_content">
        <img src={_lauchLuna} alt="lauchLuna" className="rocketLoading" />
      </div>
    </div>
  );
};

export default Loading;
