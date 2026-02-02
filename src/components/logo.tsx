import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/icon-192x192.png" alt="Boarderless Network Logo" width={24} height={24} />
      <span className="text-xl font-bold font-headline hidden sm:inline-block">
        Boarderless Network
      </span>
    </Link>
  );
}