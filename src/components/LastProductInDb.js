// import imagenFondo from "../assets/images/mandalorian.jpg";
import { useEffect, useState } from 'react'

function LastProductInDb() {
  const [lastProduct, setLastProduct] = useState({})

  async function getLastProduct() {
    const product = await fetch("http://ninetech.herokuapp.com/api/productos/ultimo").then(res => res.json())
    setLastProduct(product.producto)
  }

  useEffect(() => {
    getLastProduct()
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            {lastProduct.name}
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: 40 + "rem" }}
              src={`http://${lastProduct.image}`}
              alt={lastProduct.name}
            />
          </div>
          <p>
            {lastProduct.description}
          </p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            View product detail
          </a>
        </div>
      </div>
    </div>
  );
}

export default LastProductInDb;
