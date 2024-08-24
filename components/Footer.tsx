import React from "react";
import Link from "next/link";
// import {
//   FacebookIcon,
//   TwitterIcon,
//   InstagramIcon,
//   LinkedInIcon
// } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card-bg text-text-primary p-8">
      {/* Copyright */}
      <div className="text-center text-text-secondary">
        <p>
          &copy; {new Date().getFullYear()} SaturnBytes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
