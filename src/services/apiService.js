import { get } from './httpService';

const backEndUrl = 'http://localhost:3001/flashcards';

export async function getAllFlashCards() {
  const allFlashCards = await get(backEndUrl);
  return allFlashCards;
}
