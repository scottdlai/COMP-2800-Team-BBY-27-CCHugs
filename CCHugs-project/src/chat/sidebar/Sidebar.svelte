<script>
  import { createEventDispatcher } from 'svelte';
  import UserTab from './UserTab.svelte';

  export let users = [];
  export let activeUser = users[0];

  let dispatch = createEventDispatcher();

  function updateActive(user) {

    dispatch('updateActiveUser', user);
  }

</script>

<main>
  {#each users as user (user.id)}
    <UserTab user={user} isActive={user === activeUser} 
    on:click={() => updateActive(user)}/>
  {/each}
</main>

<style>
  main {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    border-radius: 4px;
    border: 2px solid black;
    border-left: none;
    border-top: none;
  }
</style>