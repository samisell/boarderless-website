'use client';

import { useState } from 'react';
import { initializePaystackPayment, initializeFlutterwavePayment } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FundWalletDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FundWalletDialog({ isOpen, onClose }: FundWalletDialogProps) {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'flutterwave'>('paystack');
    const { toast } = useToast();

    const handlePayment = async () => {
        try {
            const paymentAmount = parseFloat(amount);
            if (isNaN(paymentAmount) || paymentAmount <= 0) {
                toast({ title: 'Invalid amount', description: 'Please enter a valid amount.' });
                return;
            }

            if (paymentMethod === 'paystack') {
                const res = await initializePaystackPayment({ amount: paymentAmount });
                window.location.href = res.data.authorization_url;
            } else {
                const res = await initializeFlutterwavePayment({ amount: paymentAmount, redirect_url: `${window.location.origin}/dashboard/wallet/verify-flutterwave` });
                window.location.href = res.data.link;
            }
        } catch (error) {
            toast({ title: 'Payment failed', description: 'Could not initiate payment.' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Fund Wallet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex space-x-4">
                        <Button
                            variant={paymentMethod === 'paystack' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('paystack')}
                        >
                            Paystack
                        </Button>
                        <Button
                            variant={paymentMethod === 'flutterwave' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('flutterwave')}
                        >
                            Flutterwave
                        </Button>
                    </div>
                    <Button onClick={handlePayment}>Proceed to Payment</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}