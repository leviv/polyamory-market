import './Footer.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  const companyLinks1 = ['Blog', 'Careers', 'Privacy Policy', 'WSOP Sweepstakes Rules', 'Data Terms of Service'];
  const companyLinks2 = ['Company', 'Brand Kit'];
  const socialLinks = ['X (Twitter)', 'LinkedIn', 'Discord', 'Instagram', 'Reddit', 'TikTok'];
  const productLinks = [
    'Help Center', 'API', 'FAQ', 'FAQ for Finance Professionals', 'Regulatory',
    'Trading Hours', 'Fee Schedule', 'Trading Prohibitions', 'Incentive Program',
    'Research', 'Institutional Trading', 'Responsible Trading', 'Market Integrity'
  ];

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__column-group">
          <div className="footer__column">
            <h3 className="footer__heading">Company</h3>
            <div className="footer__links">
              {companyLinks1.map((link) => (
                <a key={link} className="footer__link" onClick={scrollToTop}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="footer__column">
            <h3 className="footer__heading">Company</h3>
            <div className="footer__links">
              {companyLinks2.map((link) => (
                <a key={link} className="footer__link" onClick={scrollToTop}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Social</h3>
          <div className="footer__links">
            {socialLinks.map((link) => (
              <a key={link} className="footer__link" onClick={scrollToTop}>
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__column">
          <h3 className="footer__heading">Product</h3>
          <div className="footer__links">
            {productLinks.map((link) => (
              <a key={link} className="footer__link" onClick={scrollToTop}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">© 2026 Kalshi Inc.</p>
        <p className="footer__disclaimer">
          Trading on Kalshi involves risk and may not be appropriate for all. Members risk losing their cost to enter any transaction, including fees. You should carefully consider whether trading on Kalshi is appropriate for you in light of your investment experience and financial resources. Any trading decisions you make are solely your responsibility and at your own risk. Information is provided for convenience only on an "AS IS" basis. Past performance is not necessarily indicative of future results. Kalshi is subject to U.S. regulatory oversight by the CFTC.
        </p>
      </div>
    </footer>
  );
};
