'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { verifyEmail, resendOtp } from '@/lib/api';

export default function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await verifyEmail({ email, otp });
            setSuccess('Email verified successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await resendOtp({ email });
            setSuccess('A new OTP has been sent to your email.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                    An OTP has been sent to <strong>{email}</strong>. Please enter it below.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="otp">OTP</Label>
                        <Input
                            id="otp"
                            placeholder="123456"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResendOtp}
                        disabled={resendLoading}
                    >
                        {resendLoading ? 'Sending...' : 'Resend OTP'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}