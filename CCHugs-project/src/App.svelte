<script>
	import router from "page"
	import signup from './signup.svelte'
	import login from './login.svelte'
	import Chat from "./chat/Chat.svelte";

    let page;
    let params;


	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);

    router.start();
</script>

<svelte:component this={page} params={params} />