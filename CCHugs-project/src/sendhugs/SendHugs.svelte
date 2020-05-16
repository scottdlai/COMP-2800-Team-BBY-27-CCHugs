<script>
  import { firestore } from '../Firebase.js';
  import NavBar from '../components/NavBar.svelte';

  export let uid;

  let content;

  function sendHug() { return; }

  function sendHugRand() { return; }
</script>

<main>
  <NavBar />
  <div id="form-wrapper">
    <div id="input-container" on:submit|preventDefault={sendHug}>
      <textarea type="text" bind:value={content} placeholder="type your message here..." />

      <button class="send-btn" on:click={sendHug}>Send to Friend</button>
      <button class="send-btn random" on:click={sendHugRand}>Send randomly</button>
    </div>
  </div>

</main>

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