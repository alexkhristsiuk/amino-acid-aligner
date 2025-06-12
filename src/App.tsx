import React, { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { AlignmentViewer } from './components/AlignmentViewer';

type FormValues = {
  seq1: string;
  seq2: string;
};

const AA_REGEX = /^[ARNDCEQGHILKMFPSTWYV\\-]+$/i;

const App: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger
  } = useForm<FormValues>({
    mode: 'onChange'
  });

  const [result, setResult] = useState<FormValues | null>(null);
  const seq1 = useWatch({ control, name: 'seq1' });

  const onSubmit = (data: FormValues) => {
    setResult({
      seq1: data.seq1.toUpperCase(),
      seq2: data.seq2.toUpperCase()
    });
  };

  return (
    <Container 
      maxWidth='sm' 
      sx={{ py: 4, marginTop: '70px'}} 
    >
      <Typography variant="h4" component={'h1'} gutterBottom>
        Аминокислотное выравнивание
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '20px' }}
      >
        <Controller
          name="seq1"
          control={control}
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: AA_REGEX,
              message: 'Только буквы VLSPADKTNIKASWEKIGSHG и дефис'
            },
            validate: (value) =>
              value === value.toUpperCase() || 'Допускаются только ЗАГЛАВНЫЕ буквы'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={(e) => {
                field.onChange(e);
                trigger('seq2');
              }}
              label="Последовательность 1"
              error={!!errors.seq1}
              helperText={errors.seq1?.message}
              fullWidth
              inputProps={{ style: { fontFamily: 'monospace' } }}
            />
          )}
        />

        <Controller
          name="seq2"
          control={control}
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: AA_REGEX,
              message: 'Только латинские буквы A–Z и дефис'
            },
            validate: (value) =>
              !seq1 || value.length === seq1.length
                ? true
                : 'Последовательности должны быть одной длины'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Последовательность 2"
              error={!!errors.seq2}
              helperText={errors.seq2?.message}
              fullWidth
              inputProps={{ style: { fontFamily: 'monospace' } }}
            />
          )}
        />
        <Button type="submit" variant="contained" disabled={!isValid} sx={{marginTop: '20px'}}>
          Выровнять
        </Button>
      </Box>

      {result && (
        <AlignmentViewer seq1={result.seq1} seq2={result.seq2} />
      )}
    </Container>
  );
};

export default App;