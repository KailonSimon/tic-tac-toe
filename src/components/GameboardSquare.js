import clsx from "clsx";
import { useSelector, useDispatch } from 'react-redux';
import { assignSquare } from "../features/redux/gameboardSlice";

function GameboardSquare({ position }) {
    const status = useSelector((state) => state.gameboard.squares[position]);
    const dispatch = useDispatch();
    const className = clsx({
        'gameboard-square': true,
        'x': status === 'X',
        'o': status === 'O',
    })
    
    return (
        <div className={className} onClick={() => dispatch(assignSquare(position))} />
    )
}

export default GameboardSquare