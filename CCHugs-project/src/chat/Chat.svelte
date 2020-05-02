<script>
  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  let users = [
    {username: 'Jenny', id: 0},
    {username: 'Claire', id: 1}
  ];

  let conversations = [
    [
      { message: 'Hi there', sender: 'Jenny', reciever: 'currentUser', id: '0' },
      { message: 'Hello!', sender: 'currentUser', reciever: 'Jenny', id: '1' }
    ],
    [
      { message: 'Good Morning', sender: 'Claire', reciever: 'currentUser', id: '0' },
      { message: 'Bonjour!', sender: 'currentUser', reciever: 'Claire', id: '1' }
    ]
  ];

  let activeUser = users[1];

  let activeConversation = getConversationWith(activeUser);

  function getConversationWith(user) {
    for (let i = 0; i < conversations.length; i++) {
      let text = conversations[i][0];

      if (user.username === text.sender || user.username === text.reciever) {
        return conversations[i];
      }
    }
  }

  $: activeConversation = getConversationWith(activeUser);
</script>

<main>
  <Navbar />
  <Sidebar users={users} bind:activeUser={activeUser}/>
  <Content conversation={activeConversation}/>
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