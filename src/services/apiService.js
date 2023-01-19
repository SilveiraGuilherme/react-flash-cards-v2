import { exclude, read } from './httpService';

export async function getAllFlashCards() {
  const allFlashCards = await read('/flashcards');
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}
