<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";
    import {onMount} from 'svelte';

    export let profile = null;
    export let uid;
    let profileId;
    let friends;
    let added = false;
    let d = new Date();
    let overText ="";

    //Promise that gets the uid of the profile page to be used later.
    let c = new Promise((resolve,reject) =>{
            firestore.collection("Users").where("username",'==',profile).get().then((snapshot) => {
                console.log(snapshot);
                console.log(uid);
            if(!snapshot.empty){
               snapshot.forEach((doc)=>{
                   profileId = doc.id;
               });
               resolve(1);
            }
            reject("display name doesnt have a account");
            }).catch((err)=>{
                console.log('Error Getting profile', err);

                reject();
            });

        
        });


    onMount(()=> {
             //find if this profile is a friend
            c.then(()=>{
                console.log(profileId);
                firestore.collection("Users").doc(uid).collection("Friends").doc(profileId).get().then((snapshot) => {
                    console.log(snapshot);
                    if(snapshot.data() !== undefined){
                        added = true;
                        console.log("CHANGED");
                    }
                    console.log(added);
                });
                }).catch((err) =>{
                    console.log('Error checking friend status', err);
                    // message ="That username is already taken";
                });;
    });
    
    //Adds the profile to the requests collection with a message a time and a sender.
    function addFriend(){
        togglePU();
        var message = document.getElementById("msg").value;
        //updates clients collections
        firestore.collection("Users").doc(uid).collection("Requested").doc(profileId).set({
            dateRequested: d.toUTCString(),
            to: profileId,
            message: message
        });

        //updates profiles collection
        firestore.collection("Users").doc(profileId).collection("Requests").doc(uid).set({
            dateRequested: d.toUTCString(),
            from: uid,
            message: message
        });
        
    }
    //removes the profile from each users collections.
    function removeFriend(){
        togglePU();
        firestore.collection("Users").doc(uid).collection("Friends").doc(profileId).delete().then(function() {
            console.log("Document successfully deleted! from user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        firestore.collection("Users").doc(profileId).collection("Friends").doc(uid).delete().then(function() {
            console.log("Document successfully deleted! from other user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
    }
    //puts the profile into the users blocked collection.
    function block(){
        togglePU();
        firestore.collection("Users").doc(uid).collection("Blocked").doc(profileId).set({
            dateBlocked: d.toUTCString()
        });
    }
    //sends a report to the server where the account will be delt with.
    function report(){
        //Report the user.
        console.log("Not implemented yet");
    }

    //To toggle the overlay
    function togglePU(){
        var popup = document.getElementById("popup");
        if(popup.style.display == 'none')
          popup.style.display = 'block';
        else
          popup.style.display = 'none';
    }

    function removeClick(){
        //Are you sure button
        overText = "<h2>Are you sure you want to remove " +{profile}+"</..h2><button id='modBtn' on:click='{removeFriend}'>REMOVE</button>";
        var div = document.getElementById("inside");
        div.innerHTML = "";
        var h2 = document.createElement("h3");
        h2.textContent = "Are your sure you want to remove " + profile;
        var button = document.createElement("button");
        button.style.cssText= "background-color: #ff9e6d; border-radius: 25px;padding: 0.4em; margin: 0 0 0.5em 0; box-sizing: border-box; border: 2px solid black;"
        button.textContent = "REMOVE";
        button.onclick = removeFriend;
        div.appendChild(h2);
        div.appendChild(button);
        togglePU();
    }
    function addClick(){
        //Send a message and send button
        var div = document.getElementById("inside");
        div.innerHTML = "";
        var h2 = document.createElement("h3");
        h2.textContent = "Send " + profile +" a message with your friend request!";
        var text = document.createElement("textarea");
        text.style.cssText ="border: 2px solid orange; height: 50px;";
        text.placeholder = "Your message";
        text.id = "msg";
        var button = document.createElement("button");
        button.style.cssText= "background-color: #ff9e6d; border-radius: 25px;padding: 0.4em; margin: 0 0 0.5em 0; box-sizing: border-box; border: 2px solid black;"
        button.textContent = "SEND REQUEST";
        button.onclick = addFriend;
        div.appendChild(h2);
        div.appendChild(text);
        div.appendChild(button);
        togglePU();
    }
    function blockClick(){
        //confirm button
        // overText = "<h2>Are you sure you want to block " + profile +"</h2><button id='btn'>BLOCK</button>";
        var div = document.getElementById("inside");
        div.innerHTML = "";
        var h2 = document.createElement("h3");
        h2.textContent = "Are your sure you want to block " + profile;
        var button = document.createElement("button");
        button.style.cssText= "background-color: #ff9e6d; border-radius: 25px;padding: 0.4em; margin: 0 0 0.5em 0; box-sizing: border-box; border: 2px solid black;"
        button.textContent = "BLOCK";
        button.onclick = block;
        div.appendChild(h2);
        div.appendChild(button);
        togglePU();
    }
    function reportClick(){
        overText ="This is not implemented yet";
        var div = document.getElementById("inside");
        div.innerHTML = "";
        var h2 = document.createElement("h3");
        h2.textContent = "This is not implemented yet";
        div.appendChild(h2);
        togglePU();
    }
</script>
<style>
    .flex{
        display:flex;
    }
    .dropbtn {
        background-color:  #FFA85A;
        border: none;
        cursor: pointer;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        padding: 0;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        margin-top: 0;
    }
    .dropdown-content div {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content div:hover {background-color: #f1f1f1}

    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown:hover .dropbtn {
        background-color: #FFA85A;
    }
    .status{
        width: 95%;
        background-color: #FFE66D;
        font-family: sans-serif;
        font-size: 2rem;
        height: 60px
    } 
    button {
        background-color: #ff9e6d;
        border-radius: 25px;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 2px solid black;
    }
    img{
        width: 60px;
        height: 60px;
    }
    .dropbtn{
        height: 60px;
        padding-top: 0;
        margin-bottom: 0;
    }
    #popup{
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        /* height: 200px; */
        padding: 10px;
        margin: 0 auto;
        margin-left: -150px;
        margin-top: -100px;
        background-color: #FFE66D;
        border-radius: 5px;
        /* needed styles for the overlay */
        z-index: 10; /* keep on top of other elements on the page */
        box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
    }
    #close{
        z-index: 11;
        float: right;
        background-color: unset;
        border: none;
    }
    #close:hover{
        color: darkgoldenrod;
    }
    #inside{
        display: grid;
        gap: 5px;
        grid-template-columns: 1fr; 
    }
    #inside textarea{
        border: orange;
        height: 25px;
    }
</style>
<main>
    <div id="popup" style="display: none;">
        <button id="close" on:click="{togglePU}">close <b>X</b></button>
        <div id="inside"></div>
    </div>
    <div class="flex">
        {#if added}
            <button class ="status" id="remove" on:click="{removeClick}">Remove as a friend</button>
        {:else}
            <button class="status" id="add" on:click="{addClick}">Add as a friend</button>
        {/if}
        <div class="dropdown">
            <button class="dropbtn">
                <img src="dotIcon.png" alt="dropdown">
            </button>
            <div class="dropdown-content" >
                <div class="dropdown-item" on:click="{blockClick}" >Block</div>
                <div class="dropdown-item" on:click="{reportClick}">Report</div>
            </div>
        </div>
    </div>
</main>