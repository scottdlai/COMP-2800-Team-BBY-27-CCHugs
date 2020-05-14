<script>
import Navbar from '../components/Navbar.svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

let returnToProfile = function () {
		location.href="/userprofile";
}

let editDisplayPicture = function () {
		location.href="/displaypicture";
}

function setAddListner() {
    document.getElementById("submit2")
        let profileDisplayName = document.getElementById("dname").value;
		let profileQuote = document.getElementById("quote").value;
		let profileEmail = document.getElementById("email").value;
console.log(profileDisplayName);

	if (!profileDisplayName || !profileQuote || !profileEmail === "") {
		alert("Values cannot be null")
	}else{

        auth.onAuthStateChanged(function (user){
            firestore.collection("Users").doc(user.uid)
            .update({
                displayName: profileDisplayName,
				quote: profileQuote,
				email: profileEmail
						})
			.then(function () {
				location.replace("/userprofile");
			})

			});
			

			}

}

function showNameValue() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userName = snap.data().displayName;
			  let userQuote = snap.data().quote;
			  let emailAddress = snap.data().email;
			  document.getElementById("dname").value = userName;
			  document.getElementById("quote").value = userQuote;
			  document.getElementById("email").value = emailAddress;
		  })
  });
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
showPicture();
showNameValue();


</script>
<Navbar>
</Navbar>
<main>
<header>
</header>

<section class = "buttonDisplay backgroundContainer">
<img id="profilePicture" alt="profile picture">
<button id="edit" on:click={editDisplayPicture}> Click to change your picture </button>

<form on:submit|preventDefault="{setAddListner}">
    <fieldset>
        <legend>Edit Profile:</legend>
        <label for='dname'>Display Name:</label>
        <input type="text" id='dname' name='dname' value="">
        <label for='quote'>Quote:</label>
        <input type="text" id='quote' name='quote' value= "">
        <label for='email'>E-mail Address:</label>
        <input type="text" id='email' name='email'>
        <label for='password'>Password:</label>
        <input type="text" id='password' name='password'>
    </fieldset>
	<input id="submit2" type="submit" value="Save">
    </form>
	<button on:click={returnToProfile} id="cancel">Cancel</button> 

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

	}

	@media (min-width: 440px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"header" 
		"section"
		"footer";
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

    }

    	.buttonDisplay {
		display:grid;
		grid-template-columns:repeat(1, 1fr);
		grid-template-areas:
		"section";
        padding: 10px;
        background-image: linear-gradient(135deg, #6DFFE7, #ffffff);
        border-radius: 25px;
        border: 2px solid black;
		}

		#edit {
        margin: auto;
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		}

        #submit2 {
        margin-top: 15px;
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		float: right;
		}

		#cancel{
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		float: left;
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

        fieldset{
            margin-top: 15px;
            padding: 25px;
            display: grid; 
        }

</style>