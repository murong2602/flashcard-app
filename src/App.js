import React, {useState, useEffect, useRef} from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";


function App() {
  //default state for flashcards is the sample falshcards 
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl= useRef()
  const amountEl = useRef()

  //occurs on the first load of our app to generate all the diff categories 
  useEffect(()=>{
    axios 
      .get('https://opentdb.com/api_category.php')
      .then(res=>{
        setCategories(res.data.trivia_categories)
      })
  })

  //useEffect with empty array so that this runs only once when the app is refreshed
  useEffect(()=>{
    
  }, [])

  //converting HTML code to normal string to remove weird characters
  function decodeString(str){
    const textArea=document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  //e is the event
  function handleSubmit(e){
    //prevents the form from submitting the normal way 
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params:{
          amount: amountEl.current.value, 
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index)=>{
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a=>decodeString(a)), 
            answer]
          return{
            //this is to give each question a unique ID with index of the array and time of code run (to ensure that it wont be the same with different iterations)
            //this is so that we dont have to worry about clashing identifiers that we are using as the key when generating future qns
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: decodeString(questionItem.correct_answer),
            //.sort sorts the array according to the number returned by the funtion -> we get a random order every time
            options: options.sort(()=> Math.random - .5)
          }
        }))
      })

  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>
                {category.name}
              </option>
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}/>
        </div>

        <div className="form-group">
          <button className="btn">Generate</button>
        </div>

      </form>

      {/* created a sample array of flashcards and passing it into FlashcardList component
      passing in each one of the flashcards into the FlashcardList component */}
      <div className="container">
        <FlashcardList flashcards = {flashcards}/>
      </div>
    </>
    
    
  );
}


export default App;
