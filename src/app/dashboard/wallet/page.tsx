'use client';

import { useEffect, useState } from 'react';
import { getUserWallet, listUserTransactions } from '@/lib/api';
import { Wallet, Transaction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

export default function WalletPage() {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [walletData, transactionsData] = await Promise.all([
                    getUserWallet(),
                    listUserTransactions(),
                ]);
                setWallet(walletData);
                setTransactions(transactionsData);
            } catch (err) {
                setError('Failed to fetch wallet information.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
                <Button asChild>
                    <Link href="/dashboard/wallet/fund">
                        <PlusCircle className="mr-2 h-4 w-4" /> Fund Wallet
                    </Link>
                </Button>
            </div>

            {wallet && (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">NGN {wallet.balance}</p>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A list of your recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.transaction_type}</TableCell>
                                        <TableCell>NGN {tx.amount}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    tx.status === 'completed' ? 'default' : 'secondary'
                                                }
                                            >
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(tx.timestamp).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No transactions yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}