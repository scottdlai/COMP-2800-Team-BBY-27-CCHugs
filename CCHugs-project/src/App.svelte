<script>
	import router from "page"
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte";
	import userprofile from "./UserProfile/userprofile.svelte";

    let page;
    let params;


	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);
	router('/userprofile', () => page = userprofile);
    router.start();
</script>

<svelte:component this={page} params={params} />