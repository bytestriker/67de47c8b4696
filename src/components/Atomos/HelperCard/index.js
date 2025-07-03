
export const HelperCard = ({
  useToolIcon = false
}) => {
  return (
    
    <div class="planetHelper">
      <div class="polygon-content">
        <div class="polygon-inner">
          <div className={`planetHelperTitle ${useToolIcon ? "toolsIcon" : "adviceIcon"}`}>
            <h2>Más herramientas</h2>
          </div>
          <div className="planetHelperContent">
          <p>
            ¿Necesitas más ayuda para realizar esta tarea?, aquí contamos con algunos materiales
            para ti.
          </p>
          <a href="">
            <span>Continuar</span>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};
