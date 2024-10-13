import React, { useState, useEffect } from 'react'
import { getAllRatingsByTourId } from '@/app/_actions/_tourActions'

interface Review {
    id: string;
    userId: string;
    rating: string;
    comment: string;
}

export default function DisplayRatings({ tourId }: { tourId: string }) {
    const [ratings, setRatings] = useState<Review[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const data = await getAllRatingsByTourId(tourId);
                console.log("Fetched Ratings Data:", data); // Debugging line
                if (data.error) {
                    setError(data.error);
                } else {
                    setRatings(data);
                }
            } catch (err) {
                setError('Failed to fetch ratings');
            }
        };

        fetchRatings();
    }, [tourId]);

    return (
        <div className="mt-5">
            <h1 className="text-xl md:text-3xl font-bold mb-3 border-b pb-3">
                Tour Reviews
            </h1>
            {ratings.length === 0 ? (
                <p>No ratings available</p>
            ) : (
                <ul>
                    {ratings.map((rating) => (
                        <li key={rating.id}>
                            <p>Rating: {rating.rating}</p>
                            <p>Comment: {rating.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
