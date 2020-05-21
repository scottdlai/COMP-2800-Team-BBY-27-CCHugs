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

function setAddListner() {
    document.getElementById("submit2")
        let profileDisplayName = document.getElementById("dname").value;
		let profileQuote = document.getElementById("quote").value;
		let profileEmail = document.getElementById("email").value;
console.log(profileDisplayName);

	if (!profileDisplayName || !profileQuote || !profileEmail === "") {
		alert("DisplayName, ProfileQuote, Profile Email cannot be null")
	}else{

        auth.onAuthStateChanged(function (user){
            firestore.collection("Users").doc(user.uid)
            .update({
                displayName: profileDisplayName,
				quote: profileQuote,
				email: profileEmail
						})
			.then(function () {
				location.replace("/userprofile?user="+name);
			})

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

<div id="">
<button class="edit" on:click={editDisplayPicture}> Click to change your picture </button>
<button class="edit">Change Password</button>
</div>
<br>

<form on:submit|preventDefault="{setAddListner}">
    <fieldset>
        <label for='dname'>Display Name:</label>
        <input type="text" id='dname' name='dname' value="">
        <label for='quote'>Quote:</label>
        <input type="text" id='quote' name='quote' value= "">
        <label for='email'>E-mail Address:</label>
        <input type="text" id='email' name='email'>
    </fieldset>
	<input id="submit2" type="submit" value="Save">
    </form>
	<button on:click={returnToProfile} id="cancel">Cancel</button> 

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
		width: 100%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		float: left;
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