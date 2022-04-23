import GameboardSquare from "./GameboardSquare";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { resetBoard } from "../features/redux/gameboardSlice";
import { Box, Button, Group, Modal, Text, Title } from "@mantine/core";

export default function Gameboard() {
    const winner = useSelector((state => state.gameboard.winner));
    const score = useSelector((state) => state.gameboard.score);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log(score)
        if (winner) {
            setOpen(true);
        }
    }, [winner, score])
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' }}>
                <Text size='xl' underline weight={700}>Score</Text>
                <Group position='apart'>
                    <Text size='xl'  weight={700}>
                        X: {score.X}
                    </Text>
                    <Text size='xl' weight={700}>
                        O: {score.O}
                    </Text>
                </Group>
            </Box>
            <div className='gameboard-container'>
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
            >
                <Group direction='column' position='apart' sx={{ alignItems: 'center' }}>
                    {winner && <Text size='xl'>{winner === 'draw' ? "It's a draw!" : `${winner} wins!`}</Text>}
                    <Button onClick={() => { dispatch(resetBoard()); setOpen(false) }}>Play again</Button>
                </Group>
            </Modal>
        </>
    )
}