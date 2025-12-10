export interface CardType {
  id: string;
  type: GameItem;
  isFlipped: boolean;
  isMatched: boolean;
}

export enum GameItem {
  DAVID = 'דוד המלך',
  GOLIATH = 'גוליית',
  SLINGSHOT = 'רוגטקה',
  STONE = 'אבן',
  HARP = 'כינור (נבל)',
  SHEEP = 'כבשה',
  CROWN = 'כתר',
  SCROLL = 'מגילה'
}

export interface FactResponse {
  fact: string;
}
