<script>
import Navbar from "../components/Navbar.svelte";
import {onMount} from 'svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

export let uid;

let d = new Date;
let requests =[];
let finRequests =[];
let friends = [];
let search = false;
let profiles =[];
let list = [];
let sprofiles =[];
var query ="";

//Get the list of friend request that the user has
let getReq = new Promise((resolve,reject)=>{
    firestore.collection("Users").doc(uid).collection("Requests").get().then(function(querySnapshot) {
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
    firestore.collection("Users").doc(uid).collection("Friends").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                friends.push({user: doc.id, date: doc.data().dateAdded });
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
                            tmp.push({dname: doc.data().displayName ,name: doc.data().username,message: reqId.message, date: reqId.date, user: reqId.user, status: "Request"});
                        }
                    });
                })
                finRequests = tmp;
                console.log(finRequests);
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

                friends.forEach((fndId)=>{
                    snapshot.forEach((doc)=>{
                        if(doc.id == fndId.user ){
                            //add more to this push list if you want to display more stuff to the user.
                            tmp.push({dname: doc.data().displayName, name: doc.data().username, date: fndId.date, user: fndId.user, status: "Friend"});
                        }
                    });
                })
                friends = tmp;
                console.log(friends);
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

function refresh(){
    getData();
}

//Adds a doc in each of the users friends list in the database.
function acceptRequest(profile){
        firestore.collection("Users").doc(uid).collection("Friends").doc(profile).set({
                dateAdded: d.toUTCString(),
        });
        //updates profiles collection
        firestore.collection("Users").doc(profile).collection("Friends").doc(uid).set({
            dateAdded: d.toUTCString(),
        });
        denyRequest(profile);
}
//Will remove the requests from the users reqest and requested collection in the database.
function denyRequest(profile){
        firestore.collection("Users").doc(uid).collection("Requests").doc(profile).delete().then(function() {
            console.log("Document successfully deleted! from user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        firestore.collection("Users").doc(profile).collection("Requested").doc(uid).delete().then(function() {
            console.log("Document successfully deleted! from other user");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        document.getElementById(profile).outerHTML="";
        refresh();
}

//Send the user to the profile of the person that was clicked on.
function gotoProfile(name){
    window.location = "./userprofile?user="+name;
}
//Get all the users that could be searched up.
function getUsers(){
    let tmp = [];
    firestore.collection("Users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //add aditionaal info that you want to display here
                tmp.push({dname: doc.data().displayName, name: doc.data().username, status:""});
            })
            list = tmp;
    })
}

function updateSearch(){
    profiles = finRequests.concat(friends, list);
    sprofiles =[];
    if(query==""){
        search = false;
    }
    else{
        search = true;
    }
    profiles.map(function(algo){
        if(algo.dname != undefined)
        if(algo.dname.toLowerCase().indexOf(query.toLowerCase()) != -1){
                sprofiles= [...sprofiles, algo];
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
                {#if pfl.status === "Request"}
                     <div id="{pfl.user}" class="request">
                        <span on:click="{()=> gotoProfile(pfl.name)}" style="font-size: large;">{pfl.dname}</span>
                        <span>{pfl.date}</span>
                        <span>{pfl.message}</span>
                        <div>
                            <button class ="accept" on:click="{() => acceptRequest(pfl.user)}">Accept
                            </button>
                            <button class="decline" on:click="{() => denyRequest(pfl.user)}">Decline
                            </button>
                        </div>
                        <span>{pfl.status}</span>
                    </div>
                {:else if pfl.status ==="Friend"}
                    <div class="friend" on:click="{()=> gotoProfile(pfl.name)}">
                        <span style="font-size: large;">{pfl.dname}</span>
                        <span>Added on {pfl.date}</span>
                        <span>{pfl.status}</span>
                    </div>
                {:else}
                <div class="friend" on:click="{()=> gotoProfile(pfl.name)}">
                    <span>{pfl.dname}</span>
                </div>
                {/if}
            {/each}
        </div>
        {:else}
        <h2>Requests</h2>
        <div id="requestList">
        {#each finRequests as req}
            <div id="{req.user}"  class="request">
                <span on:click="{()=> gotoProfile(req.name)}" style="font-size: large;">{req.name}</span>
                <span>{req.date}</span>
                <span>{req.message}</span>
                <div >
                    <button class ="accept" on:click="{() => acceptRequest(req.user)}">Accept
                    </button>
                    <button class="decline" on:click="{() => denyRequest(req.user)}">Decline
                    </button>
                </div>
            </div>
        {/each}
        </div>
        <h2>Friends</h2>
        <div id="friendsList">
        {#each friends as fnd}
            <div class="friend" on:click="{()=> gotoProfile(fnd.name)}">
                <span style="font-size: large;">{fnd.dname}</span>
                <span>Added on {fnd.date}</span>
            </div>
        {/each}
        </div>
    {/if}
</main>