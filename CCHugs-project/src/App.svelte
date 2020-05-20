<script>
  import router from "page";
  import { authState } from "rxfire/auth";
  import { auth } from "./Firebase.js";
	import mainpage from './mainPage/MainPage.svelte'
	import signup from './signup-login/signup.svelte'
	import login from './signup-login/login.svelte'
	import Chat from "./chat/Chat.svelte"
	import landingPage from './landingPage/landingPage.svelte'
	import userprofile from "./UserProfile/userprofile.svelte";
	import userprofileEdit from "./UserProfile/userprofile-edit.svelte";
	import resources from './resources/resources.svelte';
	import aboutUs from './aboutUs/aboutUs.svelte';
	import friendAtt from "./friends/FriendAtt.svelte";
	import friends from "./friends/FriendList.svelte"
  import editdisplaypicture from "./Userprofile/pictures.svelte";
  import feedback from "./feedback/feedback.svelte";
  import checkhugs from "./checkhugs/checkhugs.svelte";
  import SendHugs from './sendhugs/SendHugs.svelte';
  //Test
  import Header from './components/Header.svelte';
  
  let page;
  let params;

  const unsubcribe = authState(auth).subscribe(user => {
    params = user;
  });
  
  //test
  router("/header", () => (page = Header));

  router("/mainpage", () => (page = mainpage));
  router("/signup", () => (page = signup));
  router("/login", () => (page = login));
  router("/chat", () => (page = Chat));
  router("/", () => (page = landingPage));
  router("/userprofile", () => (page = userprofile));
  router("/resources", () => (page = resources));
  router("/userprofileEdit", () => (page = userprofileEdit));
  router("/aboutus", () => (page = aboutUs));
  router("/att", () => (page = friendAtt));
  router("/friends", () => (page = friends));
  router("/feedback", () => (page = feedback))
  router("/checkhugs", () => (page = checkhugs));
  router('/displaypicture', () => page = editdisplaypicture);
  router('/sendhugs', () => page = SendHugs);
  router.start();
</script>

{#if params}
  <svelte:component this={page} uid={params.uid} />
{:else}
  <svelte:component this={page} />
{/if}
