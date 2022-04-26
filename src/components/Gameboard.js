import GameboardSquare from "./GameboardSquare";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { resetBoard, setWinner } from "../features/redux/gameboardSlice";
import { Box, Button, createStyles, keyframes, Group, Modal, Text, } from "@mantine/core";
import { useInterval } from "../features/hooks/useInterval";

export const shake = keyframes({
    '10%, 90%': {
        transform: 'translate3d(-1px, 0, 0)'
    },

    '20%, 80%': {
        transform: 'translate3d(2px, 0, 0)'
    },

    '30%, 50%, 70%': {
        transform: 'translate3d(-4px, 0, 0)'
    },

    '40%, 60%': {
        transform: 'translate3d(4px, 0, 0)'
    }
})

const useStyles = createStyles(theme => ({
    gameboardContainer: {
        width: '40%',
        margin: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gridGap: '10px',

        [theme.fn.smallerThan('lg')]: {
            width: '45%'
        },
        [theme.fn.smallerThan('md')]: {
            width: '70%'
        },
        [theme.fn.smallerThan('sm')]: {
            width: '80%'
        },
    },

    timer: {
        animation: `${shake} 0.6s cubic-bezier(.36,.07,.19,.97) both`,
        perspective: '1000px'

    },

    modal: {
        backgroundColor: theme.white,
        filter: `drop-shadow(0 0 2px ${theme.colors[theme.primaryColor][6]})`,
        fontWeight: 700,
        color: theme.colors[theme.primaryColor][8]
    },

    modalHeader: {
        justifyContent: 'center',
    },

    modalTitle: {
        fontSize: 24
    },

    button: {
        backgroundColor: theme.colors[theme.primaryColor][9]
    },

}))



export default function Gameboard() {
    const { winner, score, currentTurn, numberOfRounds, currentRound } = useSelector(state => state.gameboard);
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const turnTime = 15
    const [timeRemaining, setTimeRemaining] = useState(turnTime);
    useInterval(() => {
        if (currentTurn.length - 1 && timeRemaining && !winner) {
            setTimeRemaining((timeRemaining - .1).toFixed(1))
        }
    }, 100);

    useEffect(() => {
        setTimeRemaining(turnTime);
        if (winner) {
            setOpen(true);
        }

    }, [winner, currentTurn]);

    useEffect(() => {
        if (timeRemaining === '0.0') {
            dispatch(setWinner())
        }
    }, [dispatch, timeRemaining]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' }}>
                <Text size='xl' underline weight={700}>Score</Text>
                <Group position='apart'>
                    <Text size='xl' weight={700}>
                        X: {score.X}
                    </Text>
                    <Text size='xl' weight={700}>
                        O: {score.O}
                    </Text>
                </Group>
                <Text size='lg' weight={700}>
                    Current Turn: {currentTurn[currentTurn.length - 1]}
                </Text>
                { !winner && <Text size='lg' weight={700} color={timeRemaining >= 10 ? 'black' : 'red'}>
                    Time Remaining: {timeRemaining}
                </Text> }
            </Box>
            <div className={classes.gameboardContainer}>
                <GameboardSquare position={0} />
                <GameboardSquare position={1} />
                <GameboardSquare position={2} />
                <GameboardSquare position={3} />
                <GameboardSquare position={4} />
                <GameboardSquare position={5} />
                <GameboardSquare position={6} />
                <GameboardSquare position={7} />
                <GameboardSquare position={8} />
            </div>
            <Modal
                opened={open}
                title='Game over!'
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                centered
                classNames={{ modal: classes.modal, header: classes.modalHeader, title: classes.modalTitle, body: classes.modalBody }}
            >
                <Group direction='column' position='apart' sx={{ alignItems: 'center' }}>
                    {winner && <Text size='xl'>{winner === 'draw' ? "It's a draw!" : `${winner} wins!`}</Text>}
                    <Button className={classes.button} onClick={() => { dispatch(resetBoard()); setOpen(false) }}>Play again</Button>
                </Group>
            </Modal>
        </>
    )
}