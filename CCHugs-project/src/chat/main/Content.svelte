<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { firestore } from "../../Firebase.js";
  import firebase from "firebase/app";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  import ChatBubble from "./ChatBubble.svelte";

  export let userIDs;
  export let uid;
  export let partnerIndex;

  let conversation = { participants: [], messages: [] };

  let sentMessage = "";

  let conversationRef;

  $: partner = userIDs[partnerIndex];

  $: updateConversationWith(partner);

  function updateConversationWith(partner) {
    console.log(partner);
    const query = firestore
      .collection("Conversations")
      .where("participants", "in", [[uid, partner], [partner, uid]]);

    query.onSnapshot(querysnapshot => {
      conversationRef = querysnapshot.docs[0]; // should get only 1 document snapshot

      conversation.participants = conversationRef.get("participants");

      conversationRef
        .ref
        .collection("Messages")
        .orderBy("time")
        .onSnapshot(messageSnapshot => {
          conversation.messages = messageSnapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          });
        });

      console.table(conversation);
    });
  }

  afterUpdate(() => {
    const messagesWrapper = document.getElementById("messages-wrapper");

    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  });

  function sendMessage(event) {
    if (!sentMessage) return;

    const newMessageQuery = conversationRef.ref.collection("Messages").doc();

    const message = {
      author: uid,
      content: sentMessage,
      time: firebase.firestore.FieldValue.serverTimestamp()
    };

    newMessageQuery.set(message);

    sentMessage = "";
  }
</script>

<main>
  <div id="messages-wrapper">
    <div id="messages-container">
      {#each conversation.messages as message (message.id)}
        <ChatBubble {message} {uid} />
      {:else}
        <h1>Starts your conversation...</h1>
      {/each}
    </div>
  </div>

  <form id="input-container" on:submit|preventDefault={sendMessage}>
    <textarea type="text" bind:value={sentMessage} placeholder="type here..." />

    <button>Send</button>
  </form>
</main>

<style>
  main {
    grid-column: 2 / span 1;
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