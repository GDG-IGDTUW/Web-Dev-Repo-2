import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import OpeningPage from "./components/OpeningPage";
import Game from "./components/Game";
import { Toaster } from "react-hot-toast";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };
  return (
    <>
      <Background />
      <main className="flex justify-center items-center h-screen">
        {isGameStarted ? <Game /> : <OpeningPage startGame={startGame} />}
      </main>
      <Toaster position="top-center" gutter={8} toastOptions={{
        duration: 2000,
         style: {
          background: "#e3dff2",
          color: "#000",
          fontSize: "1.2rem",
          boxShadow: "4px 4px 0px 0px #000",
          fontFamily: "inherit",
          fontWeight: "bold",
         }
      }} />
    </>
  );
}

export default App;
