"use client";

import Link from 'next/link';
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const displayedCategories = categories.slice(0, 6);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <div className="mb-8 sm:mb-12 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Categories</h2>
        <Link href="/categories" className="text-text-secondary hover:text-text-primary text-center sm:text-right text-sm sm:text-base">
          Show All Categories
        </Link>
      </div>
      
      {isMobile ? (
        <Slider {...settings}>
          {displayedCategories.map((category) => (
            <div key={category.id} className="px-2">
              <CategoryCard category={category} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {displayedCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}