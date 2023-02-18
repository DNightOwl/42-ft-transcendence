import React, { useEffect, useContext, useState } from 'react'
import GameSocketContext from '../contexts/gameSocket'
import Sketch from 'react-p5'

interface GameState {
  ballX: number;
  ballY: number;
  player1Height: number;
  player2Height: number;
  player1Y: number;
  player2Y: number;
  status: string;
}

function Board() {
  const RATIO_TO_TABLE = 2.4;
  const RATIO_FACTOR = 1.666;
  const PADLLE_WIDTH = 20;
  const PADLLE_HEIGHT = 100;
  var TABLE_W = window.innerWidth / RATIO_TO_TABLE;
  var TABLE_H = TABLE_W / RATIO_FACTOR;

  const [resized, setResized] = useState(false);
  const socket = useContext(GameSocketContext);

  useEffect(() => {
    socket.emit('game_data', {
      gameId: window.location.pathname.split('/')[2],
    })
  }, [])

  var GameState: GameState = {
    ballX: TABLE_W / 2,
    ballY: TABLE_H / 2,
    player1Y: TABLE_H / 2 - PADLLE_HEIGHT / 2,
    player2Y: TABLE_H / 2 - PADLLE_HEIGHT / 2,
    player1Height: PADLLE_HEIGHT,
    player2Height: PADLLE_HEIGHT,
    status: 'waiting',
  }

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(TABLE_W, TABLE_H).parent(canvasParentRef);
    p5.frameRate(60);
  };

  const drawPadlles = (p5: any) => {
    p5.fill(255);
    p5.rect(
      0,
      GameState.player1Y * TABLE_H,
      PADLLE_WIDTH * (TABLE_W / 1000),
      GameState.player1Height * TABLE_H
    );
    console.log(`padddle 2 x: ${TABLE_W - (PADLLE_WIDTH * (TABLE_W / 1000))}`)
    console.log(`padddle 2 w: ${PADLLE_WIDTH * (TABLE_W / 1000)}`)
    console.log(`table w: ${TABLE_W}`)
    p5.rect(
      TABLE_W - (PADLLE_WIDTH * (TABLE_W / 1000)),
      GameState.player2Y * TABLE_H,
      PADLLE_WIDTH * (TABLE_W / 1000),
      GameState.player2Height * TABLE_H
    );
  };

  const drawMidLine = (p5: any) => {
    p5.stroke(255);
    p5.strokeWeight(4);
    p5.line(p5.width / 2, 0, p5.width / 2, p5.height);
  }

  const drawBall = (p5: any) => {
    p5.ellipseMode(p5.CENTER);
    p5.fill(255);
    if (GameState.status === 'pause') {
      p5.ellipse(
        TABLE_W / 2,
        TABLE_H / 2,
        20 * (TABLE_W / 1000),
        20 * (TABLE_W / 1000)
      );
    }
    else {
      p5.ellipse(
        GameState.ballX * TABLE_W,
        GameState.ballY * TABLE_H,
        20 * (TABLE_W / 1000),
        20 * (TABLE_W / 1000)
      );
    }
  }

  const draw = (p5: any) => {
    p5.background(20, 12, 12);
    drawPadlles(p5);
    drawMidLine(p5);
    drawBall(p5);
    // console.log(GameState.player2Y, TABLE_W - PADLLE_WIDTH * (TABLE_W / 1000), TABLE_W);
    if (window.location.pathname.split('/')[1] === 'game') {
      socket.emit('move_player', {
        gameId: window.location.pathname.split('/')[2],
        y: p5.mouseY,
      });
    };

    socket.on('game_state', (data: GameState) => {
      GameState = data;
    });
  }

  const windowResized = (p5: any) => {
    setResized((prev) => !prev);
    TABLE_W = window.innerWidth / RATIO_TO_TABLE;
    TABLE_H = TABLE_W / RATIO_FACTOR;
    p5.resizeCanvas(TABLE_W, TABLE_H);
  };

  return (
    <>
      <div className="w-full h-full">
        <Sketch
          setup={setup}
          draw={draw}
          windowResized={windowResized}
        />
      </div>
    </>
  )
}

export default Board