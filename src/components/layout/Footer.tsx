
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary/20 mt-16">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">UniShop</h3>
            <p className="text-muted-foreground text-sm">Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>Electronics</li>
              <li>Clothing</li>
              <li>Sports</li>
              <li>Home</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-3">Subscribe to get updates on new products and offers.</p>
            <div className="flex">
              <Input placeholder="Email" className="rounded-r-none" />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          &copy; 2025 UniShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
