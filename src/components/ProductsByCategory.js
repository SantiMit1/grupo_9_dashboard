import Categories from "./Categories";
import { useEffect, useState } from 'react';

function ProductsByCategory() {
  const [categoriesCount, setCategoriesCount] = useState({})

  async function getCategoriesCount() {
    const categories = await fetch("http://ninetech.herokuapp.com/api/productos").then(res => res.json()).then(data => data.countByCategory)
    setCategoriesCount(categories)
  }

  useEffect(() => {
    getCategoriesCount()
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Cantidad de productos por categoria
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <Categories category="Hardware" count={categoriesCount.Hardware} />
            <Categories category="Audio y video" count={categoriesCount["Audio y video"]} />
            <Categories category="Mouse y teclados" count={categoriesCount["Mouse y teclados"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategory;
