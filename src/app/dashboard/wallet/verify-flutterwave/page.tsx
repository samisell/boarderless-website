'use client';

import { Suspense } from 'react';
import VerifyFlutterwave from './VerifyFlutterwave';

export default function VerifyFlutterwavePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyFlutterwave />
        </Suspense>
    );
}