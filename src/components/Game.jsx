import React, { useEffect, useState } from "react";
import styles from "./Game.module.css";
const Game = () => {
  const [score, setScore] = useState(0);
  const [imageRock] = useState("src/assets/Rock.png");
  const [imageScissors] = useState("src/assets/Scissors.png");
  const [imagePaper] = useState("./src/assets/Paper.png");
  const [cpuChoice, setCpuChoice] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [userImage, setUserImage] = useState("");
  const [cpuImage, setCpuImage] = useState("");
  const [match, setMatch] = useState({});
  const [winner, setWinner] = useState("");
  const [visibilityImage, setVisibilityImage] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

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
  const choicesPossibles = ["Rock", "Scissors", "Paper"];

  useEffect(() => {
    CheckResult(userChoice, cpuChoice);

    setTimeout(() => {
      clearChoices();
      setDisableBtn(true);
    }, 3000);

    // clearChoices();
    console.log("user", disableBtn);
  }, [match]);

  const handlePlay = (e) => {
    setDisableBtn(false);
    const value = e.target.id;
    const index = choicesPossibles.indexOf(value);
    console.log(e.target);
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
    setVisibilityImage(true);
  };

  const changeCpuImage = (index) => {
    changeImage(index, setCpuImage);
    setVisibilityImage(true);
  };

  const checkWin = (user, cpu) => {
    for (const m in possibleMatchs) {
      if (user == possibleMatchs[m].user && cpu == possibleMatchs[m].cpu) {
        if (possibleMatchs[m].winner == user) {
          setWinner("User");
          setScore((actualScore) => (actualScore += 50));
        } else if (possibleMatchs[m].winner == cpu) {
          setWinner(cpu);
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
    console.log(winner);
  };

  const clearChoices = () => {
    setVisibilityImage(false);
    setWinner("");
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
              disabled={!disableBtn}
              className={styles.btnChoice}
              value={choicesPossibles[0]}
              onClick={handlePlay}>
              <img id='Rock' src={imageRock} alt='Rock' />
            </button>
            <button
              disabled={!disableBtn}
              className={styles.btnChoice}
              value={choicesPossibles[1]}
              onClick={handlePlay}>
              <img id='Scissors' src={imageScissors} alt='Scissors' />
            </button>

            <button
              disabled={!disableBtn}
              className={styles.btnChoice}
              value={choicesPossibles[2]}
              onClick={handlePlay}>
              <img id='Paper' src={imagePaper} alt='Paper' />
            </button>
          </div>

          <div className={styles.userChoice}>
            <div className='image'></div>

            {visibilityImage ? (
              <img
                src={userImage}
                // alt='rock'
                className={styles.choiceImage}
              />
            ) : (
              <span>
                <strong>Joookeeenpo!</strong>
              </span>
            )}
          </div>

          <div className={styles.cpuChoice}>
            {visibilityImage ? (
              <img
                src={cpuImage}
                // alt='rock'
                className={styles.choiceImage}
              />
            ) : (
              <span>
                <strong>Joookeeenpo!</strong>
              </span>
            )}
          </div>

          {/* <button
            onClick={() => {
              CheckResult(userChoice, cpuChoice);
            }}>
            CHECK WIN
          </button> */}
        </div>

        {winner == "" ? (
          <></>
        ) : winner == "User" ? (
          <p id={styles.userWinText}>
            <strong>USER GANHOU</strong>
          </p>
        ) : winner == "Draw" ? (
          <p id={styles.drawText}>
            <strong>Draw</strong>
          </p>
        ) : (
          <p id={styles.cpuWinText}>
            <strong>CPU GANHOU</strong>
          </p>
        )}
      </main>
    </div>
  );
};

export default Game;
