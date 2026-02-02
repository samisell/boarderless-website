
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import { PlusCircle, MoreHorizontal, PhoneCall } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MakeCallDialog } from './components/make-call-dialog';
import { PurchaseNumberDialog } from './components/purchase-number-dialog';
import { getNumbers, resubscribeNumber } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export type NumberInfo = {
  id: number;
  sid: string;
  phone_number: string;
  friendly_name: string;
  purchased_at: string;
  subscription_status: string;
  subscription_end_date: string;
};

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<NumberInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<NumberInfo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadNumbers() {
      try {
        setIsLoading(true);
        const fetchedNumbers = await getNumbers();
        setNumbers(fetchedNumbers);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadNumbers();
  }, []);

  const handleMakeCallClick = (number: NumberInfo) => {
    setSelectedNumber(number);
    setIsCallDialogOpen(true);
  };

  const handlePurchaseSuccess = (newNumber: any) => {
    setNumbers(prev => [...prev, newNumber]);
    setIsPurchaseDialogOpen(false);
  }

  const handleResubscribe = async (numberId: number) => {
    try {
      const updatedNumber = await resubscribeNumber(numberId, 1);
      setNumbers(numbers.map(n => n.id === numberId ? { ...n, ...updatedNumber } : n));
      toast({ title: "Success", description: "Number resubscribed successfully." });
    } catch (error) {
      console.error("Failed to resubscribe:", error);
      toast({ title: "Error", description: "Failed to resubscribe to number.", variant: "destructive" });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Numbers</h1>
            <p className="text-muted-foreground">
              Manage your virtual phone numbers.
            </p>
          </div>
          <Button onClick={() => setIsPurchaseDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Purchase Number
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription Ends</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-2">
                        <Skeleton className="h-9 w-32" />
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  numbers.map((item) => (
                    <TableRow key={item.sid}>
                      <TableCell className="font-medium">{item.friendly_name}</TableCell>
                      <TableCell>
                        <Badge variant={item.subscription_status === 'active' ? 'default' : 'destructive'}>
                          {item.subscription_status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(item.subscription_end_date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleMakeCallClick(item)}>
                          <PhoneCall className="mr-2 h-4 w-4" />
                          Make a Call
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost" className="ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {item.subscription_status !== 'active' && (
                              <DropdownMenuItem onSelect={() => handleResubscribe(item.id)}>
                                Resubscribe
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedNumber && (
        <MakeCallDialog
          isOpen={isCallDialogOpen}
          onOpenChange={setIsCallDialogOpen}
          fromNumber={selectedNumber.phone_number}
        />
      )}
      <PurchaseNumberDialog
        isOpen={isPurchaseDialogOpen}
        onOpenChange={setIsPurchaseDialogOpen}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </>
  );
}