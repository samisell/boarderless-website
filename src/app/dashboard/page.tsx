
'use client';

import { useState, useEffect } from 'react';
import { WalletBalance } from './components/wallet-balance';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Hash, Phone, MessageSquare } from 'lucide-react';
import withAuth from '@/components/withAuth';
import { getActivities } from '@/lib/api';
import { Activity } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardPage() {
  const [stats, setStats] = useState([
    {
      title: 'Active Numbers',
      value: '0',
      icon: Hash,
      description: 'Total virtual numbers you own.',
    },
    {
      title: 'Total Calls',
      value: '0',
      icon: Phone,
      description: 'Inbound and outbound calls this month.',
    },
    {
      title: 'Unread Messages',
      value: '0',
      icon: MessageSquare,
      description: 'SMS and OTPs waiting for you.',
    },
  ]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getActivities();
        setStats([
          {
            title: 'Active Numbers',
            value: data.active_numbers.toString(),
            icon: Hash,
            description: 'Total virtual numbers you own.',
          },
          {
            title: 'Total Calls',
            value: data.total_calls.toString(),
            icon: Phone,
            description: 'Inbound and outbound calls this month.',
          },
          {
            title: 'Unread Messages',
            value: data.unread_messages.toString(),
            icon: MessageSquare,
            description: 'SMS and OTPs waiting for you.',
          },
        ]);
        setActivities(data.recent_transactions);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <WalletBalance />
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : activities.length > 0 ? (
              <ul className="space-y-4">
                {activities.map((activity) => (
                  <li key={activity.id} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {activity.transaction_type === 'credit' && <Phone className="h-5 w-5" />}
                      {activity.transaction_type === 'debit' && <MessageSquare className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.transaction_type === 'credit' ? 'Credit' : 'Debit'}: {activity.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No recent activity to display.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);