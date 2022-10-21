import ContentRowCenter from "./ContentRowCenter";
import ContentRowMovies from "./ContentRowCounts";
import Chart from "./Chart";

function ContentRowTop() {
  return (
    <>
      <ContentRowMovies />
      <ContentRowCenter />
      <Chart />
    </>
  );
}
export default ContentRowTop;
