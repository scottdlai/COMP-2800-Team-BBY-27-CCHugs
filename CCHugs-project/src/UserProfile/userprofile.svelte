<script>
import Navbar from '../components/Navbar.svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

let editProfile = function () {
		location.href="/userprofileEdit";
}

function showPicture() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userPicture = snap.data().displayPicture;
			  document.getElementById("profilePicture").src = userPicture;
		  })
  });
}

function showNameValue() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userName = snap.data().displayName;
			  let userQuote = snap.data().quote;
			  let emailAddress = snap.data().email;
			  document.getElementById("dname").innerHTML= userName;
			  document.getElementById("quote").innerHTML = userQuote;
		  })
  });
}
showNameValue();
showPicture();


</script>

<main>
<header>
<Navbar>
</Navbar>
</header>

<section>
<div class="buttonDisplay">
<img id="profilePicture" alt="profile picture">

<button on:click={editProfile} >Edit Profile</button>
</div>

<div class="backgroundContainer">
<h2>Display Name:</h2> 
<p id="dname">Hello</p>

<h2>Quotes:</h2>
<p id="quote">Just A Hugger</p>
</div>


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
This is a footer
</footer>
</main>
<style>
	main {
		display: grid;
		grid-template-areas:
		"header"
		"section"
		"footer";
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

	footer {
        background-color: #FFE66D; 
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
		grid-template-columns: repeat(1, 1fr);
		grid-template-areas:
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