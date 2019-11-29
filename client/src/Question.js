import React, { useState, useEffect } from 'react';

import Line from './Line';

import './Question.css';

async function sendAnswer(
  couple1,
  couple2,
  association1,
  association2,
  token,
  setIsLoading,
  setStereotypesCount
) {
  try {
    setIsLoading(true);
    const response = await fetch('/answer', {
      method: 'POST',
      body: JSON.stringify({
        association1,
        association2,
        couple1,
        couple2,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      setStereotypesCount(json.stats.stereotypes);
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

export default function Question({ round, setStereotypesCount }) {
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
          couple1.id,
          couple2.id,
          association1,
          association2,
          token,
          setIsLoading,
          setStereotypesCount
        )
      }
    />
  );
}
