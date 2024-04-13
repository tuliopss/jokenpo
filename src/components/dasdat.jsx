import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
const Game = () => {
  const [score, setScore] = useState(0);
  const choicesPossibles = ["Rock", "Scissors", "Paper"];
  const [imageRock] = useState("Rock.png");
  const [imageScissors] = useState("Scissors.png");
  const [imagePaper] = useState("Paper.png");
  const [cpuChoice, setCpuChoice] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [userImage, setUserImage] = useState("");
  const [cpuImage, setCpuImage] = useState("");
  const [match, setMatch] = useState({});
  const [winner, setWinner] = useState("");

  const possibleMatchs = [
    { user: "Rock", cpu: "Paper", winner: "Paper" },
    { user: "Rock", cpu: "Scissors", winner: "Rock" },
    { user: "Rock", cpu: "Rock", winner: "Draw" },
    { user: "Paper", cpu: "Rock", winner: "Paper" },
    { user: "Paper", cpu: "Scissors", winner: "Scissors" },
    { user: "Paper", cpu: "Paper", winner: "Draw" },
    { user: "Scissors", cpu: "Paper", winner: "Scissors" },
    { user: "Scissors", cpu: "Rock", winner: "Rock" },
    { user: "Scissors", cpu: "Scissors", winner: "Draw" },
  ];

  useEffect(() => {
    CheckResult(userChoice, cpuChoice);
  }, [match]);

  const handlePlay = (e) => {
    const value = e.target.id;
    const index = choicesPossibles.indexOf(value);

    userPlay(value, index);
    cpuPlay();
    setMatch({ user: userChoice, cpu: cpuChoice });
    // checkWin();
  };

  const userPlay = (value, index) => {
    setUserChoice(value, index);
    changeUserImage(index);
  };

  const cpuPlay = () => {
    const index = Math.floor(Math.random() * choicesPossibles.length);
    const cpuChoice = choicesPossibles[index];

    setCpuChoice(cpuChoice);
    changeCpuImage(index);
  };

  const changeImage = (index, setImage) => {
    switch (index) {
      case 0:
        setImage(imageRock);
        break;
      case 1:
        setImage(imageScissors);

        break;
      case 2:
        setImage(imagePaper);
        break;

      default:
        break;
    }
  };

  const changeUserImage = (index) => {
    changeImage(index, setUserImage);
  };

  const changeCpuImage = (index) => {
    changeImage(index, setCpuImage);
  };

  const checkWin = (user, cpu) => {
    for (const m in possibleMatchs) {
      if (user == possibleMatchs[m].user && cpu == possibleMatchs[m].cpu) {
        if ((possibleMatchs[m].winner = user)) {
          setWinner("User");
          setScore((actualScore) => (actualScore += 50));
        } else if ((possibleMatchs[m].winner = cpu)) {
          setWinner("CPU");
          setScore((actualScore) => (actualScore -= 50));
        }
      }
    }
  };

  const checkDraw = (user, cpu) => {
    for (const m in possibleMatchs) {
      if (user == possibleMatchs[m].user && cpu == possibleMatchs[m].cpu) {
        if (user == cpu) {
          setWinner("Draw");
        }
      }
    }
  };

  const CheckResult = (user, cpu) => {
    checkWin(user, cpu);
    checkDraw(user, cpu);
  };

  return (
    <div className={styles.game}>
      <main className={styles.gameSection}>
        <p className='score'>
          <span>Score: {score}</span>
        </p>

        <div className={styles.choicesContainer}>
          <div className={styles.userActions}>
            <button
              className={styles.btnChoice}
              value={choicesPossibles[0]}
              onClick={handlePlay}>
              <img id='Rock' src={`src/assets/${imageRock}`} alt='Rock' />
            </button>
            <button
              className={styles.btnChoice}
              value={choicesPossibles[1]}
              onClick={handlePlay}>
              <img
                id='Scissors'
                src={`src/assets/${imageScissors}`}
                alt='Scissors'
              />
            </button>

            <button
              className={styles.btnChoice}
              value={choicesPossibles[2]}
              onClick={handlePlay}>
              <img id='Paper' src={`src/assets/${imagePaper}`} alt='Paper' />
            </button>
          </div>

          <div className={styles.userChoice}>
            <div className='image'></div>

            {userChoice ? (
              <img
                src={`src/assets/${userImage}`}
                alt='rock'
                className={styles.choiceImage}
              />
            ) : (
              <p className={styles.jokenpoTxtChoice}>Joookeeenpo!</p>
            )}
          </div>

          <div className={styles.cpuChoice}>
            {cpuChoice ? (
              <img
                src={`src/assets/${cpuImage}`}
                alt='rock'
                className={styles.choiceImage}
              />
            ) : (
              <p>Joookeeenpo!</p>
            )}
          </div>

          {/* <button
            onClick={() => {
              CheckResult(userChoice, cpuChoice);
            }}>
            CHECK WIN
          </button> */}
        </div>

        {winner == "user" ? (
          <p id={styles.userWinText}>USER GANHOU</p>
        ) : winner == "Draw" ? (
          <p id={styles.drawText}>Draw</p>
        ) : (
          <p id={styles.cpuWinText}>CPU GANHOU</p>
        )}
      </main>
    </div>
  );
};

export default Game;
