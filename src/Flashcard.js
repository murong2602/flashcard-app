import React, {useState, useEffect, useRef} from 'react'

//flashcard was passed into the component in FlashcardList so we can use it as a prop here 
export default function Flashcard({flashcard}) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  //allows as to have a ref to any variable we want that persists through re-renders of the app
  //does not cause component to reupdate when it is changed unlike useState
  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  //call setMaxHeight everytime there is a change in qn, ans or options 
  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])

  //re calc max height when the page size changes 
  useEffect(()=>{
    window.addEventListener('resize', setMaxHeight)
    return ()=>window.removeEventListener('resize', setMaxHeight)
  },[])

  return (
    <div 
        //this sets each div to have a classname card but also a flip classname if flip is true so that we can ref easily for css
        className={`card ${flip? 'flip':''}`}
        style={{height:height}}
        onClick={()=>setFlip(!flip)}>

        <div className='front' ref={frontEl}>
            {flashcard.question}
            <div className='flashcard-options'>
                {/* printing out each option  */}
                {flashcard.options.map(option=>{
                    return <div className='flashcard-option' key={option}>{option}</div>})}
            </div>
        </div>
        <div className='back' ref={backEl}>{flashcard.answer}</div>
    </div>
  )
}
 