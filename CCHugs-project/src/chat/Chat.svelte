<script>
  import { auth, firestore } from '../Firebase.js';
  import { authState } from 'rxfire/auth';
  import { onMount } from 'svelte';

  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  /** uid of the currently logged-in user. */
  export let uid;

  /** Promise of the uids of the users that this user chats with. */
  let userIDsPromise = getAllUsersDB();

  /** Index of the partner that this user is watching. */
  let partnerIndex;

  /** Boolean value to show the chat page. */
  let show = false;

  /**
   * Gets all users that the currently logged-in user has chat with and returns
   * a promise from firestore.
   * 
   * @returns {Promise} of the list of userIDs
   */
  async function getAllUsersDB() {
    // console.log(uid);
    const query = firestore
      .collection('Conversations')
      .where('participants', 'array-contains', uid);
    
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw new Error('querySnapshot is empty!');
    }

    let participantsFromDB = querySnapshot.docs.flatMap(doc => doc.get('participants'));

    return participantsFromDB.filter(p => p !== uid);
  }

  /**
   * Goes to the active conversation. 
   */
  function updateActive(event) {
    partnerIndex = event.detail;
    show = true;
  }

  /**
   * Goes to the friends page.
   */
  function goToFriendPage() {
    location.href = '/friends';
  }

  /**
   * Hides the conversation page.
   */
  function toggleShow(event) {
    show = false;
  }

</script>

<nav>
  <Navbar />
</nav>

{#await userIDsPromise then userIDs}
  <main>
    <!-- <Sidebar {userIDs} {partnerIndex} on:updateActive={updateActive}/>
    <Content {userIDs} {uid} bind:partnerIndex/> -->
    {#if show}
      <Content {userIDs} {uid} bind:partnerIndex on:click={toggleShow}/>
    {:else}
      <Sidebar {userIDs} on:updateActive={updateActive}/>
    {/if}
  </main>
{:catch error}
  <main class="container-friends">
    <h1>Start new conversations with your friends!</h1>
    <button on:click={goToFriendPage} class="friends-btn">
      Go to friends page
    </button>
  </main>
{/await}

<style>
  main {
    position: relative;
    top: 15vh;
  }
  
  .container-friends {
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }

  .friends-btn {
    background-color: #ffe66d;
    width: 60vw;
    height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
  }

  @media screen and (max-width: 994px) {
    main {
      position: relative;
      top: 8vh;
    }
  }
</style>
