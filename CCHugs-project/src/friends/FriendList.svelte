<script>
  import Navbar from "../components/Navbar.svelte";
  import {onMount} from 'svelte';
  import {auth} from "./../Firebase.js";
  import {firestore} from "./../Firebase.js";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

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
            //put each request into an array to display.
            finRequests=[...finRequests,{dname: doc.data().displayName, name: doc.data().username, user: doc.data().from, message: doc.data().message, date: doc.data().dateRequested, status: "Requested" }]
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
                //put each friend into an array that will be displayed.
                friends = [...friends,{dname: doc.data().displayName, name: doc.data().username,user: doc.id, date: doc.data().dateAdded, status: "Friend" }];
            })
            resolve();
        }).catch((err)=>{
            console.log("Couldnt get requests");
            reject();
        });
});
//Get all the data for the friends and requests
function getData(){
     //Make the reqests eligible.
    getReq.then(console.log(finRequests));
    //Make the Friends eligable
    getFnd.then(console.log(friends));
}

//Make the data from the database eligable for the user.
onMount(()=>{
    getUsers();
    getData();
});
//Refreash the data on the page to get and updated list of users.
function refresh(){
    getData();
}

//Adds a doc in each of the users friends list in the database.
function acceptRequest(profile, username, displayName){
        //add the profile to the users friends list
        firestore.collection("Users").doc(uid).collection("Friends").doc(profile).set({
                dateAdded: d.toUTCString(),
                username: username,
                displayName: displayName
        }).then(()=>{
            //add the user to the profiles friendslist.
             firestore.collection("Users").doc(uid).get().then((doc)=>{
                firestore.collection("Users").doc(profile).collection("Friends").doc(uid).set({
                    dateAdded: d.toUTCString(),
                    username: doc.data().username,
                    displayName: doc.data().displayName
                }).then(()=>{
                    denyRequest(profile)
                    });
        });
        });
}
//Will remove the requests from the users reqest and requested collection in the database.
function denyRequest(profile){
        firestore.collection("Users").doc(uid).collection("Requests").doc(profile).delete().then(function() {
            console.log("Document successfully deleted! from user");
                firestore.collection("Users").doc(profile).collection("Requested").doc(uid).delete().then(function() {
                console.log("Document successfully deleted! from other user");
                //reload the page after the data has been deleted.
                location.reload();
                refresh();
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
     //  document.getElementById(profile).outerHTML="";
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
//update the results of the search as is compares the search bar values to the list of user that are made.
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
//Send the user to the chat page of the profile that was clicked on.
//if a chat doesnt exist create a new one.
  async function conversationWith(partnerID) {
      event.stopPropagation();
    console.log(partnerID);

    const query = firestore
      .collection('Conversations')
      .where('participants', 'in', [[partnerID, uid], [uid, partnerID]]);

    const snapshot = await query.get();
    
    if (!snapshot.empty) {
      location.href = '/chat';
      return;
    }

    firestore.collection('Conversations').add({
      participants: [uid, partnerID]
    }).then((doc) => {
      location.href = '/chat';
    });
  }

</script>

<style>

    #top {
        margin-top: 25px;
    }
    label {
        padding-left: 15px;
    }
    .friend{
        display:grid;
        background: #FF9E6D;
        background-image: linear-gradient(65deg, #6dffe7, #ffffff);
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 15px;
        text-align: center;
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
        margin: 0 25px;
        background-color: #FFE66D;
        border-radius: 15px;
        padding: 0.4em;
        box-sizing: border-box;
        border: 2px solid black;
        /* #d48259 */
    }


    .conversation-btn {
    padding: 10px;
      border-radius: 15px;
      font-size: 100%;
      margin: 0px 20px;
      border: black 2px solid;
    }

    #search{
        background: #FFE66D;
        border: 2px solid black;
        box-sizing: border-box;
        border-radius: 17px;
        padding-left: 5px;
    }
     #requestList{
        margin:20px;
        display: grid;
        gap: 10px;
        grid-template-columns: 2fr;
    }

    #friendsList , #requestList, #searchList{
    margin:20px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(1, 1fr);
    }
	
    #searchList{
        margin-top: 5px;
    }

    	main {
		height: 100%;
		display: grid;
		grid-template-areas:
        "navbar"
		"header"
		"section"
        "friendsContainer"
        "footer";
	}
	
	nav{
        margin-bottom: 110px;
		grid-area: nav;
	}

	header {
		grid-area: header;
	}

    .friendsContainer{
        grid-area: friendsContainer
    }

	section {
		grid-area: section;
	}

	footer{
		margin-top: auto;
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"nav nav"
			"header header"
			"section friendsContainer"
			"footer footer";
		}

        #friendsList, #searchList {
        margin:20px;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);
    }

        section, .friendsContainer{
        margin: 0px 5px 0px;
        }
	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"nav nav"
			"header header"
			"section section"
            "friendsContainer friendsContainer"
			"footer footer";
		}

        #friendsList, #searchList {
        margin:20px;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, 1fr);
    }
        section, .friendsContainer{
        margin: 0px 5px 0px;
        }
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"nav"
			"header"
			"section"
            "friendsContainer"
			"footer";
		}
        section, .friendsContainer{
            margin: 0px 15px;
        }

        #friendsList , #requestList, #searchList{
        margin:20px;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(1, 1fr);
    }
	}
</style>

<main>
<nav>
    <Navbar></Navbar>
</nav>

<header>    
<Header profileName={"Friends-List"}></Header>
    <div id="top"><label>Search For Friends:<br>
    <input id="search"  bind:value={query} on:input={updateSearch} 
    type="search" placeholder="Search"/>
    </label>
    </div>
</header>


        {#if search}
        <section>
         <div id="searchList">
            {#each sprofiles as pfl}
                {#if pfl.status === "Request"}
                    <div id="{pfl.user}" class="request">
                        <span on:click="{()=> gotoProfile(pfl.name)}" style="font-size: large;">{pfl.dname}</span>
                        <span>{pfl.date}</span>
                        <span>{pfl.message}</span>
                        <div>
                            <button class ="accept" on:click="{() => acceptRequest(pfl.user, pfl.name,pfl.dname)}">Accept
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
        </section>
        {:else}
        
<section>
<h1>Requests</h1>
        <div id="requestList">
        {#each finRequests as req}
            <div id="{req.user}"  class="request">
                <span on:click="{()=> gotoProfile(req.name)}" style="font-size: large;">{req.name}</span>
                <span>{req.date}</span>
                <span>{req.message}</span>
                <div >
                    <button class="accept" on:click="{() => acceptRequest(req.user, req.name,req.dname)}">Accept
                    </button>
                    <button style="background-color: #FF6347;" class="decline" on:click="{() => denyRequest(req.user)}">Decline
                    </button>
                </div>
            </div>
        {/each}
        </div>
</section>


    <div class="friendsContainer">
<h1>Friends</h1>
        <div id="friendsList">
        {#each friends as fnd}
            <div class="friend">
                <span style="font-size: large;">{fnd.dname}</span>
                <span>Added on {fnd.date}</span>
                <div>
                <button class="conversation-btn" on:click={()=> gotoProfile(fnd.name)}>ViewProfile</button>                 
                <button class="conversation-btn" on:click={() => conversationWith(fnd.user)}>Chat</button>
                </div>
            </div>
        {/each}
        </div>
    </div>
    {/if}

<footer>
    <Footer></Footer>
</footer>
</main>