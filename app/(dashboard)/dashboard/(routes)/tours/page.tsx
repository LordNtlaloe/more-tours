"use client"
import React, { useEffect, useState } from 'react';
import { getAllTours } from '@/app/_actions/_tourActions';
import { TourTable } from '@/components/tours/ToursTable/TourTable';
import { tourTableColumns } from '@/components/tours/ToursTable/TourTableColumns';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import SaveButton from "@/components/general/SaveButton";


export default function page() {
    const [tours, setTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTour();
    }, []);

    const getTour = async () => {
        setLoading(true);
        try {
            const tours = await getAllTours();
            console.log('Fetched Tours:', tours); // Inspect the structure here
            setTours(tours);
        } catch (error) {
            console.error('Failed to fetch tours:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="mx-1">
            <div className="bg-white rounded-xl p-4">
                <div className="flex item-center justify-between mb-2">
                    <h1 className="mb-3  md:text-3xl font-bold">All Tours</h1>
                    <SaveButton btnFunction={''} btnText={'Add New Tour'} bgColor={'bg-500'} />
                </div>
                <div>
                    <TourTable columns={tourTableColumns} data={tours} />
                </div>

            </div>

        </section>
    )
}
