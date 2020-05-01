<script>
  import ChatBubble from './ChatBubble.svelte';
  import TextBox from './TextBox.svelte';
  import SendButton from './SendButton.svelte';

  export let user = {};
  export let chatLogs = [];
  let message = '';

  function sendMessage(event) {
    console.log('sent');
    chatLogs.push({
      message: message,
      sender: 'currentUser',
      reciever: 'Jenny',
      id: Math.random().toString(),
    });
    message = '';
    chatLogs = chatLogs;
  } 
</script>

<main>
  <div id="chat-log-container">
    {#each chatLogs as chatLog (chatLog.id)}
      <ChatBubble chatLog={chatLog} />
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
  }

  #chat-log-container {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
  }

  #input-container {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: space-evenly;
  }

</style>