'use client';

import { useState } from 'react';
import { initializePaystackPayment, initializeFlutterwavePayment } from '@/lib/api';
import { FlutterwaveInitializationData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FundWalletPage() {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('paystack');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            let response;
            if (paymentMethod === 'paystack') {
                response = await initializePaystackPayment({
                    amount: Number(amount) * 100,
                });
                window.location.href = response.data.authorization_url;
            } else if (paymentMethod === 'flutterwave') {
                const paymentData: FlutterwaveInitializationData = {
                    amount: Number(amount),
                    redirect_url: `${window.location.origin}/dashboard/wallet/verify-flutterwave`,
                };
                response = await initializeFlutterwavePayment(paymentData);
                window.location.href = response.data.link;
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Fund Your Wallet</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Payment Method</Label>
                    <div className="flex gap-4">
                        <Button
                            variant={paymentMethod === 'paystack' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('paystack')}>
                            Paystack
                        </Button>
                        <Button
                            variant={paymentMethod === 'flutterwave' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('flutterwave')}>
                            Flutterwave
                        </Button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button onClick={handlePayment} disabled={loading || !amount}>
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>
            </CardContent>
        </Card>
    );
}