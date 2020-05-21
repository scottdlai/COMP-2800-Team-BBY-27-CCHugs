<script>
  import { firestore } from "../Firebase.js";
  import firebase from "firebase/app";
  import Footer from '../components/Footer.svelte';
  import NavBar from "../components/NavBar.svelte";
  import Modal from "./Modal.svelte";
  import Header from '../components/Header.svelte';

  /** uid of the currenly logged in user. */
  export let uid;

  /** content of message of the hug. */
  let content;

  /** boolean value for showing the modal. */
  let show = false;

  /**
   * Launches the modal for the user to select friends.
   */
  function launchModal() {
    show = true;
  }

  /**
   * Sends a hug to the user specify by the event.detail object. If event.detail
   * is an empty string, then sends randomly.
   * 
   * @param {object} event
   */
  function sendHugTo(event) {
    console.log(event);
    const username = getUsername(); // currenly logged in user

    const receiver = event.detail || getRandomUser();

    Promise.all([username, receiver]).then(values => {
      firestore.collection("Hugs").add({
        author: values[0],
        content: content || '',
        receiver: values[1],
        time: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        content = "";
        location.href = "/checkhugs";
      });
    });

    return;
  }

  /**
   * Returns the username of the currently logged-in user.
   *
   * @return {string} username of the currenly logged-in user
   */
  async function getUsername() {
    const query = firestore.collection("Users").doc(uid || "");

    const userDoc = await query.get();

    return userDoc.get("username");
  }

  /**
   * Returns the username of a random user.
   *
   * @return {string} username of a random user
   */
  async function getRandomUser() {
    const query = firestore.collection("Users");

    const snapshot = await query.get();

    // advoid selecting its own user
    const docs = snapshot.docs.filter(doc => doc.id !== uid);

    return docs[Math.floor(Math.random() * docs.length)].get("username");
  }
</script>


<main>

<nav>
<NavBar />
</nav>

<header>
<Header profileName={"Let's Send A Hug!!"}></Header>
</header>

<section>
  <div id="form-wrapper">
      <textarea type="text" bind:value={content} placeholder="type your message here..."></textarea>
  </div>
      <button class="send-btn" on:click={launchModal}>Send</button>

  </section>

  <footer>
  <Footer></Footer>
  </footer>
</main>

<Modal bind:show {uid} on:chooseFriend={sendHugTo}/>

<style>

  #form-wrapper {
    height: 100%;
    display: grid;
    /* align-items: center; */
    background-color: #FFE66D;
    padding: 50px;
    width: 80%;
    margin: -5px auto;
    /* justify-content: center; */
    border-radius: 25px;
  }


  textarea {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    border: 4px solid black;
    background-color: white;
    outline: none;
    resize: none;
    padding: 5px 12px;
    font-size: 100%;
    margin: 0px auto;
  }

  textarea:focus::placeholder {
    color: transparent;
  }

  .send-btn {
    background-color: #ffe66d;
    width: 25%;
    border: 2px solid black;
    border-radius: 4px;
    font-size: 100%;
    outline: none;
    cursor: pointer;
    display: block;
    float:right;
    margin: 25px;
    z-index: 2;
  }

  .send-btn:hover {
    border: 4px solid black;
  }

  nav {
    margin-top: 110px;
    grid-area: nav;
  }

  header{
    grid-area: header;
  }

  section {
    margin:50px;
    grid-area: section;
  }

   footer{
   grid-area: footer;
   margin-top: auto;
 }


 main {
   height: 100%;
   display: grid;
   grid-template-columns: repeat(1, 1fr);
   grid-template-areas: 
   "nav"
   "header"
   "section"
   "footer"
 }

</style>