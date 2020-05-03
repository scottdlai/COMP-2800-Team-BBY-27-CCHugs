<script>
  import Navbar from '../components/Navbar.svelte'
  import Sidebar from './sidebar/Sidebar.svelte';
  import Content from './main/Content.svelte';

  const users = [
    {username: 'Jenny', id: '0'},
    {username: 'Claire', id: '1'},
    {username: 'Maria', id: '2'}
  ];

  const currentUser = {
    username: 'currentUser',
    id: '69'
  }

  const conversations = [
    {
      participants: [
        users[0],
        currentUser
      ],
      messages: [
        { content: 'Hi there', author: users[0], id: '0' },
        { content: 'Hello!', author: currentUser, id: '1' }
      ]
    },
    {
      participants: [
        users[1],
        currentUser
      ],
      messages: [
        { content: 'Bonjour!', author: users[1], id: '2' },
        { content: 'Comment ca va?', author: currentUser, id: '3' },
        { content: 'Bonjour!', author: users[1], id: '4' },
        { content: 'Comment ca va?', author: currentUser, id: '5' },
        { content: 'Bonjour!', author: users[1], id: '6' },
        { content: 'Comment ca va?', author: currentUser, id: '7' },
        { content: 'Bonjour!', author: users[1], id: '8' },
        { content: 'Comment ca va?', author: currentUser, id: '9' }
      ]
    },
    {
      participants: [
        users[2],
        currentUser
      ],
      messages: [

      ]
    }
  ];

  let activeUser = users[0];

  let activeConversation = getConversationWith(activeUser);

  function getConversationWith(user) {

    for (const conversation of conversations) {
      if (conversation.participants.includes(user)) {
        return conversation;
      }
    }

    return {
      participants: [
        user,
        currentUser
      ],
      messages: [

      ]
    };
  }

  /**
   * Updates the conversation shown on the windows. 
   */
  function updateConversation(event) {
    activeUser = event.detail;
    activeConversation = getConversationWith(activeUser);
  }

</script>

<main>
  <Navbar />
  <Sidebar users={users} bind:activeUser={activeUser} 
    on:updateActiveUser={updateConversation}/>
  <Content currentUser={currentUser} bind:conversation={activeConversation}/>
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