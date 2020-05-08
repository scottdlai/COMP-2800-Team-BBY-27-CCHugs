<script>
import Navbar from '../components/Navbar.svelte';
import Footer from './../components/Footer.svelte';

let src1 = "https://via.placeholder.com/350";
let src2 = "https://via.placeholder.com/350";
let src3 = "../IMG_0317-square.jpg";
let src4 = "https://via.placeholder.com/350";

</script>

<Navbar />

<main>
	<header>
        <br>
		<h1>About Us - Team CCHugs</h1> 
    </header>
    <hr>

    <section>    
        <p>Team CCHugs is comprised of four BCIT CST first and second term students. We hope to create a space where people can build connections with each other, strangers and friends alike, during the COVID-19 pandemic where physical distancing and self-isolation are the new norm. There may be underlying effects of loneliness and disconnection as humans are wired to be social and connected with other human beings. A small, but potentially impactful connection can be made when you send a virtual hug. </p>
        <p>It can remind someone that they are not alone. It can spark a conversation. It can brighten up your day.</p>

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-m-6">
                    <img src = { src1 } class="rounded-circle img-fluid" alt="profile1">
                    Sean Wallace</div>
                <div class="col-m-6 ">
                    <img src = { src2 } class="rounded-circle img-fluid" alt="profile2">
                    Scott Lai</div>
            </div>
            <div class="row justify-content-center">
                <div class="col-m-6">
                    <img src = { src3 } class="rounded-circle img-fluid" alt="profile3">
                    April Tsang</div>
                <div class="col-m-6 ">
                    <img src = { src4 } class="rounded-circle img-fluid" alt="profile4">
                    Victor Cho</div>

            </div>
        </div>

        <p id="tagline">This project was completed for BCIT COMP2800 2020.</p>

    </section>

</main>

<Footer />

<style>
    header {
        padding: 10px;
        text-align: center
    }

    p {
        font-size: 28px;
        text-align: center;
        margin: 25px;
    }

    #tagline {
        font-size: 18px;
    }

    .container {
        font-size: 25px;
        margin: auto;    
    }

    .col-m-6 {
        width: 200px;
        padding: 10px;
    }

 @media (max-width:440px) {

    p {
        font-size: 5vw;
        margin: 10px;
    }

    #tagline {
        font-size: 4vw;
    }

    .container {
        font-size: 5vw;
    }
 }
 
</style>