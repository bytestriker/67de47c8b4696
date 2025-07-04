import { useHistory } from 'react-router-dom';

export const HelperCard = ({
  useToolIcon = false
}) => {
  const history = useHistory();

  return (
    <div className="planetHelper">
      <div className="polygon-content">
        <div className="polygon-inner">
          <div className={`planetHelperTitle ${useToolIcon ? "toolsIcon" : "adviceIcon"}`}>
            <h2>Más herramientas</h2>
          </div>
          <div className="planetHelperContent">
            <p>
              ¿Necesitas más ayuda para realizar esta tarea?, aquí contamos con algunos materiales
              para ti.
            </p>
            <a onClick={(e) => {
              e.preventDefault();
              history.push('/');
            }}>
              <span>Continuar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
