import React from 'react';
import { CardType } from '../types';
import { GameIcon } from './Icons';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={`relative w-full aspect-square cursor-pointer perspective-1000 group ${
         // Add z-index to matched cards so the scale effect doesn't overlap behind neighbors
         card.isMatched ? 'z-10' : 'z-0'
      }`}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full duration-500 transform-style-3d transition-all ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of Card (Face Down) */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg border-2 border-yellow-500 flex items-center justify-center">
          <svg className="w-10 h-10 text-yellow-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        </div>

        {/* Front of Card (Face Up) */}
        <div 
            className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg border-4 flex flex-col items-center justify-center p-2 transition-all duration-500
            ${card.isMatched 
                ? 'bg-yellow-50 border-yellow-500 ring-4 ring-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-105' 
                : 'bg-white border-yellow-400'
            }`}
        >
            <div className={`text-4xl sm:text-5xl transition-transform duration-500 ${card.isMatched ? 'scale-110 drop-shadow-sm' : ''}`}>
                <GameIcon type={card.type} className="w-12 h-12 sm:w-16 sm:h-16 text-blue-700" />
            </div>
            <span className={`mt-2 text-xs sm:text-sm font-bold text-center select-none transition-colors duration-300 ${card.isMatched ? 'text-yellow-700' : 'text-gray-700'}`}>
                {card.type}
            </span>
        </div>
      </div>
    </div>
  );
};

export default Card;