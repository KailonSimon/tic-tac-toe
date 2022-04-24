import GameboardSquare from "./GameboardSquare";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { resetBoard } from "../features/redux/gameboardSlice";
import { Box, Button, createStyles, Group, Modal, Text, Title } from "@mantine/core";

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
    const { winner, score, currentTurn } = useSelector(state => state.gameboard)
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (winner) {
            setOpen(true);
        }
    }, [winner])

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