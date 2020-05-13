<script>
	import router from "page"
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte";
	import userprofile from "./UserProfile/userprofile.svelte";
	import userprofileEdit from "./UserProfile/userprofile-edit.svelte";
	import editdisplaypicture from "./Userprofile/pictures.svelte";

    let page;
    let params;


	router('/signup',() => page = signup);
	router('/login',() => page = login);
	router('/chat', () => page = Chat);
	router('/userprofile', () => page = userprofile);
	router('/userprofileEdit', () => page = userprofileEdit);
	router('/displaypicture', () => page = editdisplaypicture);
    router.start();
</script>

<svelte:component this={page} params={params} />