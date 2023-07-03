<script setup>
    definePageMeta({
        middleware: 'auth'
    })

    const{$firestore:db, $doc:doc,$getDoc:getDoc, $updateDoc:updateDoc, $auth:auth} = useNuxtApp();
    const {id} = useRoute().params;
    //console.log(id);
    const accessuser = ref();
    const accessusers = ref([]);

    const docRef = doc(db, "codes", `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        if(docSnap.data().createdby!=`${auth.currentUser.uid}`){
            navigateTo('/');
        }
        accessusers.value = [...docSnap.data().write_access];
    } else {
        alert("No such document!");
        
    }
    const title = docSnap.data().title;
    const codeitems = ref([]);
    codeitems.value = docSnap.data().codeitems;

    const AllLangs = ['javascript','apex','typescript','java','python','html','css','c','cpp','csharp','php','rust','markdown','kotlin','perl','powershell','ruby','sql','json','graphql','go','swift','dart','vb','xml','yaml','plaintext'];
    AllLangs.sort();

    const newcodes = ref([{id:null,title:null,code:null,language:null}]);
    const count = ref(0);
    let rowid = ref(0);
    rowid.value = codeitems.value.length;
    function AddNewInstance(){
        newcodes.value.push({id:rowid.value++,title:null,code:null,language:null})
        count.value++;
    }

    async function UpdateCode(){
        if(newcodes){
            codeitems.value = [...codeitems.value,...newcodes.value.slice(1)];
        }
        const UpdateRef = doc(db, "codes", `${id}`);
        await updateDoc(UpdateRef, {
            codeitems: codeitems.value,
            write_access: accessusers.value
        })
        count.value = 0;
        navigateTo(`/mysnippets/${id}`)
    }


    function AddAccessUsers(){
        accessusers.value.push(accessuser.value);
        accessuser.value = ''
    }

    function RemoveAccessUsers(email){
        const t = accessusers.value.filter((e)=>e!=email);
        accessusers.value = [...t];
    }

    function DeleteItem(id){
        codeitems.value = codeitems.value.filter((i)=>i.id!=id)
    }
    
</script>

<template>

<div><br/>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span><strong>Manage Access</strong></span>
                </div>
            </template>
            <form @submit.prevent="AddAccessUsers">
                <input type="email" class="access" v-model="accessuser" placeholder="Email address"/>
                <button type="submit" size="small">Add</button>
            </form>
            <div id="tags">
                <el-tag v-for="tag in accessusers" :key="tag" class="mx-1" closable :disable-transitions="false" @close="RemoveAccessUsers(tag)">{{ tag }}</el-tag>
            </div>
        </el-card>
    </div><br/>
    
    <label for="title">Title : </label>
    <input name="title" id="inp" v-model="title"/>
    <template v-for="i in codeitems" :key="i.id">
        <p><strong>{{ i.title }}</strong> <span><el-button @click="DeleteItem(i.id)" type="danger" link>Delete</el-button></span></p>
        <MonacoEditor :options="{ theme: 'vs-dark' }" class="editor" v-model="i.code" :lang="i.language" />
    </template>

    <template v-for="k in count">
        <el-card class="box-card card1">
            <div class="AllCodes">
                <div class="inp-content">
                    <label for="lang">SELECT LANGUAGE : </label>
                    <select name="lang" v-model="newcodes[k].language">
                        <option v-for="i in AllLangs" :value="i">{{ i }}</option>
                    </select>
                    <input class="title"  placeholder="Code title" v-model="newcodes[k].title" />
                    <MonacoEditor :options="{ theme: 'vs-dark' }" class="editor" v-model="newcodes[k].code" :lang="newcodes[k].language" />
                </div>
            </div>
        </el-card>
    </template><br/>

    <el-button type="warning" @click="AddNewInstance">+ Add File</el-button>
    <el-button type="primary" @click="UpdateCode">Save</el-button>
    
</template>

<style scoped>
.editor{
    margin-top: 0.4rem;
    width: 800px;
    height: 400px;
}

#inp{
    margin-top: 0.4rem;
}

.access{
    margin-right: 0.4rem;
}

#tags{
    margin-top: 0.4rem;
}

.title{
    margin-left: 0.4rem;
}

p span{
    margin-left: 1rem;
}

p span a{
    color: brown;
}

.card-header{
    color: blue;
}
</style>