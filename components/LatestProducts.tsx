'use client'

import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import ProductCard from './ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

async function getLatestProducts(): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('createdAt', 'desc'), limit(8));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export default function LatestProducts() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const products = await getLatestProducts();
      setLatestProducts(products);
    }
    loadProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="mb-8 sm:mb-12 px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-text-primary text-center sm:text-left">
        Latest Products
      </h2>
      <Slider {...settings}>
        {latestProducts.map(product => (
          <div key={product.id} className="px-2 sm:px-3">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}