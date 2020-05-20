
<script>
export let profileName;
</script>

<main>
<div>
<img src="./../hug.png" alt="Here's a hug.">
<h1>{profileName}</h1>
</div>
</main>

<style>
main > * {
    display: flex;
    justify-content: stretch;
    align-items: center;
}

img {
    float: left;
    width: 120px;
    height: 120px;
}

h1 {
    float: right;
    font-family: 'Segoe UI';
            font-size: 200%;
            font-style: italic;
}
</style>