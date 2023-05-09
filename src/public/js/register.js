const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log(obj);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{

        if(result.status === 201){
        
        result.json()
        window.location.replace("/users/login")
        }else{
            alert ("user wasn't created")
            window.location.replace("/users/errorRegister")

        }}).then(json=>console.log(json));
    
     
});


