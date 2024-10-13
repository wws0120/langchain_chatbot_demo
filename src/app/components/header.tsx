'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold text-lg text-blue-800 sm:inline-block px-2">
              香韻之旅
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-semibold">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              Chatbot
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/document"
            >
              Shop Information
            </Link>
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              <Link
                className="text-lg font-medium"
                href="/"
                onClick={() => setIsOpen(false)}
              >
                Chatbot
              </Link>
              <Link
                className="text-lg font-medium"
                href="/document"
                onClick={() => setIsOpen(false)}
              >
                Shop Information
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
