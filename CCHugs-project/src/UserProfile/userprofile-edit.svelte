<script>
import Navbar from '../components/Navbar.svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";
import Footer from "./../components/Footer.svelte";
import Header from "./../components/Header.svelte";
let name;

function showProfile() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  name = snap.data().username;
			  let userPicture = snap.data().displayPicture;
			  let userName = snap.data().displayName;
			  let userQuote = snap.data().quote;
			  let emailAddress = snap.data().email;
			  document.getElementById("dname").value = userName;
			  document.getElementById("quote").value = userQuote;
			  document.getElementById("email").value = emailAddress;
			  document.getElementById("profilePicture").src = userPicture;
		  })
  });
}

let returnToProfile = function () {
		location.href="/userprofile?user="+name;
}

let editDisplayPicture = function () {
		location.href="/displaypicture";
}

let changePassword = function() {
	auth.onAuthStateChanged(function(user){
	let password = prompt('Change Password?\nMust be Greater Than 6 and Less Than 25.');
	if (password != null && password.length > 6 && password.length < 25 ) {
		user.updatePassword(password)
		.then(function() {
			alert("Password Update Successful.");
		})
		.catch (function (error) {
			alert("Error No Changes.");
		})
	} else {
		alert("Password Does Not Meet Requirement.");
	}
	})
}

function setAddListner() {
    document.getElementById("submit2")
        let profileDisplayName = document.getElementById("dname").value;
		let profileQuote = document.getElementById("quote").value;
		let profileEmail = document.getElementById("email").value;
	if (!profileDisplayName || !profileQuote || profileEmail === "") {
		alert("Display Name, Quote, and Profile Email cannot be empty.")
	}else{
        auth.onAuthStateChanged(function (user){
			user.updateEmail(profileEmail).then(function() {
					 firestore.collection("Users").doc(user.uid)
					.update({
						displayName: profileDisplayName,
						quote: profileQuote,
						email: profileEmail
								})
					.then(function () {
						location.replace("/userprofile?user="+name);
					})
				}).catch(function(error) {
					console.log("email could not be updated")
				});

			});
			}
}

showProfile();
</script>

<main>
<nav>
<Navbar></Navbar>
</nav>

<header>
<Header profileName={"Edit-Profile"}></Header>
</header>

<section class = "buttonDisplay backgroundContainer">
<img id="profilePicture" alt="profile picture">

<div id="divButton">
<button class="edit" on:click={editDisplayPicture}>Change Picture </button>
<button class="edit" on:click={changePassword}>Change Password</button>
</div>
<br>

<form on:submit|preventDefault="{setAddListner}">
    <fieldset>
		<div class="infoField">
        <label for='dname'>Display Name:</label>
        <input type="text" id='dname' name='dname' value="">
        <label for='quote'>Quote:</label>
        <input type="text" id='quote' name='quote' value="">
        <label for='email'>E-mail Address:</label>
        <input type="text" id='email' name='email' value="">
		</div>
    </fieldset>
	<input id="submit2" type="submit" value="Save">
	<button type='button' on:click={returnToProfile} id="cancel">Cancel</button> 
    </form>

</section>

<footer>
<Footer></Footer>
</footer>
</main>


<style>
	main {
		height: 100%;
		display: grid;
		grid-template-areas:
		"nav"
		"header"
		"section"
		"footer";
	}

	nav{
		margin-bottom: 110px;
		grid-area: nav;
	}

	header {
		grid-area: header;
	}

	section {
		grid-area: section;
	}

	footer {
		margin-top: auto;
		grid-area:footer;
	}

		@media (min-width: 1024px) {
		main {
		grid-template-columns: repeat(1, 1fr);
		grid-template-areas:
		"nav"
		"header"
		"section"
		"footer";
		}
		section {
			margin: 0px 100px;
		}
	}

	@media (min-width: 440px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"nav"
		"header" 
		"section"
		"footer";
		}

		section{ 
		margin: 0px 25px;
		}

	}

	@media (max-width: 440px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"nav"
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

		div .edit {
		display: flex;
		flex-direction: column;
		margin: 0px auto;
		background-color: #ff9e6d;
        border-radius: 25px;
		font: 100%;
		padding: 10px 25px;
		}

        #submit2 {
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

    	#profilePicture{
        margin-left:auto;
        margin-right:auto;
		margin-bottom: 15px;
		border-radius: 50%;
        }

		fieldset {
			margin: 5px auto;
		}

        .infoField {
			display:flex;
			flex-direction: column;
			justify-content: center;
			width: 80%;
			margin: 0px auto 20px;
        }

		input {
			font-size: 100%;
			border: none;
			padding: 5px 0px 10px 5px;
			border-radius: 4px;
		}


</style>