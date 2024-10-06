import { useQueries } from '@tanstack/react-query';
import { getMostReservedListings } from '../modals/create-modal/service';
import {
    getAllListings,
    getAllBookings,
    getAllRevenue,
    getAllUsers
} from '../services/service';

export const useWidgetHook = () => {
    const queries = useQueries({
        queries: [
            {
                queryFn: getAllUsers,
                queryKey: ['admin', 'users']
            },
            {
                queryFn: getAllListings,
                queryKey: ['admin', 'listings']
            },
            {
                queryFn: getAllBookings,
                queryKey: ['admin', 'bookings']
            },
            {
                queryFn: getAllRevenue,
                queryKey: ['admin', 'revenue']
            },
            {
                queryFn: getMostReservedListings,
                queryKey: ['admin', 'most-reserved-listing']
            },
        ]
    });

    return queries;
}
