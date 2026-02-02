'use client';

import { Suspense } from 'react';
import ConfirmPasswordResetForm from './ConfirmPasswordResetForm';

export default function ConfirmPasswordResetPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmPasswordResetForm />
        </Suspense>
    );
}