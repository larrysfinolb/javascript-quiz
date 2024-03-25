import { useQuestionsStore } from '../store/questions';
import { Footer } from './Footer';
import { Stack, IconButton, Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import type { IQuestion } from '../types.d';
import SyntaxHighLighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Question({ info }: { info: IQuestion }) {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  const getBackgroundColor = (info: IQuestion, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;

    if (userSelectedAnswer == null) return 'transparent';
    else if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    else if (index === correctAnswer) return 'green';
    else if (index === userSelectedAnswer) return 'red';
    else return 'transparent';
  };

  return (
    <Card variant={'outlined'} sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>
      <Typography variant={'h5'}>{info.question}</Typography>

      <SyntaxHighLighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
}
