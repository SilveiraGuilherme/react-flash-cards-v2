import { useState } from 'react';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({ createMode = true }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }
  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  const backGroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return (
    <form className={`${backGroundClassName} p-4`}>
      <h2 className="text-center font-semibold">Flash Cards Management</h2>
      <TextInput
        labelDescription="Title:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        textAreaDescription="Description:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />
    </form>
  );
}
