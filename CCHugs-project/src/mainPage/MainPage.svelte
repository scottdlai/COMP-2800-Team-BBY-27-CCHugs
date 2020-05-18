<script>
	import Navbar from '../components/Navbar.svelte';
	import FootLoose from "./../components/Footer.svelte";
	import {auth} from "./../Firebase.js";
	import {firestore} from "./../Firebase.js";

let name;

	auth.onAuthStateChanged(function (user) {
		firestore.collection("Users").doc(user.uid)
		.onSnapshot(function(snap){
			name = snap.data().username;
			console.log(name);
		})
	});


	let button = [
		{buttonName: 'Profile', handle: function () {
		location.href="/userprofile?user="+name}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Send A Hug', handle: function () {
		location.href="/sendhugs"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName: 'Check Hugs', handle: function () {
		location.href="/checkhugs"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},
		{buttonName:'Friends List', handle: function () {
		location.href="/friends"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Chats', handle: function () {
		location.href="/Chat"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Self Awareness' + ' & ' + 'Mental Help', handle: function () {
		location.href="/resources"}, color: "background-color: #FF9E6D"},

		{buttonName:'Feedback', handle: function () {
		location.href="/feedback"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},
	];
	console.log(button);
</script>

<main>
<navbar>
	<Navbar>
</Navbar>
</navbar>

	<header>
		<h1>Going to {name}!</h1>
	</header>

	<section>
		<div class="buttonDisplay">
		{#each button as button}
		<button style={button.color} on:click={button.handle}>{button.buttonName}</button>
		{/each}
		</div>
	</section>

<footer>
<FootLoose></FootLoose>
</footer>
</main>


<style>
	main {
		height: 100%;
		display: grid;
		grid-template-areas:
		"header"
		"section";
	}
	
	navbar{
		grid-area: navbar;
	}

	header {
		grid-area: header;
	}

	section {
		margin-left: 25px;
		margin-right: 25px;
		grid-area: section;
	}

	footer{
		margin-top: auto;
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
			"navbar navbar navbar"
			"header header header"
			"section section section"
			"footer footer footer";
		}

		.buttonDisplay {
			font-size: 225%;
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns:repeat(3, 1fr);
			grid-template-areas:
			"section section section";
		}

	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"navbar navbar"
			"header header"
			"section section"
			"footer footer";
		}

			.buttonDisplay {
			font-size: 200%;
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"section section";
		}
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"navbar navbar"
			"header header"
			"section section"
			"footer footer";
		}
		.buttonDisplay {
			font-size: 125%;
			display: grid;
			grid-gap: 25px 25px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"section section";
		}
	}

		button {
			font-size:100%;
			width: 100%;
			height: 150px;
			border-radius: 25px;
			border: 2px solid black;
			font-weight: bold;
		}
		
		h1 {
			text-align: center;
			color: black;
			text-transform: capitalize;
			font-size: 4em;
			font-weight: 100;
		}
</style>