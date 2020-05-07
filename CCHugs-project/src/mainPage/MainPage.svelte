<script>
	let name = '.....'

	let button = [
		{buttonName: 'Profile', handle: function () {
		name = 'Profile'}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Send A Hug', handle: function () {
		name = "Send A Hug"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName: 'Check Hugs', handle: function () {
		name = "Check Hugs"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},
		{buttonName:'Friends List', handle: function () {
		name = "Friends List"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Chats', handle: function () {
		name = "Chats"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},

		{buttonName:'Self Awareness' + ' & ' + 'Mental Help', handle: function () {
		name = "Self Awareness & Mental help"}, color: "background-color: #FF9E6D"},

		{buttonName:'Feedback', handle: function () {
		name = "Feedback"}, color: "background-image: linear-gradient(135deg, #6DFFE7, #ffffff)"},
	];
	console.log(button);
</script>

<main>
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
		<h1>This is a footer</h1>
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
		margin-left: auto;
		margin-right: auto;
		grid-area: section;
	}

	footer {
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
			"header header header"
			"section section section"
			"footer footer footer";
		}

		.buttonDisplay {
			font-size: 250%;
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns:repeat(3, 1fr);
			grid-template-areas:
			"section section section"
		}

	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"header header"
			"section section"
			"footer footer";
		}

			.buttonDisplay {
			font-size: 250%;
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"section section"
		}
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"header header"
			"section section"
			"footer footer";
		}
		.buttonDisplay {
			font-size: 150%;
			display: grid;
			grid-gap: 25px 25px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"section section"
		}
	}

		button {
			width: 100%;
			height: 250px;
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