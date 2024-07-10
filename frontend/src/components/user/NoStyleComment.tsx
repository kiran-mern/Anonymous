import React,{useEffect,useRef, useState} from 'react'

const NoStyleComment: React.FC = () => {
    const [comment,setComment]=useState('')
    const inputRef= useRef<HTMLTextAreaElement>(null)

    const adjustHeight=()=>{
        const inputArea= inputRef.current
        if(inputArea){
            inputArea.style.height= 'auto';
            inputArea.style.height=`${inputArea.scrollHeight}px`

        }

    }

    const handleChange=(e)=>{
        setComment(e.target.value)
    }

    useEffect(() => {
        adjustHeight();
      }, [comment]);
  return (
    <div>
        <textarea
        ref={inputRef} value={comment} onChange={handleChange} className="w-full border-none bg-transparent outline-none placeholder-gray-500 resize-none overflow-hidden "
        placeholder="Add a comment..." 
        rows={1}
        style={{
            maxHeight: '96px', // 4 lines * 24px line height
            overflowY: 'auto'
        }}
        />



    </div>
  )
}

export default NoStyleComment