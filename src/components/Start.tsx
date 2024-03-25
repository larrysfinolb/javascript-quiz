import { Button } from '@mui/material';
import { useQuestionsStore } from '../store/questions';

const LIMIT_QUESTION = 10;

export function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <Button onClick={handleClick} variant={'contained'}>
        ¡Empezar el juego!
      </Button>
    </div>
  );
}
