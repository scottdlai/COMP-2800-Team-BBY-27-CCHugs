<script>
import Navbar from '../components/Navbar.svelte';
import {auth} from "./../Firebase.js";
import {firestore} from "./../Firebase.js";

let toMainPage = function () {
    location.replace('/mainpage');
}

function displayName() {
  auth.onAuthStateChanged(function (user) {
		  firestore.collection("Users").doc(user.uid)
		  .onSnapshot(function (snap) {
			  let userName = snap.data().displayName;
			  document.getElementById("nameField").value = userName;
		  })
  });
}
displayName();

function writeFeedback() {
    let userFeedBack = document.getElementById('feedback').value;
    let userName = document.getElementById("nameField").value;
    let date = new Date();
    let feedBackObject = {
        Name: userName,
        Feedback: userFeedBack,
        Date: date,

    }
    firestore.collection("Feedback")
    .add(feedBackObject)
    .then(function() {
        location.replace('/mainpage')
    })
    }


</script>
<Navbar>
</Navbar>

<main>
<header>
<h1>This is a header</h1>
</header>

<section class="buttonDisplay">
<form on:submit|preventDefault="{writeFeedback}">
<fieldset>
<label>
Name:
<input id="nameField" type="text">
</label>
<textarea id="feedback" placeholder="Please type feedback here...."></textarea>
</fieldset>
<input id="submit" type="submit" value="Submit">
</form>
<button on:click={toMainPage}> Cancel</button>
</section>

<footer>
<h1> this is a foooter</h1>
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
		margin-left: 25px;
		margin-right: 25px;
		grid-area: section;
	}

	footer {
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
			grid-template-columns:repeat(1, 1fr);
			grid-template-areas:
			"section";
		}

	}

	@media (min-width: 520px) and (max-width: 1024px) {
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
			"section";
		}
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"header"
			"section"
			"footer";
		}
		.buttonDisplay {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"section";
		}
	}	
		h1 {
			text-align: center;
			color: black;
			text-transform: capitalize;
			font-size: 200%;
			font-weight: 100;
		}

		footer {
			margin-top: 25px;
			background-color: #FFE66D;
		}

        #feedback{
            padding: 15px;
            width: 100%;
            height: 200px;
            border-radius: 25px;
            font-size:1em;
            border: 2px solid black;
            background-image: linear-gradient(180deg, #6DFFE7, #ffffff);
        }

        #nameField {
            border: 2px solid black;
            border-radius: 25px;
            padding: 5px 5px 5px 15px;
            background-image: linear-gradient(90deg, #6DFFE7, #ffffff);
        }

        #submit{
            background-color: #ff9e6d;
            border-radius: 25px;
            width: 50%;
            float: right;
            height: 50px;
            font-weight: bold;
            border: 2px solid black;
        }

        button{
            background-color: #ff9e6d;
            border-radius: 25px;
            float: left;
            width: 50%;
            font-size:100%;
			border-radius: 25px;
			border: 2px solid black;
			font-weight: bold;
            margin-top: 15px;
		    height: 50px;
        }
</style>