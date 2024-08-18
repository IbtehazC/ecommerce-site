import React from 'react';

interface FeatureCardProps {
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  return (
    <div className="bg-primary-light p-6 flex flex-col items-center text-center">
      <Icon className="h-12 w-12 mb-4 text-[#DCDEDC]" />
      <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;