<script>
	let name = '.....'

	let button = [
		{buttonName: 'Profile', handle: function () {
		name = 'Profile'}, color: "background-color: #6dffe7"},

		{buttonName:'Send A Hug', handle: function () {
		name = "Send A Hug"}, color: "background-color: #6dffe7"},

		{buttonName: 'Check Hugs', handle: function () {
		name = "Check Hugs"}, color: "background-color: #6dffe7"},
		{buttonName:'Friends List', handle: function () {
		name = "Friends List"}, color: "background-color: #6dffe7"},

		{buttonName:'Chats', handle: function () {
		name = "Chats"}, color: "background-color: #6dffe7"},

		{buttonName:'Self Awareness' + ' & ' + 'Mental Help', handle: function () {
		name = "Self Awareness & Mental help"}, color: "background-color: #FF9E6D"},


		{buttonName:'Feedback 1.', handle: function () {
		name = "Feedback 1."}, color: "background-color: #FFE66D"},

				{buttonName:'Feedback 2.', handle: function () {
		name = "Feedback 2."}, color: "background-color: #C4C4C4"},

				{buttonName:'Feedback 3.', handle: function () {
		name = "Feedback 3."}, color: "background-color: #FF9E6D"},

				{buttonName:'Feedback 4.', handle: function () {
		name = "Feedback 4."}, color: "background-color: #448FFF"},

				{buttonName:'Feedback 5.', handle: function () {
		name = "Feedback 5."}, color: "background-color: #FF6B6B"},

						{buttonName:'Feedback 6.', handle: function () {
		name = "Feedback 5."}, color: "background-color: #6dffe7"},
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
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns:repeat(3, 1fr);
			grid-template-areas:
			"section section section"
		}

	}

	@media (min-width: 440px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"header header"
			"section section"
			"footer footer";
		}

				.buttonDisplay {
			display:grid;
			grid-gap: 50px 50px;
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"section section"
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
			grid-gap: 50px 50px;
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"section"
		}
	}

		button {
			width: 100%;
			height: 250px;
			border-radius: 25px;
			font-size: 250%;
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