import React from "react";

function QuestionItem({ question, deleteQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDelete () {
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "DELETE",
      headers : { "Content-Type": "application/json" }
    })
    .then(r => r.json())
    .then(() => deleteQuestion(id))
  }

  function handleAnswerUpdate (event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "PATCH",
      headers : { "Content-Type": "application/json" },
      body : JSON.stringify({
        "correctIndex": event.target.value
      })
    })
    .then(r => r.json())
    .then((updatedQuestion) => updateQuestion(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
