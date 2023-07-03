<script setup>
    const{$firestore:db, $doc:doc, $getDoc:getDoc, $auth:auth, $deleteDoc:deleteDoc} = useNuxtApp();
    const {$Prism:Prism} = useNuxtApp();
    const {id} = useRoute().params;
    const docRef = doc(db, "codes", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        //accessusers.value = docSnap.data().write_access;
    } else {
        ElNotification({
            title: 'Error',
            message: h('i', { style: 'color: teal' }, 'No such doc'),
        })
    }

    onMounted(()=>{
        Prism.highlightAll()
    })

    function NavToEdit(){
        if(auth.currentUser){
            if(docSnap.data().createdby === `${auth.currentUser.uid}` || docSnap.data().write_access.includes(`${auth.currentUser.email}`)){
                navigateTo(`/mysnippets/${id}/edit`)
            }
            else{
                alert('You do not have access to edit this snippet.')
            }
        }
        else{
            alert('You do not have access to edit this snippet. Please login to check access.')
        }
    }

    async function Delete(){
        if(docSnap.data().createdby === `${auth.currentUser.uid}`){
            try{
                await deleteDoc(doc(db, "codes", `${id}`));
                navigateTo('/mysnippets')
            }
            catch(error){
                alert(error)
            }
        }
        else{
            alert('You do not have access to delete this snippet.')
        }
    }

</script>

<template>
    <div id="login" v-if="!auth.currentUser">
        <el-button @click="navigateTo('/login')" id="login-btn" type="primary">LogIn</el-button>
    </div>
    <span><strong id="title">{{ docSnap.data().title }}</strong></span>
    <p>[{{ docSnap.data().createdate }}]</p>
    <div id="actions">
        <button @click="NavToEdit"  class="action-item">Edit</button>
        <button type="danger" @click="Delete" class="action-item">Delete</button>
    </div>
   <template v-for="i in docSnap.data().codeitems" :key="i.id">
        <h4><el-tag class="tag">{{ i.title }}</el-tag></h4>
        <pre><code :class="'language-'+i.language">{{ i.code }}</code></pre>
   </template>
</template>

<style scoped>
#title{
    font-size:xx-large;
}

.tag{
    font-size: large;
}

.action-item{
    margin-right: 0.5rem;
    text-decoration: none;
}

#actions{
    margin: 0.4rem;
}

.access{
    width: 250px;
    margin-right: 0.5rem;
}

#login{
    padding: 0.5rem;
    margin-bottom: 1.6rem;
}

#login-btn{
    float: right;
}



</style>