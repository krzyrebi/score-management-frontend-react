import { useState } from "react";
import Game from "./Game";
import axios from 'axios';
import EditGame from "./EditGame";
import AddGame from "./AddGame";
import Modal from 'react-modal';


function Games() {
    const [showScores, setShowScores] = useState(false);
    const [games, setGames] = useState([]);
    const [editedGame, setEditedGame] = useState({});
    const [showAddGame, setShowAddGame] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    Modal.setAppElement('#root');

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const fetchGames = async () => {
        const res = await axios.get('http://localhost:3001/api/games/');
        const fetchedGames = res.data;
        setGames(fetchedGames);
    };

    const showAllGamesHandler = () => {
        fetchGames();
        setShowScores(!showScores);
    };

    const deleteGame = async (_id) => {
        await axios.delete(`http://localhost:3001/api/games/${_id}`);
        const newGames = games.filter(game => game._id !== _id);
        setGames(newGames);
    }


    const startEditingGame = (game) => {
        setModalIsOpen(true);
        setEditedGame(game);
    };

    const updateGame = async (game) => {
        const res = await axios.put(`http://localhost:3001/api/games/${game._id}`, game);
        const updatedGame = res.data;
        const newGames = [...games];
        const index = newGames.findIndex(x => x._id === game._id);
        newGames.splice(index, 1, updatedGame);
        setGames(newGames);
        setEditedGame({});
        setModalIsOpen(false);
    }

    const addGame = async (game) => {
        const res = await axios.post(`http://localhost:3001/api/games/`, game);
        const newGames = [...games, res.data];
        setGames(newGames);
    };


    return (
        <div className="games">
            <button className='btn btn-edit' onClick={showAllGamesHandler}>Pokaż wszystkie mecze</button>
            <button className='btn btn-edit' onClick={() => setShowAddGame(!showAddGame)}>Dodaj nowy mecz</button>
            {
                showAddGame ?
                    <AddGame
                        onAdd={(game) => addGame(game)}
                        onGoBack={() => setShowAddGame(false)}
                    />
                    :
                    null
            }
            {showScores ?
                games.map((game) => {
                    return (<Game
                        key={game._id}
                        _id={game._id}
                        game={game.game}
                        score={game.score}
                        goalScorers={game.goalScorers}
                        onRemove={(_id) => deleteGame(_id)}
                        onEdit={(game) => startEditingGame(game)}
                    />)
                })
                :
                null
            }
            <Modal
                isOpen={modalIsOpen}
                className='modal'
            >
                <EditGame
                    onEdit={(game) => updateGame(game)}
                    game={editedGame.game}
                    score={editedGame.score}
                    goalScorers={editedGame.goalScorers}
                    _id={editedGame._id}
                    onGoBack={() => setModalIsOpen(false)}
                />
            </Modal>
            {/* {
                showEditGame ? (
                    <>
                        <EditGame
                            onEdit={(game) => updateGame(game)}
                            game={editedGame.game}
                            score={editedGame.score}
                            goalScorers={editedGame.goalScorers}
                            _id={editedGame._id}
                            hideForm={() => setShowEditGame(false)}
                        />
                    </>
                ) :
                    null
            } */}


        </div>
    );
}

export default Games;