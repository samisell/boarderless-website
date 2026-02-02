'use client';

import { Suspense } from 'react';
import VerifyPaystack from './VerifyPaystack';

export default function VerifyPaystackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyPaystack />
        </Suspense>
    );
}