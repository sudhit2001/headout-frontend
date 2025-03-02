import React, { useState, useEffect } from "react";

const TravelQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");
  const [funFact, setFunFact] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Fetch the next question
  const fetchNextQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/next_question");
      const data = await response.json();
      if (response.ok) {
        setCurrentQuestion(data);
        setSelectedAnswer("");
        setResult("");
        setFunFact("");
        setShowResult(false);
        setIsAnswerSubmitted(false); // Re-enable "Submit Answer" button
      } else {
        alert("Failed to fetch question: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Fetch question error:", error);
      alert("Failed to fetch question. Please try again.");
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/submit_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pointer: currentQuestion.pointer,
          answer: selectedAnswer,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
        setFunFact(data.fun_fact);
        setShowResult(true);
        setIsAnswerSubmitted(true); // Disable "Submit Answer" button

        // Update scores
        if (data.result === "Correct ✅") {
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setIncorrectAnswers((prev) => prev + 1);
        }
      } else {
        alert("Failed to submit answer: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Submit answer error:", error);
      alert("Failed to submit answer. Please try again.");
    }
  };

  // Handle sharing scores
  const handleShareScore = async (username) => {
    if (!username) {
      alert("Username is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          correct_answers: correctAnswers,
          incorrect_answers: incorrectAnswers,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Score shared successfully!");
        // Open WhatsApp link
        window.open(data.whatsapp_link, "_blank");
      } else {
        alert("Failed to share score: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Share score error:", error);
      alert("Failed to share score. Please try again.");
    }
  };

  // Fetch the first question on component mount
  useEffect(() => {
    fetchNextQuestion();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#4CAF50" }}>Travel Quiz</h1>

      {/* Score Display */}
      <div>
        <p>
          Correct Answers: <strong>{correctAnswers}</strong>
        </p>
        <p>
          Incorrect Answers: <strong>{incorrectAnswers}</strong>
        </p>
      </div>

      {/* Question and Clues */}
      {currentQuestion && (
        <div>
          <h2>Clues</h2>
          <div>
            {currentQuestion.clues.map((clue, index) => (
              <h3 key={index}>{`${index + 1}. ${clue.trim()}`}</h3>
            ))}
          </div>

          {/* Options */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {/* Submit Button */}
          <button
            onClick={handleSubmitAnswer}
            disabled={isAnswerSubmitted} // Disable button after submission
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Result Section */}
      {showResult && (
        <div>
          <h3>{result}</h3>
          <p style={{ fontStyle: "italic", color: "#555" }}>{funFact}</p>
          <button
            onClick={fetchNextQuestion}
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Next Question
          </button>
        </div>
      )}

      {/* Share Score Section */}
      <div>
        <h2>Share Your Score</h2>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          style={{ margin: "10px", padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={() => handleShareScore(document.getElementById("username").value)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Share Score
        </button>
      </div>
    </div>
  );
};

export default TravelQuiz;