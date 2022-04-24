import clsx from "clsx";
import { useSelector, useDispatch } from 'react-redux';
import { assignSquare } from "../features/redux/gameboardSlice";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
    gameboardSquare: {
        backgroundColor: theme.colors[theme.primaryColor][8],
        aspectRatio: '1 / 1',
        borderRadius: '16px',

        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 0 8px 1px #f77f00'
        }
    },

    x: {
        backgroundImage: "url('/x.png')",
        backgroundSize: '95% 95%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        '&:hover': {
            cursor: 'not-allowed',
            boxShadow: 'none'
        },

        '&:active': {
            animation: 'shake 0.6s cubic-bezier(.36,.07,.19,.97) both',
            perspective: '1000px'
        }
    },

    o: {
        backgroundImage: "url('/o.png')",
        backgroundSize: '95% 95%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        '&:hover': {
            cursor: 'not-allowed',
            boxShadow: 'none'
        },
        
        '&:active': {
            animation: 'shake 0.6s cubic-bezier(.36,.07,.19,.97) both',
            perspective: '1000px'
        }
    },
    
}))

export default function GameboardSquare({ position }) {
    const { classes, cx } = useStyles();
    const status = useSelector((state) => state.gameboard.squares[position]);
    const dispatch = useDispatch();
    
    return (
        <div 
            className={cx(classes.gameboardSquare, { [classes.x]: status === 'X' }, { [classes.o]: status === 'O'})} 
            onClick={() => dispatch(assignSquare(position))} 
        />
    )
}