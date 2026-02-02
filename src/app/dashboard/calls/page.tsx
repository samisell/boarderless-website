'use client';

import { useState, useEffect } from 'react';
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
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { getCalls } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import withAuth from '@/components/withAuth';
import { Call } from '@/lib/types';

function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCalls() {
      try {
        setIsLoading(true);
        const fetchedCalls = await getCalls();
        setCalls(fetchedCalls);
      } catch (error) {
        console.error('Failed to fetch calls:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCalls();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Logs</h1>
        <p className="text-muted-foreground">
          Review your inbound, outbound, and missed calls.
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  </TableRow>
                ))
              ) : (
                calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 w-fit"
                      >
                        {call.call_type === 'inbound' && (
                          <ArrowDownLeft className="h-3 w-3 text-green-500" />
                        )}
                        {call.call_type === 'outbound' && (
                          <ArrowUpRight className="h-3 w-3 text-blue-500" />
                        )}
                        {call.call_type === 'missed' && (
                          <ArrowDownLeft className="h-3 w-3 text-red-500" />
                        )}
                        <span className="capitalize">{call.call_type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{call.from_number}</TableCell>
                    <TableCell className="font-medium">{call.to_number}</TableCell>
                    <TableCell>{call.call_duration}</TableCell>
                    <TableCell>{new Date(call.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(CallsPage);