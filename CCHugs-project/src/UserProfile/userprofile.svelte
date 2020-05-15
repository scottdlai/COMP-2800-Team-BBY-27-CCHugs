<script>
import Navbar from '../components/Navbar.svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";
import Att from '../friends/FriendAtt.svelte'
import Footer from "./../components/Footer.svelte";
export let uid;
import {onMount} from "svelte";

let editProfile = function () {
		location.href="/userprofileEdit";
}

function showProfile() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userName = snap.data().displayName;
			  let userQuote = snap.data().quote;
			  let emailAddress = snap.data().email;
			  let userPicture = snap.data().displayPicture;
			  document.getElementById("dname").innerHTML= userName;
			  document.getElementById("quote").innerHTML = userQuote;
			  document.getElementById("profilePicture").src = userPicture;
		  })
  });
}

// showProfile();

let newUser;

let getUser = new Promise ((resolve, reject) => {
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
newUser = urlParams.get('user');
resolve();
});

let displayName;
let userQuote;
let profileId;

let check = new Promise ((resolve, reject) =>{
	getUser.then(() => {
			 firestore.collection("Users").where("username", "==", newUser)
		  .onSnapshot(function (snapshot) {
			  		  if (!snapshot.empty) {
					snapshot.forEach((snap) => {
			displayName = snap.data().displayName;
			userQuote = snap.data().quote;
			let userPicture = snap.data().displayPicture;
			profileId = snap.id;
						  document.getElementById("profilePicture").src = userPicture;
					})
					resolve();
						} else{
							reject();
						}
		  })
	})
})

let yourProfile = false;

onMount(() => {
	check.then(() => {
		if(uid == profileId) {
		yourProfile = true;
	console.log(uid);
	console.log(profileId);
	}
	}
	);
})

</script>

<main>
<navbar>
<Navbar></Navbar>
</navbar>

	<header>
		<h1>Going to {name}!</h1>
	</header>

<section>
<div class="buttonDisplay">
<img id="profilePicture" alt="profile picture">

{#if yourProfile}  
<button on:click={editProfile} >Edit Profile</button>
{/if}
</div>

<div class="backgroundContainer">
<h2>Display Name:</h2> 
<p id="dname">{displayName}</p>

<h2>Quotes:</h2>
<p id="quote">{userQuote}</p>
</div>


{#if !yourProfile}
<Att uid={uid} profile={newUser}>
</Att>
{/if}
<div>

<!-- <div>
<button>remove friend</button>
<button>block</button>
<button>report</button>
</div> -->

<!-- <button>
Send Request for friendship
</button> -->

<div class="backgroundContainer">
<h2>Status</h2>
<hr>
<div class="buttonDisplay">
<a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
</div>
</div>

<div class="backgroundContainer">
    <h2>Claires Badges</h2>
    <hr>
    <div class="displayBadge">
    <a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
    <a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
    </div>
</div>    
    </section>

<footer>
<Footer></Footer>
</footer>

</main>

<style>
	main {
		height:100%;
		display: grid;
		grid-template-areas:
		"navbar"
		"header"
		"section"
		"footer";
	}

	navbar	{
		grid-area: navbar;
	}

	header {
		grid-area: header;
	}

	section {
        margin-top:25px;
        margin-left:auto;
        margin-right:auto;
		grid-area: section;
	}

	footer	{
		margin-top: auto;
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
		grid-template-columns: repeat(1, 1fr);
		grid-template-areas:
		"navbar"
		"header"
		"section"
		"footer";
		}

		.buttonDisplay {
			display:grid;
			grid-gap: 0px 50px;
			grid-template-columns:repeat(1, 1fr);
			grid-template-areas:
			"section"
		}
	}

	@media (min-width: 440px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"navbar"
		"header"
		"section"
		"footer";
		}

		.buttonDisplay {
			display:grid;
			grid-gap: 0px 50px;
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"section"
		}
	}

	@media (max-width: 440px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"navbar"
		"header"
		"section"
		"footer";
		}
		.buttonDisplay {
			display:grid;
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"section"
		}

        .displayBadge {
            display: grid;
            grid-gap: 25px 25px;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
            "section"
        }
	}

		button {
        margin: auto;
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		}
		
		h1 {
		text-align: center;
		color: #ff3e00;
		text-transform: capitalize;
		font-size: 4em;
		font-weight: 100;
		}

        #profilePicture{
        margin-left:auto;
        margin-right:auto;
		margin-bottom: 15px;
	border-radius: 50%;
        }

        .backgroundContainer {
            margin: 15px 0px;
            padding: 10px;
            background-image: linear-gradient(135deg, #6DFFE7, #ffffff);
            border-radius: 25px;
            border: 2px solid black;
        }

		a{
			margin-left:auto;
			margin-right:auto;
		}


</style>