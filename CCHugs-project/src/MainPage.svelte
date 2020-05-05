<script>
	let name = '.....'
		let button = [
		{buttonName: 'Profile', handle: function () {
		name = 'Profile'}},

		{buttonName:'Self Awareness & Mental Help', handle: function () {
		name = "Self Awareness & Mental help"}},

		{buttonName:'Send A Hug', handle: function () {
		name = "Send A Hug"}},

				{buttonName: 'Check Hugs', handle: function () {
		name = "Check Hugs"}},

						{buttonName:'Fiends List', handle: function () {
		name = "Friends List"}},

								{buttonName:'Chats', handle: function () {
		name = "Chats"}},

										{buttonName:'Feedback', handle: function () {
		name = "Feedback"}},
	];
	console.log(button);
</script>

<main>
	<header>
	<h1>Going to {name}!</h1>
	<hr>
	</header>

	<section>
		<div class="buttonDisplay">
		{#each button as button}
		<button on:click={button.handle}>{button.buttonName}</button>
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
		background-color: #ff9e6d;
		}
		
		h1 {
		text-align: center;
		color: #ff3e00;
		text-transform: capitalize;
		font-size: 4em;
		font-weight: 100;
		}
</style>