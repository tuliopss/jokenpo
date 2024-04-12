import React, { useState } from "react";
import styles from "./Game.module.css";
const Game = () => {
  const [score, setScore] = useState(0);
  const [choicesPossibles, setChoicesPossibles] = useState([
    "Rock",
    "Scissors",
    "Paper",
  ]);

  const [cpuChoice, setCpuChoice] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [userImage, setUserImage] = useState("");
  const [cpuImage, setCpuImage] = useState("");
  const [imageRock, setImageRock] = useState("Rock.png");
  const [imageScissors, setImageScissors] = useState("Scissors.png");
  const [imagePaper, setImagePaper] = useState("Paper.png");
  const [match, setMatch] = useState({});

  const handlePlay = (e) => {
    const value = e.target.id;
    const index = choicesPossibles.indexOf(value);

    // cpuPlay();
    userPlay(value, index);
    cpuPlay();
    setMatch({ user: userChoice, cpu: cpuChoice });
    checkWin();
  };

  const userPlay = (value, index) => {
    setUserChoice(value, index);
    changeUserImage(index);
    // cpuPlay();
  };

  const cpuPlay = () => {
    const index = Math.floor(Math.random() * choicesPossibles.length);
    const cpuChoice = choicesPossibles[index];

    setCpuChoice(cpuChoice);
    changeCpuImage(index);
    // setMatch(...match, { cpu: cpuChoice });
  };

  const changeUserImage = (index) => {
    switch (index) {
      case 0:
        setUserImage(imageRock);
        break;
      case 1:
        setUserImage(imageScissors);

        break;
      case 2:
        setUserImage(imagePaper);

        break;

      default:
        break;
    }
  };

  const changeCpuImage = (index) => {
    switch (index) {
      case 0:
        setCpuImage(imageRock);

        break;
      case 1:
        setCpuImage(imageScissors);

        break;
      case 2:
        setCpuImage(imagePaper);

        break;

      default:
        break;
    }
  };

  // const cpuPlay = () => {
  //   const index = Math.floor(Math.random() * choicesPossibles.length);

  //   setCpuChoice(choicesPossibles[index]);
  //   changeCpuImage(index);
  //   setMatch({ ...match, cpu: choicesPossibles[index] });
  // };

  const checkWin = (user, cpu) => {
    const matchs = [
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

    for (const prop in matchs) {
      if (user == matchs[prop].user && cpu == matchs[prop].cpu) {
        console.log(matchs[prop]);
        if (matchs[prop].winner == cpu) {
          console.log("cpu ganhou");
          setScore((actualScore) => (actualScore -= 40));
        } else if (user == cpu) {
          console.log("draw");
        } else {
          console.log("user ganhou");
          setScore((actualScore) => (actualScore += 100));
        }
      }
    }
    // for (let i = 0; i < wins.length; i++) {
    //   // console.log(match);
    //   if (match["user"] == wins[i].user) {
    //     console.log(wins[i]);
    //   } else {
    //   }
    // }
  };
  return (
    <div className={styles.game}>
      <section className={styles.gameSection}>
        <p className='score'>
          <span>Score: {score}</span>
        </p>

        <div className={styles.choicesContainer}>
          <div className={styles.userActions}>
            <button value={choicesPossibles[0]} onClick={handlePlay}>
              <img
                id='Rock'
                className={styles.btnChoice}
                src={`src/assets/${imageRock}`}
                alt='Rock'
              />
            </button>

            <button value={choicesPossibles[1]} onClick={handlePlay}>
              <img
                id='Scissors'
                className={styles.btnChoice}
                src={`src/assets/${imageScissors}`}
                alt='Scissors'
              />
            </button>

            <button value={choicesPossibles[2]} onClick={handlePlay}>
              <img
                id='Paper'
                className={styles.btnChoice}
                src={`src/assets/${imagePaper}`}
                alt='Paper'
              />
            </button>
          </div>
          <div className={styles.userChoice}>
            <div className='image'></div>

            {userImage ? (
              <img
                src={`src/assets/${userImage}`}
                alt='rock'
                className={styles.choiceImage}
              />
            ) : (
              <p>d</p>
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
              <p>d</p>
            )}
          </div>

          <button
            onClick={() => {
              checkWin(userChoice, cpuChoice);
            }}>
            CHECK WIN
          </button>
        </div>
        {match.winner == userChoice ? <p>USER GANHOU</p> : <p>CPU GANHOU</p>}
      </section>
    </div>
  );
};

export default Game;
