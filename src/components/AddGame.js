import { useState } from "react";

function AddGame(props) {
    const [form, setForm] = useState('');

    const addGame = () => {
        const game = {
            game: form.game,
            score: form.score,
            goalScorers: form.goalScorers,
        };
        props.onAdd(game);
        setForm('');
    };

    return (
        <div className="game">
            <div className='game-main'>
                <div className='form'>
                    <label>Mecz</label>
                    <input type='text' value={form.game || ''} onChange={(e) => setForm({ ...form, game: e.target.value })}></input>
                    <label>Wynik</label>
                    <input type='text' value={form.score || ''} onChange={(e) => setForm({ ...form, score: e.target.value })}></input>
                    <label>Strzelcy</label>
                    <input type='text' value={form.goalScorers || ''} onChange={(e) => setForm({ ...form, goalScorers: e.target.value })}></input>
                    <button className='btn btn-edit' onClick={() => addGame()}>Wyślij</button>
                    <button className='btn btn-remove' onClick={props.onGoBack}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}

export default AddGame;