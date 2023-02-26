import { useEffect, useState } from "react";
import Game from "./Game";
import axios from '../axios';
import EditGame from "./EditGame";
import AddGame from "./AddGame";
import Modal from 'react-modal';
import SearchGame from "./SearchGame";


function Games() {
    const [showScores, setShowScores] = useState(false);
    const [games, setGames] = useState([]);
    const [fetchedGames, setFetchedGames] = useState([]);
    const [editedGame, setEditedGame] = useState({});
    const [showAddGame, setShowAddGame] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        const res = await axios.get('/games/');
        const fetchedGames = res.data;
        setFetchedGames(fetchedGames);
        console.log(fetchedGames)
    };

    const showAllGamesHandler = () => {
        if (fetchedGames) {
            setGames(fetchedGames)
            setShowScores(!showScores);
        }
    };

    const deleteGame = async (_id) => {
        await axios.delete(`/games/${_id}`);
        const newGames = fetchedGames.filter(game => game._id !== _id);
        setGames(newGames);
    }


    const startEditingGame = (game) => {
        setModalIsOpen(true);
        setEditedGame(game);
    };

    const updateGame = async (game) => {
        const res = await axios.put(`/games/${game._id}`, game);
        const updatedGame = res.data;
        const newGames = [...fetchedGames];
        const index = newGames.findIndex(x => x._id === game._id);
        newGames.splice(index, 1, updatedGame);
        setGames(newGames);
        setEditedGame({});
        setModalIsOpen(false);
    }

    const addGame = async (game) => {
        const res = await axios.post(`/games/`, game);
        const newGames = [...fetchedGames, res.data];
        setGames(newGames);
        setShowAddGame(false);
    };


    const searchGame = () => {
        const newGames = [...fetchedGames];
        const filteredGames = newGames.filter(game => ((game.game.toLowerCase()).includes(searchTerm.toLowerCase())));
        setGames(filteredGames);
        if (!showScores) { setShowScores(true) };
        setSearchTerm('');
    }


    return (
        <div className="games">
            <button className='btn btn-edit' onClick={showAllGamesHandler}>Pokaż wszystkie mecze</button>
            <button className='btn btn-edit' onClick={() => setShowAddGame(!showAddGame)}>Dodaj nowy mecz</button>
            <SearchGame
                handleInputChange={setSearchTerm}
                searchTerm={searchTerm}
                searchGame={searchGame}
            />
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