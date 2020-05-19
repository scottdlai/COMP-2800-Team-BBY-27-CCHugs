<script>
  import NavbarLanding from "./../components/NavbarLanding.svelte";
  import Footer from "./../components/Footer.svelte";

  import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

  let src = "../DifferentLogo2.svg";
  let easterEgg ="../hug.png";

  let handleClick = () => {
    location.href = "/login";
  };

  let count = 0;
  let visible = false;

	$: if (count >= 10) {
    // alert(`count is dangerously high!`);
    visible = true;
		count = 0;
	}

  function egg() {
    count += 1;
    visible = false;
  };

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = elasticOut(t);
				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					);`
			}
		};
	}
</script>


<style>
#mission button {
  background-color: #ff9e6d;
  border-radius: 15px;
  border: none;
  transition-duration: 0.4s
}

#mission button:hover {
  background-color: #ffe66d;
}


.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}

	span {
		position: absolute;
		transform: translate(-50%,-50%);
		font-size: 3em;
	}


  :target:before {
    content: "";
    display: block;
    height: 90px; /* fixed header height*/
    margin: -70px 0 0; /* negative fixed header height */
  }

  h1 {
    margin: 0px;
    text-align: center;
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
    padding: 50px 250px;
    margin: auto;
  }

  #features {
    text-align: left;
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
    background: #ff9e6d;
  }

  .feature-list li {
    counter-increment: step-counter;
    list-style: none;
    padding-bottom: 30px;
    position: relative;
    padding-left: 100px;
    overflow: hidden;
    font-size: 20px;
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
    padding: 50px 250px;
    display: flex;
    justify-content: space-around;

  }

  #howto > div {
    background: #ff9e6d;
    margin: 20px;
    flex: 1;
    border-radius: 25px;
    padding: 25px;
    border: none;
  }

  .btn  {
      font-size:20px;
      color: black;
    
  }

  #resources {
    padding: 50px 250px;
    margin: 20px;
  }

  /** tablet*/
  @media (max-width: 1024px) {

    header h1, p {
      font-size: 3vw;
    }

      #mission {
    text-align: center;
    position: relative;
    padding: 50px 100px;
    margin: auto;
  }
    #howto {
    padding: 50px 100px;
      display: flex;
      flex-direction: column;
    }

    #resources {
    padding: 50px 100px;
    margin: 20px;
  }


  }

  /** mobile */
  @media (max-width: 440px) {
    #logo {
      overflow: hidden;
      text-align: center;
      background-color: #ffe66d;
      position: relative;
      top: 0;
      width: 80%;
    }

      #mission {
    text-align: center;
    position: relative;
    padding: 25px;
    margin: auto;
  }

    header h1, p {
      font-size: 4vw;
    }

    #howto {
      padding: 5px;
      display: flex;
      flex-direction: column;
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
      font-size: 4vw;
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
      background: #ff9e6d;
    }

        #resources {
    padding: 25px;
  }
  }
</style>

{#if visible}
	<div class="centered" in:spin="{{duration: 8000}}" out:fade>
		<span><img src={easterEgg} alt="easteregg" width="250"/></span>
	</div>
{/if}

<main>
  <header on:click={egg}>
    <img {src} alt="logo" id="logo" />
    <h1>CCHugs - Send a virtual hug today</h1>
  </header>


  <NavbarLanding />

  <section id="mission-a">
    <div id="mission">
      <h1>Mission Statement</h1>
      <br />
      <p>
        Our mission at CCHugs is to invite everyone to create <em>small, but
        potentially impactful connections with others</em> and spread joy and
        positivity.
      </p>
      <p>
        We want to invite people to build connections with each other, strangers
        and friends alike, during the COVID-19 pandemic where physical
        distancing and self-isolation are the new norm. There may be underlying
        effects of loneliness and disconnection as humans are wired to be social
        and connected with other human beings. <strong>Through a simple click of a
        button, you can send a hug to another person to brighten up their day,
        and perhaps even spark a conversation.</strong>
      </p>
      <button on:click={handleClick}>Start Hugging Now!</button>
    </div>
  </section>

  <hr />

  <section id="features-a">
    <div id="features">
      <h1>Features</h1><br>
      <div id="feature-box">
        <ol class="feature-list">
          <li>Send an anonymous hug.</li>
          <li>Add a positive message.</li>
          <li>Receive unexpected hugs.</li>
          <li>Add fellow Hugsers as a friend.</li>
          <li>Keep the conversation going.</li>
        </ol>
      </div>
    </div>
  </section>

  <hr />

  <section id="howto-a">
    <h1>How-To Guide</h1>
    <div id="howto">

    <div id="accordion">
  <div class="card" style="background-color:#ff9e6d;border:none">
    <div class="card-header" id="headingOne" style="background-color:#ffaf87"> 
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Send a hug
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
          <p>1. Sign up</p>
          <p>2. Choose to “Send a hug”</p>
          <p>
            3. Add an optional positive message for the Huggee (the recipient -
            you won’t know who it is!)
          </p>
          <p>4. Click “Send”!</p> 
          </div>
    </div>
  </div>
  <div class="card" style="background-color:#ff9e6d;border:none">
    <div class="card-header" id="headingTwo" style="background-color:#ffaf87">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Receive a hug
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        <p>1. Check your hug notifications</p>
        <p>2. Open the hug</p>
        <p>3. See if the Hugser (the sender) sent you a message with the hug</p>    
        </div>
    </div>
  </div>
  <div class="card" style="background-color:#ff9e6d;border:none">
    <div class="card-header" id="headingThree" style="background-color:#ffaf87"> 
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Add a friend
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        <p>1. Send a friend request to fellow Hugser</p>
        <p>
          2. Once accepted, keep the conversation going with more hugs and chats
        </p>
        <p>3. Add personal friends. You can send hugs to them too</p>    
        </div>
    </div>
  </div>
</div>

    </div>
  </section>

  <hr />

  <section id="resources-a">
    <div id="resources">
      <h1>Resources</h1>
      <br />
      <p>
        Sometimes things can be too much for us to handle on our own.
        <br /><br />
        Sometimes we need some extra help.
        <br /><br />
        Or perhaps you know someone who is in need of extra help.
        <br /><br />
        Or maybe you just need to do a quick check-in on your own mental
        well-being.
        <br /><br />
        Click
        <a href="../resources">here</a>
        to get more information.
      </p>

    </div>
  </section>

</main>

<Footer />
