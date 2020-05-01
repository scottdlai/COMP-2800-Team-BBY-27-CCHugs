<script>
  import UserTab from './UserTab.svelte';
  export let users = [];
  let activeChat = users[0];

  function updateActive(user) {
    activeChat = user;
  }

</script>

<main>
  {#each users as user (user.id)}
    <UserTab user={user} activeChat={activeChat === user} 
    on:click={() => updateActive(user)}/>
  {/each}
</main>

<style>
  main {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    border-radius: 4px;
    border: 1px solid black;
  }
</style>