<script>
import Navbar from '../components/Navbar.svelte';
import Footer from './../components/Footer.svelte';
import Header from '../components/Header.svelte';
</script>

<main>

<nav>
<Navbar></Navbar>>
</nav>

	<header>
<Header profileName={"Self-Awareness & Mental Health"}></Header>
	</header>

    <section>    
        <p>This section contains links to some resources to help you get help or more information on mental wellbeing.
        It is by far not an exhaustive list, but hopefully provides a good stepping stone.</p>

        <ul>
            <li><a href="https://www.stopoverdose.gov.bc.ca/theweekly/get-mental-health-help-home-during-covid-19">Get Mental Health Help at Home During COVID-19 - BC Government</a></li>
            <li><a href="https://www.stopoverdose.gov.bc.ca/theweekly/covid-19-mental-health-supports-social-distancing-self-isolation">COVID-19: Mental Health Supports for Social Distancing & Self-isolation - BC Government</a></li>
            <li><a href="https://www2.gov.bc.ca/gov/content/health/managing-your-health/mental-health-substance-use/virtual-supports-covid-19">Virtual Mental Health Supports During COVID-19 - BC Government</a></li>
            <li><a href="https://www.canada.ca/en/public-health/services/publications/diseases-conditions/taking-care-mental-health.html">Taking care of your mental health during the COVID-19 pandemic - Government of Canada</a></li>
            <li><a href="https://www.canada.ca/en/government/publicservice/covid-19/protect-mental-health.html#toc1">Mental health and wellness during COVID-19 - Government of Canada</a></li>
            <li><a href="https://cmha.ca/mental-health-meter">Mental Health Meter - Canadian Mental Health Association</a></li>
        </ul>
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
	
	nav {
		margin-bottom: 110px;
		grid-area: nav;
	}

	header {
		grid-area: header;
	}

	section {
        padding: 50px 100px;
        font-size: 20px;
        margin: 25px;
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
			"nav nav nav"
			"header header header"
			"section section section"
			"footer footer footer";
		}
	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
			"nav nav"
			"header header"
			"section section"
			"footer footer";
		}
        
	}

	@media (max-width: 520px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"nav"
			"header"
			"section"
			"footer";
		}
        section{
            padding: 15px;
            margin: 0px 5px;
        }
        p {
            text-align: justify;
            text-justify: auto;
        }
	}

</style>