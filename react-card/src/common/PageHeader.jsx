function PageHeader({ title, description }) {
  return (
    <>
      <div className="h-100">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
