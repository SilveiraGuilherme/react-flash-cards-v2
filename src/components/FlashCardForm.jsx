export default function FlashCardForm({ createMode = true }) {
  const backGroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return <div className={backGroundClassName}>FlashCardForm</div>;
}
