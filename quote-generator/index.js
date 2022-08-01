let apiquotes=[];
let quotetext=document.getElementById("quote");
let quoteauthor=document.getElementById("author");
let loader=document.getElementById('loader');

function loading(){
  loader.hidden=false;
  quotetext.hidden=true;
}
function complete(){
  loader.hidden=true;
  quotetext.hidden=false;
}

function newquote(){
  loading();
  const quote=apiquotes[Math.floor(Math.random()*apiquotes.length)];
  if(quote.author===null){
    quote.author='Unknown';
  }
  quotetext.innerHTML=quote.text;
  quoteauthor.innerHTML=quote.author;
  //if length of quote is too big
  if(quote.text.length>=100){
    quotetext.classList.add("long-quote");
  }
  else{
   quotetext.classList.remove("long-quote");
  }
  complete();
}

async function generatequote(){
  loading();
  const apiurl='https://type.fit/api/quotes';
  try{
    const response=await fetch(apiurl);//fetching data from url data is in string format
    apiquotes=await response.json();//converting string to json object
    newquote();
    
  }catch(error){
    console.log(error);
  }
}

// tweet quote
function tweetquote(){
  const tweeturl=`https://twitter.com/intent/tweet?text=${quotetext.textContent}-${quoteauthor.textContent}`;
  window.open(tweeturl,'_blank');
}

//event listeners
document.getElementById('new-quote').addEventListener('click',newquote);
document.getElementById('twitter').addEventListener('click',tweetquote);
//on load
generatequote();


