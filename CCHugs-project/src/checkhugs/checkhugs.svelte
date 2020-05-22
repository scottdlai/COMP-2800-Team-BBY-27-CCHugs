<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import { auth, firestore } from "../Firebase.js";
  import { authState } from "rxfire/auth";
  import { collectionData } from "rxfire/firestore";
  import Header from '../components/Header.svelte';
  export let uid;

  let src = "../DifferentLogo2.svg";
  let count = 0;
  let hugPromise = getHugs();

  /**
  * Finds the documents in the hugs collection where the reciever matches with the current user.
  */
  async function getHugs() {
    const username = await getUsername();

    const snapshot = await firestore
      .collection("Hugs")
      .where("receiver", "==", username)
      .get();

    console.log(snapshot.docs);
    return snapshot.docs.map(doc => doc.data());
  }

/**
 * Gets the username of the curenttly logged in user. * 
 */
  async function getUsername() {
    const query = firestore
      .collection('Users')
      .doc(uid);
    
    const snapshotDoc = await query.get();

    console.log(snapshotDoc.data());
    
    return snapshotDoc.get('username');
  }

/**
 * Displays the current user's name.
 */
let userName;
  function showProfile() {
    auth.onAuthStateChanged(function(user) {
      firestore
        .collection("Users")
        .doc(user.uid)
        .onSnapshot(function(snap) {
         userName = snap.data().username;
        });
    });
  }
  showProfile();
</script>

<style>
  #hugs-list {
    padding: 0px;
    margin-bottom: 50px;
  }
  p {
    margin: 15px 0px;
    padding: 10px;
    background-image: linear-gradient(135deg, #6dffe7, #ffffff);
    border-radius: 25px;
    border: 2px solid black;
  }

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
		margin-left: 25px;
		margin-right: 25px;
		grid-area: section;
	}

	footer{
		margin-top: auto;
		grid-area: footer;
	}

		@media (min-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"nav"
			"header"
			"section"
			"footer";
		}
	}

	@media (min-width: 520px) and (max-width: 1024px) {
		main {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
			"nav"
			"header"
			"section"
			"footer";
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
	}
</style>

<main>
<nav>
<Navbar></Navbar>
</nav>

<header>
<Header profileName= "{userName}'s {'Received Hugs'}"></Header>
</header>

<section>
  <div id="hugs-list">
    {#await hugPromise then hugReceived}
      {#each hugReceived as hugs, i}
        <p>
          <b>From:</b>
          {hugs.author}
          <br />
          {#if hugs.content}
            <b>Message:</b>
            {hugs.content}
            <br />
          {/if}
          <b>Time:</b>
          {hugs.time.toDate().toDateString()}
        </p>
      {:else}
        <p style="text-align: center">You currently have no hugs :(</p>
      {/each}
    {/await}
  </div>
</section>

  <footer>
  <Footer></Footer>
  </footer>
</main>
