import { Typography, Button } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { useQuestionsStore } from '../store/questions';

export function Results() {
  const { correct, incorrect } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <div>
      <Typography component={'h1'}>¡Tus resultados!</Typography>

      <strong>
        <Typography>{correct} correctas</Typography>
        <Typography>{incorrect} incorrectas</Typography>
      </strong>

      <div>
        <Button onClick={reset}>¡Empezar de nuevo!</Button>
      </div>
    </div>
  );
}
