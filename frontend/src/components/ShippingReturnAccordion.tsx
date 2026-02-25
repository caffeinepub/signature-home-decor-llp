import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ShippingReturnAccordion() {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      <AccordionItem value="shipping" className="border-b border-border">
        <AccordionTrigger className="font-display text-sm font-semibold tracking-wide py-4 hover:no-underline hover:text-gold">
          Shipping Information
        </AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
          <ul className="space-y-2">
            <li>• Free standard shipping on orders over $200</li>
            <li>• Standard delivery: 5–7 business days</li>
            <li>• Express delivery: 2–3 business days (additional fee)</li>
            <li>• White-glove delivery available for large furniture items</li>
            <li>• International shipping available to select countries</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns" className="border-b border-border">
        <AccordionTrigger className="font-display text-sm font-semibold tracking-wide py-4 hover:no-underline hover:text-gold">
          Return Policy
        </AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
          <ul className="space-y-2">
            <li>• 30-day hassle-free returns on most items</li>
            <li>• Items must be in original condition and packaging</li>
            <li>• Custom or personalized items are non-returnable</li>
            <li>• Free return shipping on defective items</li>
            <li>• Refunds processed within 5–7 business days</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="care" className="border-b-0">
        <AccordionTrigger className="font-display text-sm font-semibold tracking-wide py-4 hover:no-underline hover:text-gold">
          Care Instructions
        </AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
          <p>Each product comes with specific care instructions. Generally, we recommend dusting regularly with a soft cloth, avoiding direct sunlight for extended periods, and using appropriate cleaning products for the material type.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
