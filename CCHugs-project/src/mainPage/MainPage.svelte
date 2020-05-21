<script>
	import Navbar from '../components/Navbar.svelte';
	import FootLoose from "./../components/Footer.svelte";
	import {auth} from "./../Firebase.js";
	import {firestore} from "./../Firebase.js";
	import Header from '../components/Header.svelte';

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
<nav>
	<Navbar></Navbar>
</nav>

	<header>
	<Header profileName={"Main Page"}></Header>
	</header>

	<section>
		<div class="buttonDisplay">
		{#each button as button}
		<button style={button.color} on:click={button.handle}>{button.buttonName}</button>
		{/each}
		</div>
	</section>

		<div class="twitterTweet">
		<a class="twitter-timeline" data-width="100%" data-height="100%" data-theme="dark" href="https://twitter.com/CCHUGS2?ref_src=twsrc%5Etfw">Tweets by CCHugs</a> 
		<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
		</div>

<footer>
<FootLoose></FootLoose>
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
	
	nav {
		margin-bottom: 110px;
		grid-area: nav;
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

	.twitterTweet{
		grid-area: twitter;
	}

		@media (min-width: 1024px) {
		main {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
			"nav nav nav"
			"header header header"
			"section section twitter"
			"footer footer footer";
		}

		.buttonDisplay {
			font-size: 225%;
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns:repeat(2, 1fr);
			grid-template-areas:
			"section twitter";
		}

		.twitterTweet {
			border-radius: 25px;
			margin: 0px 25px;
		}

	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"nav nav"
			"header header"
			"section section"
			"twitter twitter"
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
		.twitterTweet {
			border-radius: 25px;
			margin: 25px;
			height: 350px;
		}
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"nav nav"
			"header header"
			"section section"
			"twitter twitter"
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

			.twitterTweet {
			border-radius: 25px;
			margin: 25px;
			height: 200px;
		}
	}

		button {
			font-family: 'Segoe UI';
			font-size:100%;
			width: 100%;
			height: 150px;
			border-radius: 25px;
			border: 2px solid black;
		}

		
</style>