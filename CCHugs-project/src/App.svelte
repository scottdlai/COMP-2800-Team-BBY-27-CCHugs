<script>
	import router from "page"
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte"
	import landingPage from './landingPage/landingPage.svelte'

    let page;
    let params;


	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);
	router('/landing', () => page = landingPage);

    router.start();
</script>

<svelte:component this={page} params={params} />