<script>
import Navbar from "../components/Navbar.svelte";
import {onMount} from 'svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

let requests =[];
let finRequests =[];

let getReq = new Promise((resolve,reject)=>{
    firestore.collection("Users").doc(auth.currentUser.uid).collection("Requests").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            requests.push({user: doc.data.from, date: doc.data.dateRequested });
        })
        resolve();
    }).catch((err)=>{
        console.log("Couldnt get requests");
        reject();
    });
})

onMount(()=>{
    getReq.then(
            firestore.collection("Users").get().then((snapshot) => {
            if(!snapshot.empty){

                requests.forEach((reqId)=>{
                    snapshot.forEach((doc)=>{
                        if(doc.id == reqId.user ){
                            //add more to this push list if you want to display more stuff to the user.

                            finRequests.push({name: doc.data.name, date: reqId.date});
                        }
                    });


                })
               
            }
            }).catch((err) =>{
                console.log('Error Getting Usernames', err);
                // message ="That username is already taken";
            })
    );





});

//insert a div for each friend that is found in the databse

</script>
<style>
    .friend{
        background: #FF9E6D;
        border: 12px solid #FFE66D;
        box-sizing: border-box;
        border-radius: 28px;
    }
    #search{
        background: #FFE66D;
        border: 2px solid #FF9E6D;
        box-sizing: border-box;
        border-radius: 17px;
    }
    #friendsList{
        display: grid;
        grid-template-columns: 35vw;
        column-gap: 10vw;
        row-gap: 5vh;
    }
</style>
<main>
<Navbar></Navbar>
<div id="top"><h1>Friends</h1>
<div id="search">Search</div></div>

<div id="requestList">
<h2>Requests</h2>

{#each finRequests as req}
    <div class="request"><span>{req.name}</span><span>{req.date}</span><button class ="accept">Accept</button><button class="decline">Decline</button></div>
{/each}
</div>
<div id="friendsList"><div class="friend"></div></div>
</main>