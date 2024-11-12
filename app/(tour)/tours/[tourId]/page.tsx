import TourInfo from '@/components/tours/TourInfo';
import React from 'react';

export default function page({ params }: { params: { tourId: string } }) {
  const id = parseInt(params.tourId); // Convert the tourId from string to number
  console.log(id); // Check if the id is properly converted to an integer

  return (
      <div className="container-3xl py-5 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Tour Details</h1>
          <TourInfo id={id} /> {/* Pass the converted integer id */}
        </div>
      </div>
  );
}
