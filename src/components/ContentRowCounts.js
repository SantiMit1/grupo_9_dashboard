import SmallCard from "./SmallCard";
import { useState, useEffect } from "react";

function ContentRowCounts() {
  const [productsCount, setProductsCount] = useState()
  const [usersCount, setUsersCount] = useState()

  async function getProductsCount() {
    const products = await fetch("https://ninetech.herokuapp.com/api/productos").then(res => res.json())
    setProductsCount(products.count)
  }

  async function getUsersCount() {
    const users = await fetch("https://ninetech.herokuapp.com/api/users").then(res => res.json())
    setUsersCount(users.count)
  }

  useEffect(() => {
    getProductsCount()
    getUsersCount()
  }, [])

  return (
    <div className="row">
      <SmallCard title="Productos Registrados" quantity={productsCount} icon="fa-clipboard-list" />
      <SmallCard title="Usuarios Registrados" quantity={usersCount} icon="fa-user" />
      {/* <SmallCard title="Cantidad de productos" quantity={productsCount} /> */}
    </div>
  );
}

export default ContentRowCounts;
