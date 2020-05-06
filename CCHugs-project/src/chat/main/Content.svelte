<script>
  import { afterUpdate } from 'svelte';
  import ChatBubble from './ChatBubble.svelte';

  export let currentUser = {};
  export let conversation = {};

  let sentMessage = '';

  $: messages = conversation['messages'];

  afterUpdate(() => {
    const messagesWrapper = document.getElementById('messages-wrapper');

    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  });

  function sendMessage(event) {
    if (!sentMessage) // Can't send empty message
      return;

    conversation.messages = [...messages, {
      content: sentMessage,
      author: currentUser,
      id: Math.random().toString(),
    }];

    sentMessage = '';
  }
  
</script>

<main>
  <div id="messages-wrapper">
    <div id="messages-container">
      {#each messages as message (message.id)}
        <ChatBubble message={message} />
      {:else}
        <h1>Starts your conversation...</h1>
      {/each}
    </div>
  </div>
  <form id="input-container" on:submit|preventDefault={sendMessage}>
    <textarea type="text" bind:value={sentMessage} placeholder="type here..."/>

    <button>Send</button>
  </form>
</main>

<style>
  main {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    display: grid;
    grid-template-rows: auto 20vh;
    grid-template-columns: auto;
    row-gap: 12px;
    overflow-y: scroll;
  }
  /* 
    BUG FIX:
    https://stackoverflow.com/questions/36130760/use-justify-content-flex-end-
    and-to-have-vertical-scrollbar
  */
  #messages-wrapper {
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: 100%;
  }

  #messages-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 24px;
    min-height: 100%;
    overflow-y: scroll;
  }

  #input-container {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: space-evenly;
    
  }

  textarea {
    width: 56.25vw;
    height: 15vh;
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

  button {
    background-color: #ffe66d;
    width: 12.5vw;
    height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
  }

  button:hover {
    border: 4px solid black;
  }

</style>