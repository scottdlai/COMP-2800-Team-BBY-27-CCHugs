<script>
  import { firestore } from "../Firebase.js";
  import firebase from "firebase/app";

  import NavBar from "../components/NavBar.svelte";
  import Modal from "./Modal.svelte";

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

<NavBar />
<main>
  <h1 class="page-title">Let's send a hug!</h1>
  <div id="form-wrapper">
    <div id="input-container">
      <textarea
        type="text"
        bind:value={content}
        placeholder="type your message here..." />

      <button class="send-btn" on:click={launchModal}>Send</button>
    </div>
  </div>
</main>
<Modal bind:show {uid} on:chooseFriend={sendHugTo}/>

<style>
  .page-title {
    text-align: center;
    margin-bottom: 12px;
  }

  #form-wrapper {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  textarea {
    width: 60vw;
    height: 60vh;
    border-radius: 4px;
    border: 4px solid black;
    background-color: white;
    outline: none;
    resize: none;
    padding: 4px 12px;
    font-size: 2em;
  }

  textarea:focus::placeholder {
    color: transparent;
  }

  .send-btn {
    background-color: #ffe66d;
    width: 60vw;
    height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
    display: block;
    align-self: center;
    margin-top: 24px;
  }

  .send-btn:hover {
    border: 4px solid black;
  }
</style>