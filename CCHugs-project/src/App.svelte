<script>
	import router from "page"
	import mainpage from './mainPage/MainPage.svelte'
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte";

    let page;
    let params;

	router('/mainpage', () => page = mainpage);
	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);

    router.start();
</script>

<svelte:component this={page} params={params} />