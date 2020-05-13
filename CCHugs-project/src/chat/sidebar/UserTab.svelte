<script>
  import { firestore } from '../../Firebase.js';
  export let userID;
  export let isActive = false;

  let userPromise = getUser();

  async function getUser() {
    const query = firestore.collection('Users').doc(userID);

    const userDoc = await query.get();

    return {
      username: userDoc.get('username'),
      id: userDoc.id
    };
  }
</script>

{#await userPromise then user}
  <main class:active={isActive} on:click>
    <h3>{user.username}</h3>
  </main>
{/await}

<style>
  .active {
    background-color: #ff9e6d;
  }

  main {
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
  }
</style>