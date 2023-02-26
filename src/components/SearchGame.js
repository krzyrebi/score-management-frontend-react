import { useState } from "react";

function SearchGame(props) {

    return (
        <div className="game">
            <div className='game-main'>
                <div className='form'>
                    <label>Wyszukaj</label>
                    <input type='text' value={props.searchTerm} onChange={(e) => props.handleInputChange(e.target.value)}></input>
                    <button className='btn btn-edit' onClick={props.searchGame}>Szukaj</button>
                </div>
            </div>
        </div>
    );
}

export default SearchGame;