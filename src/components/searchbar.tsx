import { useState } from 'react'
import '../index.css'

interface Props {
  onSearch: (title: string) => void;
}

function SearchBar({ onSearch }: Props) {

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) 
  {
    if (e.key === 'Enter') 
    {
        onSearch(title);
    }
 }

  const [title, setTitle] = useState("")
  return (
        <section id ="SearchScreen" className="screen" aria-labelledby="search-title">
            <main>
                <input type="text" 
                placeholder='Enter the Movie Title...' 
                value= {title}
                onChange={(e)=> setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button onClick={()=> onSearch(title)}>
                    {"Search Movies"}
                </button>

                
            </main>
        </section>
    )
}


export default SearchBar