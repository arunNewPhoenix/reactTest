import React, { useState, useEffect } from "react";   //useEffect for the rendering after any action
import cloneDeep from "lodash.clonedeep";
import { useEvent, getColors } from "./util";
import Swipe from "react-easy-swipe";

/*
GAME LOgic:

the game consist of 4 cross 4 matrix and if all are initialized with 0 then each array in 2d matrix after putting a random it will be:
a array as:  {2,0,0,2}
the after adding more element it will be an array of for example : {2,4,8,2};

so using pointers in each array as slow for the 0th index and the 1th index thus iterating over the each array .
---> check for same check for case given below in swipe left and add if same



*/



function App() {
  const UP_ARROW = 38;  //assinging the ascii to the variable
  const DOWN_ARROW = 40;  //assigning the ascii to the variable
  const LEFT_ARROW = 37;  //assinging the ascii to the variable
  const RIGHT_ARROW = 39;  //assinging the ascii to the variable

//used react Hooks as useState to collect data from setData function into data var on initialization with 0 on all
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false); //useState for initializing setGameOver with false 

  // Initialize
  const initialize = () => {
    // console.log("CALLING INITIALIZE");

    let newGrid = cloneDeep(data); //deep clone to show the effect on original array
    console.log(newGrid);

   //log statements
    addNum(newGrid);
    console.table(newGrid);
    addNum(newGrid);
    console.table(newGrid);
    setData(newGrid);
  };

  // AddNumber - Add an item
  const addNum = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);

     //number of random number generated equals number of attempts

      attempts++;
      if (newGrid[rand1][rand2] === 0)
       {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;  //if math.random > 0.5 then get the 2 else 4
        added = true;
      }
      if (attempts > 50) {
        gridFull = true;
        let gameOverr = checkIfGameOver();
        if (gameOverr) {
          alert("game over Click on New to play Again!");
          
        }
       
      }
    }
  };
  // Swipe Left
  const swipeLeft = (dummy) => {
    console.log("swipe left");
    let oldGrid = data;   //getting data from the original array
    let newArray = cloneDeep(data);   //making a deepclone of the original array

    for (let i = 0; i < 4; i++) {
      let arr = newArray[i];  //can be taken as a 1D array iterating line by line

      let slow = 0;   //pointing to the 0th index of the array
      let fast = 1;   //pointing to the 1th index of the array


      while (slow < 4) 
      {
        if (fast === 4)  //when fast reaches the last of the current array
         {
          fast = slow + 1;  
          slow++;
          continue;
        }
        if (arr[slow] === 0 && arr[fast] === 0)//case when both are zero then move fast ahead 
        {
          fast++;
        } 
        else if (arr[slow] === 0 && arr[fast] !== 0)  //case when element at slow is 0 and element at fast is non zero then exchange both elements thus create shift
         {
          arr[slow] = arr[fast];
          arr[fast] = 0;
          fast++;
        } 
        else if (arr[slow] !== 0 && arr[fast] === 0)  // case if element at slow is non zero and element at fast is zero then move fast ahead
         {
          fast++;
        } 
        else if (arr[slow] !== 0 && arr[fast] !== 0) //case when both are non zero check for equal 
         {
          if (arr[slow] === arr[fast]) {
            arr[slow] = arr[slow] + arr[fast];  //add both in element in the element at slow
            arr[fast] = 0;
            fast = slow + 1;
            slow++;
          } else
          {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray))  //use to check for the same array as old arrya
    {
      addNum(newArray);
    }
    if (dummy) 
    {
      return newArray;
    } else 
    {
      setData(newArray);
    }
  };
  
  const swipeRight = (dummy) => {
    console.log("swipe right");
    let oldData = data;
    let newArray = cloneDeep(data);


    //iterating in the array from the last 
    //code logic same as left swipe

    for (let i = 3; i >= 0; i--) {
      let arr = newArray[i];
      let slow = arr.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (arr[slow] === 0 && arr[fast] === 0) 
        {
          fast--;
        } else if (arr[slow] === 0 && arr[fast] !== 0) 
        {
          arr[slow] = arr[fast];
          arr[fast] = 0;
          fast--;
        } else if (arr[slow] !== 0 && arr[fast] === 0)
         {
          fast--;
        } else if (arr[slow] !== 0 && arr[fast] !== 0)
         {
          if (arr[slow] === arr[fast]) {
            arr[slow] = arr[slow] + arr[fast];
            arr[fast] = 0;
            fast = slow - 1;
            slow--;
          } else 
          {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }

    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNum(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };
 //code logic for the swipe up and down is same but the iteration is bit different as we iterating in one column therefore used 2d array

  const swipeDown = (dummy) => {
    console.log("swipe down");
    console.log(data);
    let arr = cloneDeep(data);

    let oldData = JSON.parse(JSON.stringify(data));

    for (let i = 3; i >= 0; i--)
     {
      let slow = arr.length - 1;
      let fast = slow - 1;
      while (slow > 0)
       {
        if (fast === -1) 
        {
          fast = slow - 1;
          slow--;
          continue;
        }

        if (arr[slow][i] === 0 && arr[fast][i] === 0) 
        {
          fast--;
        } else if (arr[slow][i] === 0 && arr[fast][i] !== 0) 
        {
          arr[slow][i] = arr[fast][i];
          arr[fast][i] = 0;
          fast--;
        } else if (arr[slow][i] !== 0 && arr[fast][i] === 0)
         {
          fast--;
        } else if (arr[slow][i] !== 0 && arr[fast][i] !== 0)
         {
          if (arr[slow][i] === arr[fast][i]) {
            arr[slow][i] = arr[slow][i] + arr[fast][i];
            arr[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else
           {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(arr) !== JSON.stringify(oldData))
     {
      addNum(arr);
    }
    if (dummy) {
      return arr;
    } else {
      setData(arr);
    }
  };

  const swipeUp = (dummy) => {
    console.log("swipe up");
    let arr = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++)
     {
      let slow = 0;
      let fast = 1;
      while (slow < 4)
       {
        if (fast === 4) 
        {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (arr[slow][i] === 0 && arr[fast][i] === 0) 
        {
          fast++;
        } else if (arr[slow][i] === 0 && arr[fast][i] !== 0) 
        {
          arr[slow][i] = arr[fast][i];
          arr[fast][i] = 0;
          fast++;
        } else if (arr[slow][i] !== 0 && arr[fast][i] === 0)
         {
          fast++;
        } else if (arr[slow][i] !== 0 && arr[fast][i] !== 0) 
        {
          if (arr[slow][i] === arr[fast][i])
           {
            arr[slow][i] = arr[slow][i] + arr[fast][i];
            arr[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(arr))
     {
      addNum(arr);
    }
    if (dummy) 
    {
      return arr;
    } else {
      setData(arr);
    }
  };

  // Check Gameover
  const checkIfGameOver = () => {
    console.log("CHECKING GAME OVER");
 
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    console.log("CHECKER DOWN");
    console.table(data);
    console.table(checker2);
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }

    return true;
  };
  // Reset
  const resetGame = () => {
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNum(emptyGrid);
    addNum(emptyGrid);
    setData(emptyGrid);
  };

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
      
        swipeUp();
      
        break;
      case DOWN_ARROW:
       
        swipeDown();
      
        break;
      case LEFT_ARROW:
       
        swipeLeft();
      
        break;
      case RIGHT_ARROW:
      
        swipeRight();
      
        break;
      default:
        break;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This is a custom function
  useEvent("keydown", handleKeyDown);

  return (
    <div className="App">
      <div
        style={{
          width: 345,
          margin: "auto",
          marginTop: 30,
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontFamily: "sans-serif",
              flex: 1,
              fontWeight: "700",
              fontSize: 60,
              color: "#776e65",
            }}
          >
            2048
          </div>
          <div
            style={{
              flex: 1,
              marginTop: "auto",
            }}
          >
            <div onClick={resetGame} style={style.newGameButton}>
              NEW GAME
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#AD9D8F",
            width: "max-content",
            height: "max-content",
            margin: "auto",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,
            position: "relative",
          }}
        >
          {gameOver && (
            <div style={style.gameOverOverlay}>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                    color: "#776E65",
                  }}
                >
                  Game Over
                </div>
                <div>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "auto",
                    }}
                  >
                    <div onClick={resetGame} style={style.tryAgainButton}>
                      Try Again
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onSwipeDown={() => {
              swipeDown();
            }}
            onSwipeLeft={() => swipeLeft()}
            onSwipeRight={() => swipeRight()}
            onSwipeUp={() => swipeUp()}
            style={{ overflowY: "hidden" }}
          >
            {data.map((row, oneIndex) => {
              return (
                <div style={{ display: "flex" }} key={oneIndex}>
                  {row.map((digit, index) => (
                    <Block num={digit} key={index} />
                  ))}
                </div>
              );
            })}
          </Swipe>
        </div>

        <div style={{ width: "inherit" }}>
          <p class="game-explanation">
            <strong class="important">How to play:</strong> Use your{" "}
            <strong>arrow keys</strong> to move the tiles. When two tiles with
            the same number touch, they <strong>merge into one!</strong>
          </p>
          
          <h4>Game Rule</h4>
          <p>
          2048 is an easy and fun puzzle game. Even if you don't love numbers you will love this game.

          This game is mobile compatible and you can play it on any device - iPhone, iPad or any other smartphone.
          </p>




        </div>
      </div>
    </div>
  );
}

const Block = ({ num }) => {
  const { blockStyle } = style;

  return (
    <div
      style={{
        ...blockStyle,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#fff" : "#373737",
      }}
    >
      {num !== 0 ? num : ""}
    </div>
  );
};

const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "#fff",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 45,
    fontWeight: "800",
    color: "white",
  },
  newGameButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    marginLeft: "auto",
    marginBottom: "auto",
    cursor: "pointer",
  },
  tryAgainButton: {
    padding: 10,
    background: "#846F5B",
    color: "#F8F5F0",
    width: 80,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
    margin: "auto",
    marginTop: 20,
  },
  gameOverOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    borderRadius: 5,
    background: "rgba(238,228,218,.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  h4:{
    font:"background-color:white",
  }
};

export default App;