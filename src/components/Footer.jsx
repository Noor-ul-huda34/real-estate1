function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        <div className="footer-brand">
          <h2>
            Estate<span>Hub</span>
          </h2>

          <p>
            Helping you find the right property in the right place.
          </p>
        </div>

        <div className="footer-column">
          <h3>Property</h3>
          <button>Buy</button>
          <button>Rent</button>
          <button>New Homes</button>
          <button>Commercial</button>
        </div>

        <div className="footer-column">
          <h3>EstateHub</h3>
          <button>About us</button>
          <button>Find an agent</button>
          <button>House prices</button>
          <button>Contact</button>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <button>Help centre</button>
          <button>Property alerts</button>
          <button>Terms</button>
          <button>Privacy</button>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 EstateHub. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;