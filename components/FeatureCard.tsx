import React from 'react';

interface FeatureCardProps {
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
  return (
    <div className="bg-card-bg p-6 flex flex-col items-center text-center rounded-lg shadow-lg">
      <Icon className="h-12 w-12 text-4xl mb-4 text-[#92c67b]" />
      <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;