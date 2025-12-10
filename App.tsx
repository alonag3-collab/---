
import React, { useState, useEffect, useCallback } from 'react';
import { CardType, GameItem } from './types';
import Card from './components/Card';
import { getBiblicalFact } from './services/geminiService';
import { GameIcon } from './components/Icons';
import { soundService } from './services/soundService';

// Helper to shuffle cards
const shuffleCards = (): CardType[] => {
  const items = Object.values(GameItem);
  const deck = [...items, ...items].map((item, index) => ({
    id: `card-${index}`,
    type: item,
    isFlipped: false,
    isMatched: false,
  }));

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>('התאם זוגות כדי לגלות עובדות מעניינות!');
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize Game
  useEffect(() => {
    resetGame();
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!gameWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameWon]);

  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setIsLocked(false);
    setGameWon(false);
    setCurrentFact('התאם זוגות כדי לגלות עובדות מעניינות!');
  };

  const toggleMute = () => {
    const newMuteStatus = soundService.toggleMute();
    setIsMuted(newMuteStatus);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (isLocked) return;

    soundService.playFlip();

    // Flip the card
    const newCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);
      checkForMatch(newCards, newFlippedCards[0], newFlippedCards[1]);
    }
  };

  const checkForMatch = useCallback(async (currentCards: CardType[], card1: CardType, card2: CardType) => {
    if (card1.type === card2.type) {
      // Match found
      const updatedCards = currentCards.map((c) =>
        c.type === card1.type ? { ...c, isMatched: true } : c
      );
      setCards(updatedCards);
      setFlippedCards([]);
      setIsLocked(false);
      
      const newMatches = matches + 1;
      setMatches(newMatches);

      if (newMatches === Object.values(GameItem).length) {
          setGameWon(true);
          soundService.playWin();
      } else {
          soundService.playMatch();
      }

      // Fetch interesting fact via Gemini
      setIsLoadingFact(true);
      const fact = await getBiblicalFact(card1.type);
      setCurrentFact(fact);
      setIsLoadingFact(false);

    } else {
      // No match
      soundService.playError();
      setTimeout(() => {
        const resetCards = currentCards.map((c) =>
          c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
        );
        setCards(resetCards);
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
  }, [matches]);

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 bg-[#f8f5e6]">
      {/* Header */}
      <header className="text-center mb-8 relative w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2 flex items-center justify-center gap-3">
          <GameIcon type={GameItem.CROWN} className="w-10 h-10 text-yellow-500" />
          משחק הזיכרון - דוד המלך
        </h1>
        <p className="text-gray-600 text-lg">מצאו את הזוגות וגלו את הסיפור!</p>
        
        <button 
            onClick={toggleMute}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title={isMuted ? "בטל השתקה" : "השתק"}
        >
            {isMuted ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )}
        </button>
      </header>

      {/* Stats Bar */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 bg-white px-6 py-3 rounded-2xl shadow-md border border-yellow-200">
        <div className="text-center min-w-[60px]">
          <span className="block text-sm text-gray-500">זמן</span>
          <span className="text-xl font-bold text-blue-800 tabular-nums">{formatTime(timer)}</span>
        </div>
        <div className="text-center min-w-[60px]">
          <span className="block text-sm text-gray-500">מהלכים</span>
          <span className="text-xl font-bold text-blue-800">{moves}</span>
        </div>
        <div className="text-center min-w-[60px]">
          <span className="block text-sm text-gray-500">זוגות</span>
          <span className="text-xl font-bold text-blue-800">{matches} / {Object.values(GameItem).length}</span>
        </div>
        <button
          onClick={resetGame}
          className="mr-2 sm:mr-4 px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors text-sm"
        >
          משחק חדש
        </button>
      </div>

      {/* Fact Box (Gemini Output) */}
      <div className="w-full max-w-2xl min-h-[80px] mb-8 bg-blue-50 border-r-4 border-blue-600 rounded-lg p-4 shadow-sm flex items-start gap-4 transition-all">
        <div className="mt-1 flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-blue-900 text-sm mb-1">הידעת?</h3>
          {isLoadingFact ? (
            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
               <span>דולה מידע...</span>
            </div>
          ) : (
            <p className="text-gray-800 leading-relaxed text-sm md:text-base">{currentFact}</p>
          )}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl mx-auto mb-12">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isLocked || card.isFlipped || card.isMatched}
          />
        ))}
      </div>

      {/* Winner Modal */}
      {gameWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-yellow-400 animate-bounce-in">
            <div className="flex justify-center mb-4">
               <GameIcon type={GameItem.HARP} className="w-20 h-20 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">כל הכבוד!</h2>
            <p className="text-gray-600 mb-6">סיימת את המשחק בהצלחה ב-{formatTime(timer)} דקות ו-{moves} מהלכים.</p>
            <p className="text-sm text-gray-500 mb-8 italic">"וַיִּקַּח דָּוִד אֶת כִּנּוֹרוֹ וְנִגֵּן בְּיָדוֹ..."</p>
            <button
              onClick={resetGame}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              שחק שוב
            </button>
          </div>
        </div>
      )}

      <footer className="mt-auto text-gray-400 text-sm py-4">
        דוד המלך - משחק זיכרון אינטראקטיבי
      </footer>
    </div>
  );
};

export default App;
