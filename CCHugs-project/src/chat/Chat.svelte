<script>
  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  let users = [
    {username: 'Jenny', id: 0},
    {username: 'Claire', id: 1}
  ];

</script>

<main>
  <Navbar />
  <Sidebar users={users} />
  <Content />
</main>

<style>
  main {
    display: grid;
    grid-template-rows: 10vh auto;
    grid-template-columns: 25vw auto;
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 0px;
  }
</style>