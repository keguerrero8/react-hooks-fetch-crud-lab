import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsList, setQuestionList] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(data => data.json())
    .then(json => setQuestionList(json))
  }, [])

  function addFormQuestion (newQuestion) {
    setQuestionList([...questionsList, newQuestion])
  }

  function deleteQuestion (id) {
    setQuestionList(questionsList.filter(question => question.id !== id))
  }

  function updateQuestion (updatedQuestion) {
    setQuestionList(questionsList.map(question => {
      if (question === updatedQuestion) {
        return updateQuestion
      }
      return question
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addFormQuestion={addFormQuestion}/> : <QuestionList deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} questions={questionsList}/>}
    </main>
  );
}

export default App;
