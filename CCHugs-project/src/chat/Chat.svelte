<script>
  import Sidebar from './sidebar/Sidebar.svelte';
  let users = [
    {username: 'Jenny', id: 0},
    {username: 'Claire', id: 1}
  ];

</script>

<main>
  <Sidebar users={users} />
</main>

<style>

</style>