<script>
    import NavbarLanding from './../components/NavbarLanding.svelte';
    import Footer from './../components/Footer.svelte';

    let src = "../DifferentLogo2.svg";
    
    let handleClick = () => {
        location.href="/login"
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
            <br>
            <p>Our mission at CCHugs is to invite everyone to create small, but potentially impactful connections with others and spread joy and positivity.</p>
            <p>We want to invite people to build connections with each other, strangers and friends alike, during the COVID-19 pandemic where physical distancing and self-isolation are the new norm. There may be underlying effects of loneliness and disconnection as humans are wired to be social and connected with other human beings. Through a simple click of a button, you can send a hug to another person to brighten up their day, and perhaps even spark a conversation. </p>
            <button on:click={handleClick}>Start Hugging Now!</button>
        </div>
    </section>

    <hr>

    <section id="features-a">
    <div id="features">    
        <h1>Features</h1>
        <div id="feature-box">
            <ol class="feature-list">
                <li>Send an anonymous hug.<br>Add a positive message.</li> 
                <li>Receive unexpected hugs.</li>
                <li>Add fellow Hugsers as a friend.</li>
                <li>Keep the conversation going.</li>
            </ol>
        </div>
    </section>

    <hr>

    <section id="howto-a">
        <h1>How-To Guide</h1>
        <div id="howto">    
            <div id="step1">
                <h2>Send a hug</h2>
                <p>1. Sign up</p>
                <p>2. Choose to “Send a hug”</p>
                <p>3. dd an optional positive message for the Huggee (the recipient - you won’t know who it is!)</p>
                <p>4. Click “Send”!</p>               
            </div>
            <div id="step2">
                <h2>Receive a hug</h2>
                <p>1. Check your hug notifications</p>
                <p>2. Open the hug</p>
                <p>3. See if the Hugser (the sender) sent you a message with the hug</p>          
            </div>
            <div id="step3">
                <h2>Add a friend</h2> 
                <p>1. Send a friend request to fellow Hugser</p>
                <p>2. Once accepted, keep the conversation going with more hugs and chats</p>
                <p>3. Add personal friends. You can send hugs to them too</p>                                     
            </div>
        </div> 
    </section>

    <hr>

    <section id="resources-a">
        <div id="resources">
            <h1> Resources</h1>

            <p>Sometimes things can be too much for us to handle on our own.
            <br>Sometimes we need some extra help.
            <br>Or perhaps you know someone who is in need of extra help.
            <br>Or maybe you just need to do a quick check-in on your own mental well-being.
            <br>Click <a href="../resources">here</a> to get more information.
            </p>
            
        </div>
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

    h1 {
        margin: 0px;
        text-align: center;
    }

    p {
        font-size: 24px;
    }

    header {
        overflow: hidden;
        text-align: center;
        background-color: #ffe66d;
        position: relative;
        top: 0;
        width: 100%;
    }

    #mission {
        text-align: center;
        position: relative;
        padding: 25px;
        margin: auto;   
    }

    #features {
        text-align: center;       
        width: 400px;
        margin: auto;
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

    #howto {
        padding: 5px;
        display: flex;
        justify-content: space-around;
    }

    #howto > div {
        background: #FF9E6D;
        margin: 20px;
        flex: 1;
        height: 500px;
        border-radius: 25px;
        padding: 25px;
    }

    #resources {
        text-align: center;
        position: relative;
        padding: 25px;
        margin: auto;
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

        header h1, p {
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