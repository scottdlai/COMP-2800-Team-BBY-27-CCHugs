<script>
  import { createEventDispatcher } from 'svelte';
  import { firestore } from '../Firebase.js';
  
  export let show = true;
  export let uid;

  let friendsPromise = getFriends();

  const dispatch = createEventDispatcher();

  async function getFriends() {
    const query = firestore
      .collection('Users')
      .doc(uid)
      .collection('Friends');
    
    const snapshot = await query.get();

    return snapshot.docs.map(doc => doc.get('username'));
  }

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
    max-width: 60%;
    min-height: 60%;
    margin: 10% auto;
    background-color: #f8f8f8;
  }

  .friend-tab {
    background-color: #ffe66d;
    width: 30vw;
    height: 15vh;
    border: none;
    border-radius: 4px;
    font-size: 2em;
    outline: none;
    cursor: pointer;
    align-self: center;
    margin-top: 24px;
  }

  .friend-tab:hover {
    border: 4px solid black;
  }

  .random {
    background-color: #ff9e6d;
  }
</style>