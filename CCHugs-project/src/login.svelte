<script>
    import {auth} from "./Firebase.js";
    import {firestore} from "./Firebase.js";
    

    let message ="";


    function showPass(){
        var show = document.getElementById("password");
        if(show.type === "password"){
            show.type = "text";
        }
        else{
            show.type = "password";
        }
        return;
    }

    function handleSubmit(event){

        let textbox = event.target;
        let password = textbox.password;
        let username = textbox.username;
        let email;

        //1.check if there is a username by that type
        // if so login with the email that is also in that store
        //if not check if it is a email that can be used to login

        let check = new Promise((resolve,reject) =>{
            firestore.collection("Users").where("username",'==',username.value).get().then((snapshot) => {
                console.log(snapshot);
            if(!snapshot.empty){
              // username.setCustomValidity('Username already taken');
               //set as a reject

               snapshot.forEach((doc)=>{
                   email = doc.data().email;
               });
               resolve(1);
            }
            else{
                resolve(2);
            }
            }).catch((err) =>{
                console.log('Error Getting Usernames', err);
                // message ="That username is already taken";
                reject(err);
            });;
        });



        
        check.then((x)=>{
            if(x==1){
                 auth.signInWithEmailAndPassword(email,password.value).then((y)=>{
                    window.location = "./home";
                }).catch(function(error) {
                    message= "Login is invalid";
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    });
            }
            else{
                
                auth.signInWithEmailAndPassword(username.value,password.value).then((y)=>{
                    window.location = "./home";
                }).catch(function(error) {
                message= "Login is invalid";
                var errorCode = error.code;
                var errorMessage = error.message;
            });
            }

        }).catch((err) =>{
            console.log('Error Getting Usernames', err);
        });


        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         if(user.email == username.value || user.email == email){
        //             console.log("success");
        //             message ="";
        //         }
        //     }});
        // }

    }
    

</script>

<main>
            <img src="../../DifferentLogo2.svg" alt="logo" style="height: 100px; ">
        <div>
            <p>Login</p>
            <form on:submit|preventDefault="{handleSubmit}">
                <input required class ="textInput" type="text" placeholder="Username" id="username">

                <input id="password"  required class ="textInput password" type="password" placeholder="Password" min = '6' max ='25'>

                <label style="word-wrap:brak-word"><input id="checkBox" type="checkbox" on:click={showPass}>Show Password</label>

                <button id="login">Sign-up</button>
                <span class="err">{message}</span>
                <a id="signup" href="./signup">Dont have an account? Sign-up</a>
            
            </form>
       
</main>

<style>
    main{
        margin: 0 auto;
        width: 300px;
       
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
    #login{
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
    #checkBox{
        margin-left: 8%;
        vertical-align: middle;  
    }
    #signup{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        color: #8B4201;
        margin-left: 18%;
        
    }
    .err{
        text-align: center;
        color: red;
        margin: 0 auto;
        padding: 0;
        font-size: 8pt;
        
    }
</style>