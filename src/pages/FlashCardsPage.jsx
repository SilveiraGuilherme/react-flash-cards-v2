import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from '../components/Header';
import Main from '../components/Main';
import FlashCards from '../components/FlashCards';
import FlashCard from '../components/FlashCard';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import Loading from '../components/Loading';
import Error from '../components/Error';

import { helperShuffleArray } from '../helpers/arrayHelpers';
import { getAllFlashCards } from '../services/apiService';
import FlashCardItem from '../components/FlashCardItem';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState('');
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    //Promise:
    // getAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    //IIFE

    (async function getAllCards() {
      try {
        const backEndAllCards = await getAllFlashCards();
        setAllCards(backEndAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitleCLick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }
  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  function handleDeleteFlashCard(cardId) {
    return console.log(cardId);
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading) {
    mainJsx = (
      <>
        <Tabs>
          <TabList>
            <Tab>Listing</Tab>
            <Tab>Registration</Tab>
            <Tab>Studying</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <div>Registration</div>
          </TabPanel>

          <TabPanel>
            <div className="text-center m-4">
              <Button onButtonClick={handleShuffle}>Shuffle Cards</Button>
            </div>
            <div className="flex items-center justify-center gap-3 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleCLick}
              >
                Show Title
              </RadioButton>
              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Show Description
              </RadioButton>
            </div>
            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
