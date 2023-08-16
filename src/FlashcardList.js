import React from 'react'
import Flashcard from './Flashcard'

//destructuring the flashcards array and passing it to FlashcardList as a prop
//can access flashcards prop from here 
export default function FlashcardList({flashcards}) {
  return (
    //loop through all flashcards and return the flashcard component for each one of our flashcards which we are importing on top 
    //need to pass in the flashcard to our flashcard component (flashcard = {flashcard})
    //set a key so that react only re-renders the flashcards that are changed 
    <div className='card-grid'>
        {flashcards.map(flashcard=>{
            return <Flashcard flashcard = {flashcard} key={flashcard.id}/> 
        })}

    </div>
  )
}
