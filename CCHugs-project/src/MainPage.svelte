<script>
	let mainProfile = 'Profile';
	let mainChat = 'Self Awareness & Mental Help';
	let mainSendAHug = 'Send A Hug';
	let mainCheckHug = 'Check Hugs';
	let mainFiendsList = 'Fiends List';
	let mainChats = 'Chats';
	let mainFeedback = 'Feedback';
	let name = 'Victor'
	const handleProfile = function () {
		name = 'orange';
	};
</script>

<main>
	<h1>My name is {name}!</h1>
	<button on:click = {handleProfile}>{mainProfile}</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>