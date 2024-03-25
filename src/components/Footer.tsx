import { useQuestionsStore } from '../store/questions';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { Button } from '@mui/material';

export function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: '1rem' }}>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswered} sin responder`}</strong>
      <div>
        <Button onClick={reset}>Resetear juego</Button>
      </div>
    </footer>
  );
}
