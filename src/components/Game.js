
function Game(props) {
    return (
        <div className="game">
            <div className='game-main'>
                <div className='game-container'>
                    <h2>
                        {props.game}
                    </h2>
                    <h3>
                        {props.score}
                    </h3>
                </div>
                <div className='game-container'>
                    <p>{props.goalScorers}</p>
                </div>
                <div className='game-container'>
                    <button className='btn btn-edit' onClick={() => { props.onEdit(props) }}>Edytuj</button>
                    <button className='btn btn-remove' onClick={() => { props.onRemove(props._id) }}>Usuń</button>
                </div>
            </div>
        </div>
    );
}

export default Game;