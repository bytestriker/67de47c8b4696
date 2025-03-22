// COMPONETS
import { LinkRouter } from "@Components/UtilsComponents/Button";
import { Title } from "@Components/Atomos/Titles";

// IMAGES
import _SocialHub from "@Assets/images/socialHub.png";
import _Luna from "@Assets/images/luna.png";

// STYLES
import style from '@Sass/pages/general.module.scss';
import "@Components/SocialHub/SocialHub.scss";

const SocialHub = () => {
  return (

    <section className={style.planetPageMain}>
      <div className={style.planetPageContainerSocial}>
      <div className="SocialHub">
      <div className="SocialHubContent">
              <Title title="SOCIAL HUB" />

              <p className={style.textCenterthanks}>Un espacio de emprendedores para emprendedores.</p>
              <img src={_SocialHub} alt="socialhub" />

              <LinkRouter rute="/" label="SOCIAL HUB" classItem="customSocialBtn" />

              <p className={style.textCenterthanksp}>
                Ornare feugiat lobortis commodo lorem. Pulvinar aliquam integer
                tellus ultricies. Egestas morbi malesuada maecenas eget. Vitae neque
                eleifend volutpat placerat hendrerit. Nisl.
              </p>
              <div className="contentLuna">
              <img src={_Luna} alt="luna" />
              </div>
            
          
      </div>
      </div>
      </div>
    </section>


  );
};

export default SocialHub;
