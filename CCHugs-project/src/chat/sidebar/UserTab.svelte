<script>
  import { firestore } from '../../Firebase.js';
  export let userID;

  let userPromise = getUser();

  /**
   * Gets information of conversation partner from the database and returns the
   * Promise of that information.
   * 
   * @returns {Promise} of patner's information 
   */
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
  <div class="user-tab" on:click>
    {user.username}
  </div>
{/await}

<style>
  .user-tab {
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    width: 80vw;
    height: 15vh;
    font-size: 2em;
    outline: none;
    cursor: pointer;
  }
</style>