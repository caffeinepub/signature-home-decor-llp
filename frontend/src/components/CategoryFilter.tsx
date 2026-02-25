import React from 'react';

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Outdoor', 'Office', 'Dining Room', 'Garden'];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-150 border ${
              isActive
                ? 'bg-foreground text-background border-foreground'
                : 'bg-card text-foreground border-border hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
