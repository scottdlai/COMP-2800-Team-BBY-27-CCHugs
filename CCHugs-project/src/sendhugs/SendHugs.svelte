<script>
  import { firestore } from '../Firebase.js';
  import firebase from 'firebase/app';
  import NavBar from '../components/NavBar.svelte';

  import Modal from './Modal.svelte';

  export let uid;

  let content;

  let show = false;

  function launchModal() {
    show = true;
  }

  function sendHug() { return; }

  /**
   * Sends a hug to a random user.
   */
  function sendHugRand() {
    const newHugDoc = firestore
      .collection('Hugs')
      .doc();
    
    const username = getUsername(); // currently logged in username

    const randomUser = getRandomUser();

    Promise.all([username, randomUser]).then(values => {
      newHugDoc.set({
        author: values[0],
        content: content,
        reciever: values[1],
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
      content = '';
      location.href="/checkhugs";
    });

  }

  /**
   * Returns the username of the currently logged-in user.
   * 
   * @return {string} username of the currenly logged-in user
   */
  async function getUsername() {
    const query = firestore
      .collection('Users')
      .doc(uid);
    
    const userDoc = await query.get();

    return userDoc.get('username');
  }

  /**
   * Returns the username of a random user.
   * 
   * @return {string} username of a random user
   */
  async function getRandomUser() {
    const query = firestore
      .collection('Users');

    const snapshot = await query.get();
    
    const docs = snapshot.docs.filter(doc => doc.id !== uid); // advoid selecting its own user

    return docs[Math.floor(Math.random() * docs.length)].get('username');
  }
</script>

<NavBar />
<main>
  <div id="form-wrapper">
    <div id="input-container" on:submit|preventDefault={sendHug}>
      <textarea type="text" bind:value={content} placeholder="type your message here..." />

      <button class="send-btn" on:click={launchModal}>Send to Friend</button>
      <button class="send-btn random" on:click={sendHugRand}>Send randomly</button>

    </div>
  </div>
</main>
<Modal bind:show={show} {uid} />

<style>
  #form-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
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

  .random {
    background-color: #ff9e6d; 
  }
</style>