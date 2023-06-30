<script setup>
    const {$auth:auth,$signInWithPopup:signInWithPopup,$GoogleAuthProvider:GoogleAuthProvider} = useNuxtApp();
    const provider = new GoogleAuthProvider();
    

    function SignIn(){
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result.user)
        })
        .catch((error) => {
            console.log(error.message)
        });
    }
</script>

<template>
    <div id="content">
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