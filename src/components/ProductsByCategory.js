import Categories from "./Categories";
import { useEffect, useState } from 'react';

function ProductsByCategory() {
  const [categoriesCount, setCategoriesCount] = useState({})

  async function getCategoriesCount() {
    const categories = await fetch("https://ninetech.herokuapp.com/api/productos").then(res => res.json()).then(data => data.countByCategory)
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
            <Categories category="CPU" count={categoriesCount.CPU} />
            <Categories category="GPU" count={categoriesCount.GPU} />
            <Categories category="RAM" count={categoriesCount.RAM} />
            <Categories category="HDD" count={categoriesCount.HDD} />
            <Categories category="SSD" count={categoriesCount.SSD} />
            <Categories category="FUENTES" count={categoriesCount.FUENTES} />
            <Categories category="MOTHERBOARDS" count={categoriesCount.MOTHERBOARDS} />
            <Categories category="PERIFERICOS" count={categoriesCount.PERIFERICOS} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategory;
