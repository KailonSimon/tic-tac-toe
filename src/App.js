import Gameboard from './components/Gameboard';
import { createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
  app: {  
    padding: 16,
    height: '100vh',
    backgroundColor: theme.colors[theme.primaryColor][2],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

function App() {
  const { classes } = useStyles();
  return (
    <div className={classes.app}>
      <Gameboard />
    </div>
  );
}

export default App;
