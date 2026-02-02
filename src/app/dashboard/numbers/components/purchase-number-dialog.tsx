
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight, CreditCard, PartyPopper } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { findAvailableNumbers, purchaseNumber, getTwilioCountries } from '@/lib/api';

interface PurchaseNumberDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPurchaseSuccess: (newNumber: any) => void;
}

interface Country {
  name: string;
  code: string;
}

type Step = 'selectCountry' | 'selectNumber' | 'payment' | 'success';

export function PurchaseNumberDialog({ isOpen, onOpenChange, onPurchaseSuccess }: PurchaseNumberDialogProps) {
  const [step, setStep] = useState<Step>('selectCountry');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [availableNumbers, setAvailableNumbers] = useState<any[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<any | null>(null);
  const [purchasedNumberDetails, setPurchasedNumberDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchCountries = async () => {
        try {
          const countryData = await getTwilioCountries();
          setCountries(countryData);
        } catch (error) {
          console.error("Failed to fetch countries", error);
          toast({ variant: 'destructive', title: 'Error fetching countries' });
        }
      };
      fetchCountries();
    }
  }, [isOpen, toast]);

  const resetState = () => {
    setStep('selectCountry');
    setSelectedCountry(null);
    setAvailableNumbers([]);
    setSelectedNumber(null);
    setPurchasedNumberDetails(null);
    setIsLoading(false);
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }
    onOpenChange(open);
  }

  const handleFindNumbers = async () => {
    if (!selectedCountry) {
      toast({ variant: 'destructive', title: 'Please select a country.' });
      return;
    }
    setIsLoading(true);
    try {
      const numbers = await findAvailableNumbers(selectedCountry.code);
      setAvailableNumbers(numbers);
      if (numbers.length > 0) {
        setSelectedNumber(numbers[0]);
        setStep('selectNumber');
      } else {
        toast({ title: 'No numbers found', description: `No available numbers for ${selectedCountry.name}.` })
      }
    } catch (error) {
      console.error("Failed to find numbers", error);
      toast({ variant: 'destructive', title: 'Error finding numbers' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!selectedNumber) {
      toast({ variant: 'destructive', title: 'Please select a number to purchase.' });
      return;
    }
    setStep('payment');
  }

  const confirmPayment = async () => {
    if (selectedNumber) {
      setIsLoading(true);
      try {
        const purchased = await purchaseNumber(selectedNumber.phone_number);
        setPurchasedNumberDetails(purchased);
        setStep('success');
      } catch (error) {
        console.error("Failed to purchase number", error);
        toast({ variant: 'destructive', title: 'Payment failed' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const finish = () => {
    onPurchaseSuccess(purchasedNumberDetails);
    handleOpenChange(false);
  }

  const renderContent = () => {
    switch (step) {
      case 'selectCountry':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Purchase a New Number</DialogTitle>
              <DialogDescription>Step 1: Select the country for your new number.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => setSelectedCountry(countries.find(c => c.code === value) || null)}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>Cancel</Button>
              <Button onClick={handleFindNumbers} disabled={!selectedCountry || isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Find Numbers'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </DialogFooter>
          </>
        );

      case 'selectNumber':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Choose Your Number</DialogTitle>
              <DialogDescription>Step 2: Select one of the available numbers for {selectedCountry?.name}.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <RadioGroup value={selectedNumber?.phone_number} onValueChange={(value) => setSelectedNumber(availableNumbers.find(n => n.phone_number === value) || null)}>
                <ScrollArea className="h-[240px] pr-4">
                  <div className="space-y-2">
                    {availableNumbers.map(num => (
                      <Label key={num.phone_number} className="flex items-center gap-3 p-3 border rounded-md has-[:checked]:bg-accent has-[:checked]:border-primary cursor-pointer">
                        <RadioGroupItem value={num.phone_number} id={num.phone_number} />
                        <span className="font-mono text-base">{num.friendly_name}</span>
                        <span className="ml-auto font-semibold">₦{num.price}/month</span>
                      </Label>
                    ))}
                  </div>
                </ScrollArea>
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('selectCountry')}>Back</Button>
              <Button onClick={handlePurchase}>
                Purchase Selected Number
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )

      case 'payment':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Purchase</DialogTitle>
              <DialogDescription>Step 3: Review your order and complete the payment.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <p>You are purchasing the following number:</p>
              <div className="p-4 bg-muted rounded-md text-center">
                <p className="font-mono text-xl font-semibold">{selectedNumber?.friendly_name}</p>
                <p className="text-sm text-muted-foreground">{selectedCountry?.name}</p>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Price:</span>
                <span>₦{selectedNumber?.price}/month</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('selectNumber')} disabled={isLoading}>Back</Button>
              <Button onClick={confirmPayment} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Confirm Payment'}
                {!isLoading && <CreditCard className="mr-2 h-4 w-4" />}
              </Button>
            </DialogFooter>
          </>
        )
      case 'success':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Purchase Successful!</DialogTitle>
            </DialogHeader>
            <div className="py-8 text-center flex flex-col items-center">
              <PartyPopper className="h-16 w-16 text-primary mb-4" />
              <p>You are now the proud owner of:</p>
              <p className="font-mono text-xl font-semibold my-2">{purchasedNumberDetails?.friendly_name}</p>
              <p className="text-muted-foreground">You can start using it immediately.</p>
              {purchasedNumberDetails?.subscription_end_date && (
                <p className="text-sm text-muted-foreground mt-2">
                  Your subscription is active until {new Date(purchasedNumberDetails.subscription_end_date).toLocaleDateString()}.
                </p>
              )}
            </div>
            <DialogFooter>
              <Button className="w-full" onClick={finish}>Great, thanks!</Button>
            </DialogFooter>
          </>
        )
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}