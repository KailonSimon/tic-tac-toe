import { useSelector, useDispatch } from 'react-redux';
import { assignSquare } from "../features/redux/gameboardSlice";
import { createStyles } from "@mantine/core";
import { shake } from "./Gameboard";
import { useSpring, a } from "@react-spring/web";
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = createStyles(theme => ({
    gameboardSquare: {
        backgroundColor: theme.colors[theme.primaryColor][6],
        aspectRatio: '1 / 1',
        borderRadius: '16px',

        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 0 8px 1px #f77f00'
        }
    },

    x: {
        backgroundImage: "url('/x.png')",
        backgroundColor: theme.colors[theme.primaryColor][6],
        backgroundSize: '95% 95%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: '1px solid green',

        '&:hover': {
            cursor: 'not-allowed',
            boxShadow: 'none'
        },

        '&:active': {
            animation: `${shake} 0.6s cubic-bezier(.36,.07,.19,.97) both`,
            perspective: '1000px'
        }
    },

    o: {
        backgroundImage: "url('/o.png')",
        backgroundColor: theme.colors[theme.primaryColor][6],
        backgroundSize: '95% 95%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        '&:hover': {
            cursor: 'not-allowed',
            boxShadow: 'none'
        },

        '&:active': {
            animation: `${shake} 0.6s cubic-bezier(.36,.07,.19,.97) both`,
            perspective: '1000px'
        }
    },

}))

export default function GameboardSquare({ position }) {
    const { classes, cx } = useStyles();
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
    const status = useSelector((state) => state.gameboard.squares[position]);
    const winner = useSelector((state) => state.gameboard.winner);
    const dispatch = useDispatch();

    useEffect(() => {
        if (winner) {
            setFlipped(false)
        }
    }, [winner])

    return (
        <div
            className={classes.gameboardSquare}
            onClick={() => { dispatch(assignSquare(position)) ; setFlipped(true) }}
        >
            <a.div
                style={{ opacity: opacity.to(o => 1 - o), transform, }}
            />
            <a.div
                className={cx({ [classes.x]: status === 'X' }, { [classes.o]: status === 'O' })}
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                    borderRadius: '16px',
                    height: '100%'
                }}
                />
        </div>
    )
}