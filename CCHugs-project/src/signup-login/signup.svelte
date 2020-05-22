<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";

    let un = false;
    let pass = false;
    let repass = false;
    let em = false;
    let message ="";
    //Check all the inputs then submit it to the signup.
    function handleSubmit(event) {
        let textbox = event.target;
        let password = textbox.password;
        let repassword = textbox.repassword;
        let email = textbox.email;
        let username = textbox.username;

        //Check if the passwords match.
        if(password.value != repassword.value){
            message ="The passwords don't match";
            return;
        }

        //Check that the username isnt already taken.
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



        //Create the user and if the email is already taken ask for another input
        check.then((x)=>{
            auth.createUserWithEmailAndPassword(email.value,password.value).catch(function(error) {
                message= "The email is invalid";
                var errorCode = error.code;
                var errorMessage = error.message;
            });

        }).catch((err) =>{
            console.log('Error Getting Usernames', err);
        });
        //insert the values of the new user into the database to keep track of info.
        auth.onAuthStateChanged((user) => {
            if (user) {
                if(user.email == email.value){
                    firestore.collection("Users").doc(user.uid).set({
                    username: username.value,
                    displayName: username.value,
                    quote: "Just A Hugger.",
                    displayPicture: "https://firebasestorage.googleapis.com/v0/b/cchugs-bd4ee.appspot.com/o/Default.png?alt=media&token=ec4de52d-a08d-43d5-9b3f-a582242eaf95",
                    email: email.value}).then((x) =>{
                        textbox.reset();
                        message ="";
                        window.location = "./MainPage";
                    });
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
                <span style="font-size: 11pt;">All fields are required</span>
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
    input, button {
	font-family: inherit;
	font-size: inherit;
	padding: 0.4em;
	margin: 0 0 0.5em 0;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 2px;
    }
    
</style>
