function Footer() {
  return (
    <>
      <p className="border-top text-center pt-3">
        <span className="fs-4 fw-bold">
          Cards
          <i className="bi bi-boxes mx-1"></i>
          For Us
        </span>
        <span className="mx-1">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </p>
    </>
  );
}

export default Footer;
