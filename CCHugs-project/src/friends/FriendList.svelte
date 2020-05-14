<script>
import Navbar from "../components/Navbar.svelte";
import {onMount} from 'svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

let requests =[];
let finRequests =[];
let friends = [];
let search = false;
let profiles =[];
let sprofiles =[];
var query ="";

//Get the list of friend request that the user has
let getReq = new Promise((resolve,reject)=>{
    firestore.collection("Users").doc(auth.currentUser.uid).collection("Requests").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            requests.push({user: doc.data().from, message: doc.data().message, date: doc.data().dateRequested });
        })
        resolve();
    }).catch((err)=>{
        console.log("Couldnt get requests");
        reject();
    });
})
//Get the list of friends that the user has.
let getFnd = new Promise((resolve, reject)=> {
    firestore.collection("Users").doc(auth.currentUser.uid).collection("Friends").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                friends.push({user: doc.id, date: doc.data().dateRequested });
            })
            resolve();
        }).catch((err)=>{
            console.log("Couldnt get requests");
            reject();
        });
});

function getData(){
     //Make the reqests eligible.
    getReq.then(()=>{
            let tmp = [];
            firestore.collection("Users").get().then((snapshot) => {
            if(!snapshot.empty){

                requests.forEach((reqId)=>{
                    snapshot.forEach((doc)=>{
                        if(doc.id == reqId.user ){
                            //add more to this push list if you want to display more stuff to the user.
                            tmp.push({name: doc.data().username,message: reqId.message, date: reqId.date, user: reqId.user});
                        }
                    });
                })
                finRequests = tmp;
            }
            }).catch((err) =>{
                console.log('Error Getting Usernames', err);
                // message ="That username is already taken";
            })
    });
    //Make the Friends eligable
    getFnd.then(()=>{
        var tmp = [];
        firestore.collection("Users").get().then((snapshot) => {
            if(!snapshot.empty){

                requests.forEach((fndId)=>{
                    snapshot.forEach((doc)=>{
                        if(doc.id == fndId.user ){
                            //add more to this push list if you want to display more stuff to the user.
                            tmp.push({name: doc.data().username, date: fndId.date, user: fndId.user});
                        }
                    });
                })
                friends = tmp;
            }
            }).catch((err) =>{
                console.log('Error Getting Usernames', err);
                // message ="That username is already taken";
            })

    });
}

//Make the data from the database eligable for the user.
onMount(()=>{
    getUsers();
    getData();
});

function refreash(){
    getData();
}

//Adds a doc in each of the users friends list in the database.
function acceptRequest(profile){
        firestore.collection("Users").doc(auth.currentUser.uid).collection("Friends").doc(profile).set({
                dateRequested: d.toUTCString(),
        });
        //updates profiles collection
        firestore.collection("Users").doc(profile).collection("Friends").doc(auth.currentUser.uid).set({
            dateRequested: d.toUTCString(),
        });
        denyRequest(profile);
}
//Will remove the requests from the users reqest and requested collection in the database.
function denyRequest(profile){
        firestore.collection("Users").doc(auth.currentUser.uid).collection("Requests").doc(profile).delete().then(function() {
            console.log("Document successfully deleted! from user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        firestore.collection("Users").doc(profile).collection("Requested").doc(auth.currentUser.uid).delete().then(function() {
            console.log("Document successfully deleted! from other user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        document.getElementById(profile).outerHTML="";
        refreash();
}

//Send the user to the profile of the person that was clicked on.
function gotoProfile(name){
    window.location = "./profile?user="+name;
}
//Get all the users that could be searched up.
function getUsers(){
    let tmp = [];
    firestore.collection("Users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //add aditionaal info that you want to display here
                tmp.push({name: doc.data().displayName});
            })
            profiles = tmp;
            console.log(profiles);
    })
}

function updateSearch(){
    sprofiles =[];
    if(query==""){
        search = false;
    }
    else{
        search = true;
    }
    profiles.map(function(algo){
        if(algo.name != undefined)
        if(algo.name.toLowerCase().indexOf(query.toLowerCase()) != -1){
                sprofiles= [...sprofiles, {name: algo.name}];
            }
    })
}

</script>
<style>
    .friend{
        background: #FF9E6D;
        background-image: linear-gradient(65deg, #6dffe7, #ffffff);
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 15px;
        text-align: center;
        display: grid;
        gap: 5px;
        padding: 10px;

    }
    .request{
        display: grid;
        background: #FF9E6D;
        background-image: linear-gradient(65deg, #6dffe7, #ffffff);
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 15px;
        text-align: center;
        padding: 10px;
        gap: 5px;
    }
    .request button{
        margin: 0 auto;
        background-color: #FFE66D;
        border-radius: 15px;
        padding: 0.4em;
        box-sizing: border-box;
        border: 2px solid black;
        /* #d48259 */
    }
    #search{
        background: #FFE66D;
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 17px;
        padding-left: 5px;
    }
    #friendsList , #requestList, #searchList{
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr;
    }
    #searchList{
        margin-top: 5px;
    }
</style>
<main>
    <Navbar></Navbar>
    <div id="top"><h1>Friends</h1>
    <input id="search"  bind:value={query} on:input={updateSearch} 
    type="search" placeholder="search..."/></div>
        {#if search}
         <div id="searchList">
            {#each sprofiles as pfl}
                <div class="friend" on:click="{()=> gotoProfile(pfl.name)}">
                    <span>{pfl.name}</span>
                </div>
            {/each}
        </div>
        {:else}
        <h2>Requests</h2>
        <div id="requestList">
        {#each finRequests as req}
            <div id="{req.user}" class="request" on:click="{()=> gotoProfile(req.name)}">
                <span style="font-size: large;">{req.name}</span>
                <span>{req.date}</span>
                <span>{req.message}</span>
                <button class ="accept" on:click="{() => acceptRequest(req.user)}">Accept
                </button>
                <button class="decline" on:click="{() => denyRequest(req.user)}">Decline
                </button>
            </div>
        {/each}
        </div>
        <h2>Friends</h2>
        <div id="friendsList">
        {#each friends as fnd}
            <div class="friend" on:click="{()=> gotoProfile(fnd.name)}">
                <span style="font-size: large;">{fnd.name}</span>
                <span>Added on {fnd.date}</span>
            </div>
        {/each}
        </div>
    {/if}
</main>