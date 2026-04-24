function AnnouncementBar({ footer = false }) {
  return (
    <div className={`announcement-bar ${footer ? 'footer-marquee' : ''}`}>
      <div className="announcement-track">
        <span>
          Launch Special! 20% off with code PEACH20 - Free Shipping on orders over $100 - Launch Special! 20% off with code PEACH20
        </span>
        <span>
          Launch Special! 20% off with code PEACH20 - Free Shipping on orders over $100 - Launch Special! 20% off with code PEACH20
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
