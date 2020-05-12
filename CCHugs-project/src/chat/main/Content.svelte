<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { firestore } from '../../Firebase.js';
  import firebase from 'firebase/app';

  import ChatBubble from './ChatBubble.svelte';

  export let userIDs;
  export let uid;
  export let partnerIndex;

  let conversationDocSnapshotID;

  $: partnerID = userIDs[partnerIndex];
  $: conversationPromise = getConversationDB(partnerID);

  let sentMessage = '';

  afterUpdate(() => {
    const messagesWrapper = document.getElementById('messages-wrapper');

    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  });
  
  async function getConversationDB(partner) {
    const query = firestore
      .collection('Conversations')
      .where('participants', 'array-contains', uid);    

    const querySnapshot = await query.get();

    const conversationDocSnapshot = getConversationWithPartner(querySnapshot);

    const participants = conversationDocSnapshot.get('participants');

    const messages = await getMessagesOf(conversationDocSnapshot);

    return { participants: participants, messages: messages };
  }

  function getConversationWithPartner(querySnapshot) {
    let conversation;

    querySnapshot.forEach(queryDocSnapshot => {
      if (queryDocSnapshot.get('participants').includes(partnerID)) {
        conversation = queryDocSnapshot;
      }
    });

    return conversation;
  }

  async function getMessagesOf(conversationDocSnapshot) {
    conversationDocSnapshotID = conversationDocSnapshot.id;

    const messagesQuery = firestore
      .collection('Conversations')
      .doc(conversationDocSnapshotID)
      .collection('Messages')
      .orderBy('time');

    const messagesSnapshot = await messagesQuery.get();

    return messagesSnapshot.docs.map(messageDoc => {
      return { ...messageDoc.data(), id: messageDoc.id };
    });
  }

  function sendMessage(event) { 
    if (!sentMessage)
      return;

    const newMessageQuery = firestore
      .collection('Conversations')
      .doc(conversationDocSnapshotID)
      .collection('Messages')
      .doc();

    const message = {
      author: uid,
      content: sentMessage,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    
    newMessageQuery.set(message);

    conversationPromise.then(conversations => {
        conversations.messages = [...conversations.messages, {...message, id: newMessageQuery.id}];
    });

    conversationPromise = conversationPromise;
    sentMessage = '';
  }
</script>

  <main>
    <div id="messages-wrapper">
      <div id="messages-container">
        {#await conversationPromise}
          <h1>loading...</h1>
        {:then conversation}
          {#each conversation.messages as message (message.id)}
            <ChatBubble {message} {uid}/>
          {:else}
            <h1>Starts your conversation...</h1>
          {/each}
        {/await}
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