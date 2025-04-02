const weatherform = document.querySelector('form');
const search=document.querySelector('input')
const p11=document.querySelector("#p1")
const p22=document.querySelector("#p2")


weatherform.addEventListener('submit', (e) => {  // Correct event name
    e.preventDefault();
    const location=search.value
    p11.textContent="Loading...."
    p22.textContent=" "
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                p11.textContent=data.error
            }
            else
            {
                p11.textContent=data.location;
                p22.textContent=data.forecast
            }
        })
    })
});
