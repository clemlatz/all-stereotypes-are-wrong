import React, { useState, useEffect } from 'react';

import Line from './Line';

import sendAnswer from './lib/send-answer';

import './Question.css';

export default function Question({
  round,
  setStereotypesCount,
  setAnswers,
  setRound,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentChoice, setCurrentChoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get question couples
  useEffect(() => {
    async function fetchCouples() {
      const response = await fetch('/couples');
      const { couples, token } = await response.json();
      setCurrentQuestion({ couples, token });
    }
    fetchCouples();
  }, [round]);

  if (currentQuestion === null) {
    return null;
  }

  const { couples, token } = currentQuestion;
  const [couple1, couple2] = couples;

  return (
    <Line
      round={round}
      type="question"
      couple1={couple1}
      couple2={couple2}
      currentChoice={currentChoice}
      isLoading={isLoading}
      onSideChoose={setCurrentChoice}
      onSendAnswer={(association1, association2) =>
        sendAnswer(
          round,
          couples,
          association1,
          association2,
          currentChoice,
          token,
          setIsLoading,
          setStereotypesCount,
          setAnswers,
          setRound
        )
      }
    />
  );
}
