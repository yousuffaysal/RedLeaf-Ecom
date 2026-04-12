import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPayments = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/payments');
                console.log('Payments API response:', res.data);
                return res.data || [];
            } catch (err) {
                console.error('Error fetching payments:', err);
                console.error('Error details:', {
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    message: err.message,
                    url: err.config?.url
                });
                // If it's a 403 (Forbidden) or 404 (Not Found), provide better error message
                if (err.response?.status === 403) {
                    throw new Error('Access denied. Admin privileges required.');
                } else if (err.response?.status === 404) {
                    throw new Error('Payments endpoint not found. Please check if the server is running.');
                }
                throw err;
            }
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    return [payments, refetch, isLoading, error];
};

export default useAllPayments;