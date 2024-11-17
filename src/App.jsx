import { useState } from "react";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


const App = () => {
  const[movies,setMovies]=useState(tempMovieData)

  // /see due to show movies in numresults we experienced  a prop drilling . 
  // to solver prop drilling we will use compknent coposition method . instead of accepin the movies prop in navbar we will accept {chidlren } for cmponent composition .   
// prop drilling do compknent m hora h navbar nd main mai , so instead of accepting props they will now accept children nd all componets will be insidde app nd wil be accepted as children nd ab sabke liye state hai without proper dirlling as state is inside app only and we bring all other components also inside 

// prop drilling is isseu again fo listbox component as there are lots of children nd passing props , so we can do same again for listbox also .
  return (
    <>
     <Navbar >
      //this is composition
      <Logo/>
      <Search/>
      <NumResults movies={movies} />
      </Navbar>
     <Main >
     <ListBox >
     <MovieList movies={movies} />
     </ListBox>
     <WatchedBox  />
     </Main>
    </>
  );
}

function Navbar({children}){
  //navbar is structural componet only responsible for layout nd ui
  return (
    <nav className="nav-bar">
      
    </nav>

  )
}

function Logo(){
  //stateless comp
  return (
    <div className="logo">
      <span role="img">popcorn logo</span>
      <h1>usePopcorn</h1> 
      </div>
       )
}

function Search(){
  //statwfull comp
  const[query,setQuery]=useState("");
  return (
    <input className="search"
    type="text" placeholder="search movies..." value={query} onChange={(e)=>setQuery(e.target.value)}
    />
  )
}

function NumResults({movies}){
  return (
    <p className="num-results">Found <strong>{movies.length}</strong> results</p>
  )
}

function Main({children}){
  return (
    <main className="main">
      {children}
    </main>
  )
}

function ListBox({children}){
  const[isOpen1,setIsopen1]=useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={()=>setIsopen1((open)=>!open)}>
        {isOpen1 ? "-": "+"}
      </button>
      {isOpen1 && children} 
      {/* // dont do {chidlren} as it will give error */}
    </div>
  )
}

function MovieList({movies}){
 

  return (
    <ul className="list">
      {movies?.map((movie)=>
           (
            <Movie movie={movie} key={movie.imdbID}/>
           )
           )}
    </ul>
  )
}

function Movie({movie}){
  return (
    <li>
      <img src={movie.Poster} alt={`&{movie.Title}poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedBox(){
     const[watched,setWatched]=useState(tempWatchedData)
     const[isOpen2,setIsopen2]=useState(true);

     return (
      <div className="box">
        <button className="btn-toggle" onClick={()=>setIsopen2(!open)}>
          {isOpen2 ? "_": "+"}
        </button>
        {isOpen2 && (
          <>
          <WatchedSummary watched={watched}/>
          <WatchedMoviesList watched={watched}/> 
          </>
        )}
      </div>
     )
}

function WatchedSummary({watched}){
  const avgImdbRating=average(watched.map((movie)=>movie.imdbRating));
    const avguserRating=average(watched.map((movie)=>movie.userRating));
    const avgRuntime=average(watched.map((movie)=>movie.runtime));

    
    return (
      <div className="summary">
        <h2>Movies u Watched </h2>
        <div>
          <p>
            <span>#</span>
            <span>{watched.length}</span>

          </p>
          <p>
            <span>*</span>
            <span>{avgImdbRating}</span>
          </p>
        </div>
       
      </div>
    )

  
}

function WatchedMoviesList({watched}){
  return (
    <ul className="list">
      {watched.map((movie) => (
          <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
    )
  };
 
  function WatchedMovie({movie}){
    return(
      <li>
        <img src={movie.Poster} alt={`${movie.Title}poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>*</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>$</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>!</span>
            <span>{movie.runtime}</span>
          </p>
        </div>
      </li>
    )
  }

  export default App;