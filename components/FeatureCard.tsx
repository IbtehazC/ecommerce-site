import React from 'react';

interface FeatureCardProps {
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  return (
    <div className="bg-card-bg p-4 sm:p-6 flex flex-col items-center text-center rounded-lg shadow-lg">
      <Icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 sm:mb-4 text-[#92c67b]" />
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-text-primary">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;