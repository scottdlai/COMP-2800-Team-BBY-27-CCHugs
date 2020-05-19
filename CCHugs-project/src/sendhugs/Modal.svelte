<script>
  import { firestore } from '../Firebase.js';
  
  export let show = true;
  export let uid;

  let friendsPromise = getFriends();

  async function getFriends() {
    const query = firestore
      .collection('Users')
      .doc(uid)
      .collection('Friends');
    
    const snapshot = await query.get();

    return snapshot.docs.map(doc => doc.get('username'));
  }

</script>

<main>
  {#if show}
    <div id="container" on:click|self={event => show = false}>
      <div id="modal">
        {#await friendsPromise then friends}
          {#each friends as friend}
            <button>{friend}</button>
          {:else}
            <h3>You currently have no friends :(</h3>          
          {/each}
        {/await}
      </div>
    </div>
  {/if}
</main>

<style>
  #container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }

  #modal {
    padding: 16px;
    border-radius: 4px;
    max-width: 50%;
    margin: 20% auto;
    text-align: center;
    background-color: #f8f8f8;
  }
</style>