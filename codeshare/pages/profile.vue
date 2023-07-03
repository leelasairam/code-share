<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const {$auth:auth, $signOut:signOut} = useNuxtApp();
    const UserInfo = ref({});
    const user = auth.currentUser;
    if(user){
        UserInfo.value = user;
    }
    else{
        //console.log('Not signed in')
    }

    function LogOut(){
        signOut(auth)
        .then(() => {
            ElNotification({
                title: 'Done',
                message: h('i', { style: 'color: teal' }, 'Logout successfully'),
            })
        })
        .catch((error) => {
            ElNotification({
                title: 'error',
                message: h('i', { style: 'color: red' }, error),
            })
        });
        localStorage.setItem("IsLoggedIn", false);
        navigateTo('/login');
    }
</script>

<template>
    <el-card class="box-card">
        <div>
            
            <el-avatar :size="80" :src="UserInfo.photoURL" />
            <p>Logged in as <strong>{{ UserInfo.displayName }}</strong></p>
            <p>Email : {{ UserInfo.email }}</p>
            <el-button @click="LogOut" type="danger">LogOut</el-button>
        </div>
    </el-card>
</template>