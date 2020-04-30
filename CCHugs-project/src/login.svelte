<script>
    
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

</script>

<main>
        <img src="../../DifferentLogo.svg" alt="logo" style="height: 100px; ">
        <div>
            <p>Login</p>
            <input class ="textInput" type="text" placeholder="Username/Email" id="username">
            <input class ="textInput" type="password" placeholder="Password" id="password">
            <label style="word-wrap:brak-word"><input id="checkBox" type="checkbox" on:click={showPass}>Show Password</label>
            <button id="login" type="submit">Login</button>
            <a id="signup" href="./signup.svelte">Dont have an account? Sign-up</a>
       
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
</style>