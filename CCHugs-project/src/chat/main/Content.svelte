<script>
  import ChatBubble from './ChatBubble.svelte';
  import TextBox from './TextBox.svelte';
  import SendButton from './SendButton.svelte';

  export let user = {};
  export let conversation = [];

  let message = '';

  function sendMessage(event) {
    if (message === '') // Can't send empty message
      return;
    
    conversation.push({
      message: message,
      sender: 'currentUser',
      reciever: 'Jenny',
      id: Math.random().toString(),
    });
    message = '';
    conversation = conversation;
  } 
  
</script>

<main>
  <div id="chat-log-container">
    {#each conversation as text (text.id)}
      <ChatBubble chatLog={text} />
    {/each}
  </div>
  <div id="input-container">
    <TextBox bind:message={message}/>
    <SendButton on:click={sendMessage}/>
  </div>
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

  #chat-log-container {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    overflow-y: auto;
  }

  #input-container {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: space-evenly;
  }

</style>