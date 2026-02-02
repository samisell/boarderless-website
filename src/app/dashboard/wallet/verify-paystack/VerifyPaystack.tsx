'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyPaystackPayment } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function VerifyPaystack() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get('reference');
    const { toast } = useToast();

    useEffect(() => {
        if (reference) {
            const verify = async () => {
                try {
                    const res = await verifyPaystackPayment({ reference });
                    toast({
                        title: 'Payment Successful',
                        description: `Your new balance is NGN ${res.balance}`,
                    });
                } catch (error) {
                    toast({
                        title: 'Payment Verification Failed',
                        description: 'Could not verify your payment.',
                        variant: 'destructive',
                    });
                } finally {
                    router.push('/dashboard/wallet');
                }
            };
            verify();
        } else {
            router.push('/dashboard/wallet');
        }
    }, [reference, toast, router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Verifying your payment...</h1>
                <p className="text-gray-500">Please wait while we confirm your transaction.</p>
            </div>
        </div>
    );
}