export default function Error({ children: errorMessage }) {
  return (
    <span className="flex justify-center font-semibold text-red-800 my-4">
      {errorMessage}
    </span>
  );
}
