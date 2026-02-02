"use client";

import { useEffect, useState } from "react";
import { getUserWallet } from "@/lib/api";
import { Wallet } from "@/lib/types";

export function WalletBalance() {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const walletData = await getUserWallet();
                setWallet(walletData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchWallet();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!wallet) {
        return <div>Loading wallet balance...</div>;
    }

    const formattedBalance = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(Number(wallet.balance));

    return (
        <div className="p-4 bg-card rounded-lg">
            <h2 className="text-lg font-semibold">Wallet Balance</h2>
            <p className="text-2xl">{formattedBalance}</p>
        </div>
    );
}