
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneCall } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { makeCall } from '@/lib/api';

interface MakeCallDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    fromNumber: string;
}

export function MakeCallDialog({ isOpen, onOpenChange, fromNumber }: MakeCallDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    if (!phoneNumber) {
        toast({
            variant: "destructive",
            title: "Phone number required",
            description: "Please enter a number to call.",
        });
        return;
    }
    setIsCalling(true);
    try {
        await makeCall(fromNumber, phoneNumber);
        toast({
            title: "Call initiated",
            description: `Calling ${phoneNumber} from ${fromNumber}.`,
        });
        onOpenChange(false);
        setPhoneNumber('');
    } catch (error) {
        console.error("Failed to make call", error);
        toast({
            variant: "destructive",
            title: "Call Failed",
            description: "Could not initiate the call. Please try again.",
        });
    } finally {
        setIsCalling(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Call</DialogTitle>
          <DialogDescription>
            Enter the phone number you want to call from{' '}
            <span className="font-semibold text-foreground">{fromNumber}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone-number" className="text-right">
              To:
            </Label>
            <Input
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="col-span-3"
              type="tel"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isCalling}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleCall} disabled={isCalling}>
            {isCalling ? 'Calling...' : <><PhoneCall className="mr-2 h-4 w-4" /> Call</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
