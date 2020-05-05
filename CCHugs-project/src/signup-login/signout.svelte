<script>
    import {auth} from "./../Firebase.js";
    import {firestore} from "./../Firebase.js";

    function signout(){
        auth.signOut().then(function() {
            window.location = "./";
        }).catch(function(error) {
        // An error happened.
        }); 
    }

</script>
<style>
button {
	font-family: inherit;
	font-size: inherit;
	padding: 0.4em;
	margin: 0 0 0.5em 0;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 2px;
    }
</style>
<main>
    <button on:click="{signout}">Log out</button>
</main>