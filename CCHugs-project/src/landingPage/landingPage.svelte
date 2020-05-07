<script>
    import NavbarLanding from './../components/NavbarLanding.svelte';
    import Footer from './../components/Footer.svelte';

    let src = "../DifferentLogo2.svg";
    
    const handleClick = () => {
        href="/signup"
    };

</script>

<main>
    <header>
        <img {src} alt=logo id="logo">
        <h1>CCHugs - Send a virtual hug today</h1>
    </header>

    <NavbarLanding />

    <section id="mission-a">
        <div id="mission">
            <h1>Mission Statement</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit justo et nulla varius, quis tempor ligula ullamcorper. Nam vitae egestas mauris. Morbi eu convallis augue, nec lacinia nisi. Vivamus sed eleifend odio. Quisque lobortis enim ligula, volutpat efficitur velit porttitor ac. Maecenas iaculis nisl leo, sit amet commodo erat maximus eget. Nunc cursus nisl in consectetur rhoncus. In hac habitasse platea dictumst. Sed sit amet vehicula enim, eget volutpat ex. Vivamus ligula turpis, vestibulum ut hendrerit ac, egestas fringilla odio. Nam ut molestie urna. Mauris at cursus mi. Donec viverra vehicula erat, at condimentum dui condimentum ac. Nunc id suscipit libero. Vivamus non lacinia tortor, vel molestie nisl.</p>
            <button on:click={handleClick}>update belt colour</button>
        </div>
    </section>

    <hr>

    <section id="features-a">
    <div id="features">    
        <h1>Features</h1>
        <div id="feature-box">
            <ol class="feature-list">
                <li id="li1">Send an anonymous hug.<br>Add a positive message.</li> 
                <li id="li2">Receive unexpected hugs.</li>
                <li id="li3">Add fellow Hugsers as a friend.</li>
                <li id="li4">Keep the conversation going.</li>
            </ol>
        </div>
    </section>

    <hr>

    <section id="howto-a">
        <h1>How-To Guide</h1>
        <div id="howto">    
            <div id="step1">
                <p>Send a hug</p>
            </div>
            <div id="step2">
                <p>Receive a hug</p>            
            </div>
            <div id="step3">
                <p>Add a friend</p>            
            </div>
        </div> 
    </section>

    <hr>

    <section id="resources-a">
        <h1> Resources</h1>

        <p>https://www.stopoverdose.gov.bc.ca/theweekly/get-mental-health-help-home-during-covid-19
        https://www.stopoverdose.gov.bc.ca/theweekly/covid-19-mental-health-supports-social-distancing-self-isolation
        https://www2.gov.bc.ca/gov/content/health/managing-your-health/mental-health-substance-use/virtual-supports-covid-19
        https://www.canada.ca/en/public-health/services/publications/diseases-conditions/taking-care-mental-health.html
        https://www.canada.ca/en/government/publicservice/covid-19/protect-mental-health.html#toc1
        https://cmha.ca/mental-health-meter</p>
    </section>  

    </main>

<Footer />

<style>

    :target:before {
        content:"";
        display:block;
        height:90px; /* fixed header height*/
        margin:-70px 0 0; /* negative fixed header height */
    }

    .feature-list {
        padding-left: 0;
        position: relative;
    }
    .feature-list:before {
        content: "";
        position: absolute;
        z-index: -2;
        left: 0;
        top: 0;
        bottom: 0;
        width: 40px;
        background: #FF9E6D;
    }

        .feature-list li {
        counter-increment: step-counter;
        list-style: none;
        padding-bottom: 30px;
        position: relative;
        padding-left: 25px;
        overflow: hidden;
        font-size: 24px;
    }

    .feature-list li:before {
        content: counter(step-counter);
        margin-right: 5px;
        box-shadow: 0 0 0 200px white;
        color: white;
        border-radius: 50%;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        text-align: center;
        width: 40px;
        height: 40px;
    }

    header {
        overflow: hidden;
        text-align: center;
        background-color: #ffe66d;
        position: relative;
        top: 0;
        width: 100%;
    }
    #howto {
        padding: 5px;
        display: flex;
        justify-content: space-around;
    }

    #howto > div {
        background: #FF9E6D;
        margin: 20px;
        flex-grow: 1;
        height: 500px;
        border-radius: 25px;
        padding: 25px;
    }


    h1 {
        margin: 0px;
    }



    #mission {
        text-align: center;
        position: relative;
        padding: 25px;
        margin: auto;
        z-index: -20;
    
    }

    .feature-list {
        z-index:-10;
    }

 

    #features {
        text-align: center;       
        width: 400px;
        margin: auto;
        z-index: -20;
}

    p {
        font-size: 24px;
    }
    
    /** tablet*/
    @media (max-width:1024px)  {
        #howto {
        padding: 5px;
        display: flex;
        flex-direction: column;
        }

        #howto > div {
            height: 250px;
        }
        
    }

    /** mobile */
    @media (max-width:440px)  {


    #logo {
        overflow: hidden;
        text-align: center;
        background-color: #ffe66d;
        position: relative;
        top: 0;
        width: 80%;
        
    }

    header h1 {
        font-size:5vw;
    }

        #howto {
            padding: 5px;
            display: flex;
            flex-direction: column;
            }

        #howto > div {
                height: 250px;
            }

        #features {
            text-align: center;       
            width: 300px;
            margin: auto;
            z-index: -20;
        }
        .feature-list li {
            counter-increment: step-counter;
            list-style: none;
            padding-bottom: 30px;
            position: relative;
            padding-left: 25px;
            overflow: hidden;
            font-size: 16px;
        }

        .feature-list li:before {
        content: counter(step-counter);
        margin-right: 5px;
        box-shadow: 0 0 0 200px white;
        color: white;
        border-radius: 50%;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        text-align: center;
        width: 25px;
        height: 25px;
        }

        .feature-list:before {
        content: "";
        position: absolute;
        z-index: -2;
        left: 0;
        top: 0;
        bottom: 0;
        width: 25px;
        background: #FF9E6D;
        }


    

    }    

</style>