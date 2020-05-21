<script>
  import { createEventDispatcher } from 'svelte';
  import { firestore } from '../Firebase.js';
  
  /** Boolean value for showing the modal. */
  export let show = true;

  /** uid of the currently logged in user. */
  export let uid;

  /** Promise to get the friends list from firestore. */
  let friendsPromise = getFriends();

  /** Event dispatcher. */
  const dispatch = createEventDispatcher();

  /**
   * Returns a promise of friends list from firestore.
   * 
   * @returns {Promise} a promise of friends list from firestore 
   */
  async function getFriends() {
    const query = firestore
      .collection('Users')
      .doc(uid)
      .collection('Friends');
    
    const snapshot = await query.get();

    return snapshot.docs.map(doc => doc.get('username'));
  }

  /**
   * A custom event to tell the parent Component (SendHugs) that the user has 
   * choose a friend.
   */
  function chooseFriend(friend) {
    show = false;
    dispatch('chooseFriend', friend);
  }

</script>

<main>
  {#if show}
    <div id="container" on:click|self={event => show = false}>
      <div id="modal">
        <button class="friend-tab random" on:click={() => chooseFriend('')}>
          Choose Randomly
        </button>

        {#await friendsPromise then friends}
          {#each friends as friend}
            <button class="friend-tab" on:click={() => chooseFriend(friend)}>
              {friend}
            </button>       
          {/each}
        {/await}
      </div>
    </div>
  {/if}
</main>

<style>
  #container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.6);
  }

  #modal {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 4px;
    max-width: 80%;
    min-height: 60%;
    margin: 30% auto;
    background-color: #f8f8f8;
    overflow-y: scroll;
  }

  .friend-tab {
    background-color: #ffe66d;
    width: 80%;
    min-height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
    align-self: center;
    margin-top: 24px;
    word-wrap: break-word;
  }

  .friend-tab:hover {
    border: 4px solid black;
  }

  .random {
    background-color: #ff9e6d;
  }
</style>