<script>
import Navbar from '../components/Navbar.svelte';
let name = '.....'

</script>

<Navbar>
</Navbar>

<main>
	<header>
		<h1>Going to {name}!</h1>
	</header>

<section>
<div class="buttonDisplay">
<a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>

<button>Edit Profile</button>
</div>

<div class="backgroundContainer">
<h2>Display Name:</h2> 
<p>Claire</p>

<h2>Quotes:</h2>
<p>Just A Hugger</p>
</div>


<div>
<button>remove friend</button>
<button>block</button>
<button>report</button>
</div>

<button>
Send Request for friendship
</button>

<div class="backgroundContainer">
<h2>Status</h2>
<hr>
<div class="buttonDisplay">
<a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
</div>
</div>

<div class="backgroundContainer">
    <h2>Claires Badges</h2>
    <hr>
    <div class="displayBadge">
    <a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
    <a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
    </div>
</div>    
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
        margin-top:25px;
        margin-left:auto;
        margin-right:auto;
		grid-area: section;
	}

	footer {
        background-color: #FFE66D; 
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
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"section"
		}

        .displayBadge {
            display: grid;
            grid-gap: 25px 25px;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
            "section"
        }
	}

		button {
        margin: auto;
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		}
		
		h1 {
		text-align: center;
		color: #ff3e00;
		text-transform: capitalize;
		font-size: 4em;
		font-weight: 100;
		}

        a{
        margin-left:auto;
        margin-right:auto;
        }

        .backgroundContainer {
            margin: 15px 0px;
            padding: 10px;
            background-image: linear-gradient(135deg, #6DFFE7, #ffffff);
            border-radius: 25px;
            border: 2px solid black;
        }


</style>