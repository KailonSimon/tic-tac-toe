import GameboardSquare from "./GameboardSquare";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { resetBoard } from "../features/redux/gameboardSlice";
import { Button, Group, Modal, Text } from "@mantine/core";

export default function Gameboard() {
    const winner = useSelector((state => state.gameboard.winner));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (winner) {
            setOpen(true);
        }
    }, [winner])
    return (
        <>
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
                <Group direction='column' position='apart' sx={{ alignItems: 'center'}}>
                    {winner && <Text size='xl'>{winner ===  'draw' ? "It's a draw!" : `${winner} wins!`}</Text>}
                    <Button onClick={() => { dispatch(resetBoard()); setOpen(false) }}>Play again</Button>
                </Group>
            </Modal>
        </>
    )
}