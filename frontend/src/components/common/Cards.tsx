import React from 'react'

type Item={
    id:string,
    name:string,
    imageUrl:string
}

type ReusableProps={
    items: Item[],
    onAction:(id:string)=> void,
    renderButton:(id:string)=>JSX.Element
}

const Cards:React.FC<ReusableProps> = ({items,onAction,renderButton}) => {
  return (
<div className="bg-black min-h-screen p-6">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
            
          <div key={item.id} className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-2">
              <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
            </div>
            <h3 className="text-white text-lg mb-2">{item.name}</h3>
            {renderButton(item.id)}
          </div>
        ))}
      </div>
    </div>  )
}

export default Cards