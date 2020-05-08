<script>
	import router from "page"
	import mainpage from './mainPage/MainPage.svelte'
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte"
	import landingPage from './landingPage/landingPage.svelte'
<<<<<<< HEAD
	import userprofile from "./UserProfile/userprofile.svelte";
<<<<<<< HEAD
	import resources from './resources/resources.svelte'
=======
	import userprofileEdit from "./UserProfile/userprofile-edit.svelte";
>>>>>>> userprofile
=======
	import userprofile from "./UserProfile/userprofile.svelte"
	import resources from './resources/resources.svelte'
	import aboutUs from './aboutUs/aboutUs.svelte';
>>>>>>> e61e6c27ece043a8d6a0020f6ea7907e8b00f252

    let page;
    let params;

	router('/mainpage', () => page = mainpage);
	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);
	router('/landing', () => page = landingPage);
	router('/userprofile', () => page = userprofile);
<<<<<<< HEAD
	router('/resources', () => page = resources);
<<<<<<< HEAD
=======
	router('/userprofileEdit', () => page = userprofileEdit);
>>>>>>> userprofile
=======
	router('/aboutus', () => page = aboutUs);
>>>>>>> e61e6c27ece043a8d6a0020f6ea7907e8b00f252
    router.start();
</script>

<svelte:component this={page} params={params} />