import React from 'react';
import { GameItem } from '../types';

export const GameIcon = ({ type, className }: { type: GameItem; className?: string }) => {
  switch (type) {
    case GameItem.DAVID:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
           {/* Crown */}
           <path d="M9 7L12 3L15 7L19 6L17 11H7L5 6L9 7Z" fill="gold" stroke="orange" />
           {/* Head */}
           <circle cx="12" cy="15" r="4" />
           {/* Body/Shoulders */}
           <path d="M5 23C5 23 6 19 12 19C18 19 19 23 19 23" />
        </svg>
      );
    case GameItem.GOLIATH:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Helmet */}
          <path d="M7 6C7 3.5 9 2 12 2C15 2 17 3.5 17 6V11H7V6Z" />
          <path d="M12 2V6" />
          {/* Face */}
          <rect x="8" y="11" width="8" height="6" rx="1" />
          <path d="M10 14H14" /> {/* Mouth/Grimace */}
          {/* Shoulders - Big and Broad */}
          <path d="M4 22V18L8 17" />
          <path d="M20 22V18L16 17" />
        </svg>
      );
    case GameItem.SLINGSHOT:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 20l5-10 5 10" />
          <path d="M12 10V4" />
          <circle cx="12" cy="3" r="1" />
        </svg>
      );
    case GameItem.STONE:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="8" fill="#a8a29e" stroke="#57534e" />
          <path d="M10 10h1v1h-1z" fill="#57534e" stroke="none"/>
        </svg>
      );
    case GameItem.HARP:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Frame */}
          <path d="M6 20V5c0-1.5 1-2 2.5-2h7c1.5 0 2.5.5 2.5 2v15" />
          <path d="M6 20h12" />
          {/* Strings */}
          <path d="M9 4v16" strokeWidth="1" />
          <path d="M12 4v16" strokeWidth="1" />
          <path d="M15 4v16" strokeWidth="1" />
        </svg>
      );
    case GameItem.SHEEP:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
           {/* Fluffy Body */}
           <path d="M16 8a4 4 0 0 0-3-2 3.5 3.5 0 0 0-3 1.5 3.5 3.5 0 0 0-3-1.5 4 4 0 0 0-4 5c0 2.5 2 4.5 5 4.5h6c3 0 5-2 5-4.5a4 4 0 0 0-1-3z" />
           {/* Head */}
           <path d="M19 10a2.5 2.5 0 1 1-2-3" />
           {/* Legs */}
           <path d="M7 16v4" />
           <path d="M10 16v4" />
           <path d="M14 16v4" />
           <path d="M17 16v4" />
        </svg>
      );
    case GameItem.CROWN:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
      );
    case GameItem.SCROLL:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
          <path d="M19 4v16" />
          <path d="M5 8h10" />
          <path d="M5 12h10" />
          <path d="M5 16h8" />
        </svg>
      );
    default:
      return null;
  }
};