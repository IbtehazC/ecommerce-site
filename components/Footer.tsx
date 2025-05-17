import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card-bg text-text-primary py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="text-text-secondary text-sm sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} SaturnBytes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;