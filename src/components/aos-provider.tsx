'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSProvider = () => {
    useEffect(() => {
        AOS.init({
            duration: 750,
            once: true, // whether animation should happen only once - while scrolling down
            offset: 50, // offset (in px) from the original trigger point
        });
    }, []);

    return null;
};