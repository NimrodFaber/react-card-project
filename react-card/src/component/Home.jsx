import PageHeader from "../common/PageHeader";
import "../App.css";
function Home() {
  return (
    <>
      <div className="w-100 text-center  " style={{ height: "100%" }}>
        <PageHeader
          title="Home Page"
          description="welcome to the card project"
        ></PageHeader>
      </div>
    </>
  );
}

export default Home;
