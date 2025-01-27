// eslint-disable-next-line react/prop-types
export default function OpeningPage({ startGame }) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center relative rounded-lg border-2 border-gray-900 bg-[#a388ee] px-6 py-6 text-lg font-bold text-gray-900 shadow-[4px_4px_0px_0px_#000] mx-5">
      <h1 className="text-3xl text-center">Number Guessing Game</h1>
      <h2 className="text-center">Can you guess the correct number?</h2>
      <button className="relative rounded-lg border-2 border-gray-900 bg-[#a388ee] px-6 py-3 text-lg font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}