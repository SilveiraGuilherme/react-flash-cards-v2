export default function Button({
  children: buttonDescription = 'Button Description',
  onButtonClick = null,
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      className="border rounded-md p-2 bg-gray-200"
      onClick={handleButtonClick}
    >
      {buttonDescription}
    </button>
  );
}
