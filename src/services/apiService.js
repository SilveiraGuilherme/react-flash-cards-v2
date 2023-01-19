import { create, exclude, read } from './httpService';
import { getNewId } from './idService';

export async function getAllFlashCards() {
  const allFlashCards = await read('/flashcards');
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = await create('/flashcards', {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}
