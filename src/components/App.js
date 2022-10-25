import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import EmptyWrapper from "./EmptyWrapper";
import ContentWrapper from "./ContentWrapper";
import ContentRowCounts from "./ContentRowCounts";
import LastProductInDb from "./LastProductInDb";
import ProductsByCategory from "./ProductsByCategory";
import Chart from "./Chart";
import NotFound from "./NotFound";
import UsersChart from "./UsersChart";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <EmptyWrapper>
        <Switch>
          <Route exact path="/" component={ContentWrapper} />
          <Route path="/content-counts" component={ContentRowCounts} />
          <Route path="/last-product-in-db" component={LastProductInDb} />
          <Route path="/categories" component={ProductsByCategory} />
          <Route path="/products-chart" component={Chart} />
          <Route path="/users-chart" component={UsersChart} />
          <Route path="/create-product" component={CreateForm} />
          <Route path="/edit-product" component={EditForm} />
          <Route component={NotFound} />
        </Switch>
      </EmptyWrapper>
    </div>
  );
}

export default App;
