'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
import { getConversations, getMessages, getNumbers, sendSms } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import withAuth from '@/components/withAuth';

export type Conversation = {
  id: string;
  from: string;
  lastMessage: string;
  time: string;
  avatar: string;
};

export type Message = {
  id: string;
  content: string;
  time: string;
  type: 'inbound' | 'outbound';
};

function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [userNumbers, setUserNumbers] = useState<any[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoadingConversations(true);
        const [fetchedConversations, fetchedNumbers] = await Promise.all([
          getConversations(),
          getNumbers(),
        ]);
        setConversations(fetchedConversations);
        setUserNumbers(fetchedNumbers);
        if (fetchedNumbers.length > 0) {
          setSelectedNumber(fetchedNumbers[0].phone_number);
        }
        if (fetchedConversations.length > 0) {
          handleConversationSelect(fetchedConversations[0]);
        }
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setIsLoadingConversations(false);
      }
    }
    loadInitialData();
  }, []);

  const handleConversationSelect = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    try {
      setIsLoadingMessages(true);
      const fetchedMessages = await getMessages(conversation.id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error(`Failed to fetch messages for ${conversation.id}:`, error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !selectedNumber) return;

    const tempMessage = newMessage;
    setNewMessage('');

    try {
      const sentMessage = await sendSms(selectedNumber, selectedConversation.from, tempMessage);
      setMessages(prev => [...prev, sentMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Optionally, show a toast notification for the error
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.24))]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Read and reply to your messages.
          </p>
        </div>
        {userNumbers.length > 0 && (
          <div className="w-full max-w-xs">
            <Select onValueChange={setSelectedNumber} defaultValue={selectedNumber || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select a number" />
              </SelectTrigger>
              <SelectContent>
                {userNumbers.map((number) => (
                  <SelectItem key={number.id} value={number.phone_number}>
                    {number.friendly_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <Card className="h-full">
        <div className="grid h-full grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col border-r">
            <div className="p-4 border-b">
              <Input placeholder="Search conversations..." />
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {isLoadingConversations ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))
                ) : (
                  conversations.map((convo) => (
                    <div
                      key={convo.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedConversation?.id === convo.id ? 'bg-accent/50' : 'hover:bg-accent/50'}`}
                      onClick={() => handleConversationSelect(convo)}
                    >
                      <Avatar>
                        <AvatarImage src={convo.avatar} />
                        <AvatarFallback>{convo.from.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-semibold truncate">{convo.from}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.lastMessage}
                        </p>
                      </div>
                      <time className="text-xs text-muted-foreground">{convo.time}</time>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col md:col-span-2">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.from.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{selectedConversation.from}</p>
                </div>
                <ScrollArea className="flex-1 p-6 space-y-4">
                  {isLoadingMessages ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-48" />
                      <Skeleton className="h-12 w-48 ml-auto" />
                      <Skeleton className="h-16 w-64" />
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className={`flex items-end gap-2 ${msg.type === 'outbound' ? 'justify-end' : ''}`}>
                        <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.type === 'outbound' ? 'bg-primary/80 text-primary-foreground' : 'bg-muted'}`}>
                          <p>{msg.content}</p>
                          <time className={`text-xs block text-right mt-1 ${msg.type === 'outbound' ? 'text-primary-foreground/80' : 'text-muted-foreground/80'}`}>{msg.time}</time>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="relative">
                    <Input
                      placeholder="Type your message..."
                      className="pr-12"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-muted-foreground">
                <p>Select a conversation to start messaging.</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default withAuth(MessagesPage);