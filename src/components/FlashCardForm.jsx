import { useState } from 'react';
import Button from './Button';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({ createMode = true, onPersist = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const backGroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }
  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (onPersist) {
      onPersist(createMode, title, description);
      clearFields();
    }
  }

  function handleFormReset() {
    clearFields();
  }

  return (
    <form
      className={`${backGroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
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
      <div className="flex items-center justify-end gap-1">
        <Button colorClass="bg-red-300" type="reset">
          Clear
        </Button>
        <Button colorClass="bg-green-300" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
