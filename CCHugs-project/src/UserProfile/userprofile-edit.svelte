<script>
import Navbar from '../components/Navbar.svelte'


</script>

<main>
<header>
<Navbar>
</Navbar>
</header>

<section class = "buttonDisplay backgroundContainer">
<a href="https://placeholder.com"><img src="https://via.placeholder.com/128" alt="blank 128 X 128 Square"></a>
<button> Click to change your picture </button>


<form>
    <fieldset>
        <legend>Edit Profile:</legend>
        <label for='dname'>Display Name:</label>
        <input type="text" id='dname' name='dname'>
        <label for='quote'>Quote:</label>
        <input type="text" id='quote' name='quote'>
        <label for='email'>E-mail Address:</label>
        <input type="text" id='email' name='email'>
        <label for='password'>Password:</label>
        <input type="text" id='password' name='password'>
    </fieldset>
    <button id="submit1">Cancel</button> 
    <input id="submit1" type="submit" value="Send">
    
</form>

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
        margin:25px 0;
		grid-area: section;
	}

	footer {
        background-color: #FFE66D; 
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

	}

	@media (min-width: 440px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
		"header" 
		"section"
		"footer";
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

		button {
        margin: auto;
		width: 50%;
		height: 50px;
		background-color: #ff9e6d;
        border-radius: 25px;
		}

        #submit1 {
        margin: 15px auto;
        float: left;
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

        fieldset{
            margin-top: 15px;
            padding: 25px;
            display: grid; 
        }

</style>