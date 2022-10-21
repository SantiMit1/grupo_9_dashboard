import PropTypes from "prop-types";

function SmallCard(props) {
  return (
    <div className="col-md-6 mb-6" style={{"marginBottom": "20px"}}>
      <div className={`card border-left-success shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold text-success text-uppercase mb-1`}
              >
                {props.title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {props.quantity}
              </div>
            </div>
            <div className="col-auto">
              <i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* DEFINICIÓN DE PROPIEDADES POR DEFAULT */

SmallCard.defaultProps = {
  title: "No Title",
  quantity: "No quantity",
  icon: "fa-clipboard-list"
};

/* PROPTYPES */

SmallCard.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  icon: PropTypes.string
};

export default SmallCard;
