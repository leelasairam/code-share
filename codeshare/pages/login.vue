<script setup>
    const {$auth:auth,$signInWithPopup:signInWithPopup,$GoogleAuthProvider:GoogleAuthProvider} = useNuxtApp();
    const provider = new GoogleAuthProvider();
    

    function SignIn(){
        signInWithPopup(auth, provider)
        .then((result) => {
            localStorage.setItem("IsLoggedIn", true);
            navigateTo('/home');
        })
        .catch((error) => {
            console.log(error.message)
        });
    }
</script>

<template>
    <div id="content">
        <h2>SignIn by clicking below button :</h2>
        <el-button class="el-button" type="success" size="large" round @click="SignIn">Continue With Google</el-button>
    </div>
</template>

<style scoped>
.el-button{
    margin: 1rem;
}

#content{
    text-align: center;
}
</style>