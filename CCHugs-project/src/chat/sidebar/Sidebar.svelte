<script>
  import UserTab from './UserTab.svelte';
  export let users = [];
</script>

<main>
  {#each users as user (user.id)}
    <UserTab user={user} />
  {/each}
</main>

<style>

</style>