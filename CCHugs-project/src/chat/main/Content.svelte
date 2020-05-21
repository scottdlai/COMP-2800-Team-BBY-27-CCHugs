<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { firestore } from "../../Firebase.js";
  import firebase from "firebase/app";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  import ChatBubble from "./ChatBubble.svelte";

  /** List of userIDs that this user chats with. */
  export let userIDs;

  /** uid of the currently logged in user. */
  export let uid;

  /** Index of the conversation partner inside userIDs list. */
  export let partnerIndex;

  /** Current conversation. */
  let conversation = { participants: [], messages: [] };

  /** Value for the text input. */
  let sentMessage = "";

  /** conversation reference. */ 
  let conversationRef;

  /** conversation parnter object . */
  $: partner = userIDs[partnerIndex];

  $: updateConversationWith(partner);

  /**
   * Listen to changes of the conversation from the database. 
   */
  function updateConversationWith(partner) {
    console.log(partner);
    const query = firestore
      .collection("Conversations")
      .where("participants", "in", [[uid, partner], [partner, uid]]);

    query.onSnapshot(querysnapshot => {
      // should get only 1 document snapshot
      conversationRef = querysnapshot.docs[0];

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

  // To scroll down the page
  afterUpdate(() => {
    const messagesWrapper = document.getElementById("messages-wrapper");

    messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
  });

  /**
   * Uploads a new message to the database.
   */
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

<button class="back-btn" on:click>back</button>
<main class="conversation-container">
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
    <textarea 
      type="text" 
      bind:value={sentMessage}
      placeholder="type here..."
      class="text-field" />

    <button class="send-btn">Send</button>
  </form>
</main>

<style>
  .conversation-container {
    display: grid;
    grid-template-rows: auto 15vh;
    height: 77.5vh;
    row-gap: 12px;
  }

  .back-btn {
    /* background-color: #ffe66d; */
    /* border-radius: 4px; */
    background-color: white;
    border: none;
    margin-left: 2vw;
    font-size: 2em;
    text-decoration: underline;
  }

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
    min-height: 100%;
    overflow-y: scroll;
  }

  #input-container {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    display: flex;
    justify-content: space-evenly;
  }

  .text-field {
    width: 67vw;
    height: 10vh;
    border-radius: 4px;
    border: 4px solid black;
    background-color: white;
    outline: none;
    resize: none;
    padding: 4px 12px;
    font-size: 2em;
  }

  .send-btn {
    background-color: #ffe66d;
    width: 27vw;
    height: 10vh;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    font-size: 2em;
  }

  @media screen and (max-width: 994px) {
    .conversation-container {
      height: 85vh;
    }
  }
</style>
