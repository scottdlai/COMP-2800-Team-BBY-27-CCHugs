<script>
  import Navbar from "../components/Navbar.svelte";
  import Footer from "../components/Footer.svelte";
  import { auth, firestore } from "../Firebase.js";
  import { authState } from "rxfire/auth";
  import { collectionData } from "rxfire/firestore";

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
  function showProfile() {
    auth.onAuthStateChanged(function(user) {
      firestore
        .collection("Users")
        .doc(user.uid)
        .onSnapshot(function(snap) {
          let userName = snap.data().username;
          document.getElementById("dname").innerHTML = userName;
        });
    });
  }
  showProfile();
</script>

<style>
  header {
    overflow: hidden;
    text-align: center;
    background-color: #ffe66d;
    position: relative;
    top: 0;
    width: 100%;
  }
  #logo {
    width: 80%;
  }
  main {
    margin: 0% 20%;
  }
  h3 {
    margin: 10px;
    padding: 10px;
    text-align: center;
  }
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

  /** tablet*/
  @media (max-width: 1024px) {
    main {
      margin: 0% 10%;
      font-size: 3vw;
    }
  }

  @media (max-width: 440px) {
    main {
      margin: 0% 5%;
      font-size: 4vw;
    }
  }
</style>

<header>
  <img {src} alt="logo" id="logo" />
</header>

<Navbar />

<main>
  <h3>
    <span id="dname" />
    's
    <br />
    Recieved Hugs
  </h3>

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
</main>

<Footer />
