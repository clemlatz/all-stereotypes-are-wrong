import React, { useState, useEffect } from 'react';

import Line from './Line';

import './Question.css';

async function sendAnswer(
  round,
  couples,
  association1,
  association2,
  choice,
  token,
  setIsLoading,
  setStereotypesCount,
  setAnswers
) {
  try {
    const [couple1, couple2] = couples;
    setIsLoading(true);
    const response = await fetch('/answer', {
      method: 'POST',
      body: JSON.stringify({
        association1,
        association2,
        couple1: couple1.id,
        couple2: couple2.id,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    const json = await response.json();
    if (json.error) {
      throw json.error;
    } else {
      setStereotypesCount(json.stats.stereotypes);
      setAnswers(answers => {
        return [
          ...answers,
          {
            round,
            couples,
            choice,
          },
        ];
      });
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

export default function Question({ round, setStereotypesCount, setAnswers }) {
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
  }, []);

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
          setAnswers
        )
      }
    />
  );
}
