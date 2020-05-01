<script>
    import {auth} from "./Firebase.js";
    import {firestore} from "./Firebase.js";

    let un = false;
    let pass = false;
    let repass = false;
    let em = false;
    let message ="";

    function handleSubmit(event) {
        let textbox = event.target;
        let password = textbox.password;
        let repassword = textbox.repassword;
        let email = textbox.email;
        let username = textbox.username;


        if(password.value != repassword.value){
            message ="The passwords don't match";
            return;
        }


        let check = new Promise((resolve,reject) =>{
            firestore.collection("Users").where("username",'==',username.value).get().then(snapshot => {
                console.log(snapshot);
            if(!snapshot.empty){
              // username.setCustomValidity('Username already taken');
               //set as a reject
                message ="That username is already taken";
               reject(2);
            }
            else{
                resolve(1);
            }
            }).catch((err) =>{
                console.log('Error Getting Usernames', err);
                message ="That username is already taken";
                reject(err);
            });;
        });



        
        check.then((x)=>{
            auth.createUserWithEmailAndPassword(email.value,password.value).catch(function(error) {
                message= "The email is invalid";
                var errorCode = error.code;
                var errorMessage = error.message;
            });

        }).catch((err) =>{
            console.log('Error Getting Usernames', err);
        });


        auth.onAuthStateChanged((user) => {
            if (user) {
                if(user.email == email.value){
                    firestore.collection("Users").doc(user.uid).set({
                    username: username.value,
                    email: email.value})
                    textbox.reset();
                    message ="";
                    window.location = "./home";
                }
            }});
        }

</script>

<main>
        <img src="../../DifferentLogo.svg" alt="logo" style="height: 100px; ">
        <div>
            <p>Sign-up</p>
            <form on:submit|preventDefault="{handleSubmit}">
                <input required class ="textInput" type="text" placeholder="Username" id="username">

                <input required class ="textInput" type="email" placeholder="Email" id="email">

                <input id="password"  required class ="textInput password" type="password" placeholder="Password" min = '6' max ='25'>

                <input id="repassword"  required class ="textInput password" type="password" placeholder="Re-enter Password">

                <button id="signup">Sign-up</button>
                <span class="err">{message}</span>
                
            
            </form>
       
</main>

<style>
    main{
        margin: 0 auto;
        width: 300px;
        text-align: center;
       
    }
    .textInput{
        display: block;
        background: #FFE66D;
        border: 2px solid #FFA85A;
        box-sizing: border-box;
        border-radius: 14px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    #signup{
        display: block;
        background: #FFA85A;
        border-radius: 14px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 20px;
        margin-bottom: 3px;
    }
    p{
        font-family: sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 30px;
        line-height: 38px;
        text-align: center;
        margin:5px;
        margin-top: 20px;
    }
    .err{
        text-align: center;
        color: red;
        margin: 0 auto;
        padding: 0;
        font-size: 8pt;
        
    }
    
</style>
