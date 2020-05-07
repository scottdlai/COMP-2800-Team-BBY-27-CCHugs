<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";
    import {onMount} from 'svelte';

    export let profile = null;
    let profileId;
    let friends;
    let added = false;
    let d = new Date();

    let check = new Promise((resolve,reject) =>{
            firestore.collection("Users").where("username",'==',profile).get().then((snapshot) => {
                console.log(snapshot);
            if(!snapshot.empty){
               snapshot.forEach((doc)=>{
                   profileId = doc.id();
               });
               resolve(1);
            }
            reject();
            }).catch((err)=>{
                console.log('Error Getting profile', err);

                reject();
            });

        
        });
    onMount(()=> {
        //find if this profile is a friend
        check.then(()=>{
            friends = firestore.collection("Users").doc(auth.currentUser.uid).collection("Friends");
            friends.doc(profileId).get().then((snapshot) => {
                 if(!snapshot.empty){
                     added = true;
                 }
               });
            }).catch((err) =>{
                console.log('Error checking friend status', err);
                // message ="That username is already taken";
            });;
    });
    

    function addFriend(){
        firestore.collection("Users").doc(auth.currentUser.uid).collection("Requested").doc(profileId).set({
            dateRequested: d.toUTCString(),
            to: profileId
        });
        firestore.collection("Users").doc(profileId).collection("Requests").doc(auth.currentUser.uid).set({
            dateRequested: d.toUTCString(),
            from: auth.currentUser.uid
        });
    }
    function removeFriend(){
        friends.doc(profileId).delete().then(function() {
            console.log("Document successfully deleted! from user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        firestore.collection("Users").doc(profileId).collection("Friends").doc(auth.currentUser.uid).delete().then(function() {
            console.log("Document successfully deleted! from other user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
    function block(){
        firestore.collection("Users").doc(auth.currentUser.uid).collection("Blocked").doc(profileId).set({
            dateBlocked: d.toUTCString()
        });
    }
    function report(){
        //Report the user.
        console.log("Not implemented yet");
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
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
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
</style>
<main>
    <div class="flex">
        {#if added}
            <button class ="status" id="remove" on:click="{removeFriend}">Remove as a friend</button>
        {:else}
            <button class="status" id="add" on:click="{addFriend}">Add as a friend</button>
        {/if}
        <div class="dropdown">
            <button class="dropbtn">
                <img src="dotIcon.png" alt="dropdown">
            </button>
            <div class="dropdown-content" >
                <div class="dropdown-item" on:click="{block}" >Block</div>
                <div class="dropdown-item" on:click="{report}">Report</div>
            </div>
        </div>
    </div>
</main>