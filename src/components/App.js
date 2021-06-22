import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Board from './Board/Board';
import Header from "./Header/Header";

function App() {
  const [activeBoard, setActiveBoard] = useState(() => {
      return localStorage.getItem('expanded-board') || 'ALL';
  });
  const [refresh, setRefresh] = useState('ALL');
  useEffect(() => {
    const socket = io("/");
    socket.on("REFRESH_DATA", (message) => {
        setRefresh(message.FLAG);
    });
  }, []);
  useEffect(() => {
      console.log("REFRESH_DATA: ", refresh);
      // todo: 6. listen and entertain socket events
      const socket = io("/");
      socket.on("REFRESH_DATA", (message) => {
        setRefresh(message.FLAG);
    });
  }, [refresh])
  const setExpandedBoard = (board) => {
    setActiveBoard(board);
    localStorage.setItem('expanded-board', board);
  }
  return (
    <div className="App">
        <header className="page-header">
            <Header />
        </header>
        <main className={`${activeBoard !== 'ALL' ? 'expanded' : '' }`}>
                {(activeBoard === 'ALL' || activeBoard === 'Highlights') && <Board boardName="Highlights" url="get_highlight" setExpandedBoard={setExpandedBoard} />}
            {(activeBoard === 'ALL' || activeBoard === 'Buyers') && <Board boardName="Buyers" url="get_buyer" setExpandedBoard={setExpandedBoard}/>}
            {(activeBoard === 'ALL' || activeBoard === 'Countries') && <Board boardName="Countries" url="get_country" setExpandedBoard={setExpandedBoard}/>}
            {(activeBoard === 'ALL' || activeBoard === 'Income') && <Board boardName="Income" url="get_income" setExpandedBoard={setExpandedBoard}/>}
        </main>
    </div>
  );
}
// todo: 7. fix all css, js, react issue, and improve folder structure
// todo: 8. increase code quality
export default App;
