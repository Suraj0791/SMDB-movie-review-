function Star({onRate,full,onTempIn,onTempout}) {
    return <span onClick={onRate} onMouseEnter={onTempIn} onMouseLeave={onTempout} >
   {full? "⭐" : "*" }   
    </span>;
  }

  function StarRating() {
       
    const[rating,setRating]=useState("")
    const[tempRate,setTempRate]=useState("")

    function handleRating(rating){
      setRating(rating)
    }
    const stars = Array.from({ length: 10 }, (_, index) => 
    <Star key={index} onRate={()=>handleRating(index+1)}
    full={tempRate? tempRate>=i+1 : rating>= index+1}  onTempIn={()=>setTempRate(index+1)} onTempout={()=>setTempRate(0)} />
  );

    return (
    <div style={{ display: "flex" }}>
     <p>  {stars}</p>
      <span>{tempRate|| rating|| ""}</span>
    </div>
    )
  }

export default StarRating;