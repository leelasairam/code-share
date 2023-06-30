<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const title = ref('');
    const{$collection:collection, $addDoc:addDoc, $firestore, $auth:auth} = useNuxtApp();
    const db = $firestore;
    const AllLangs = ['javascript','apex','typescript','java','python','html','css','c','cpp','csharp','php','rust','markdown','kotlin','perl','powershell','ruby','sql','json','graphql','go','swift','dart','vb','xml','yaml','plaintext'];
    AllLangs.sort();
    //const Document = [`${auth.currentUser}`,`${new Date().toString().slice(0,24)}`,write_access:[]];
    const count = ref(0)
    const id = ref(1)
    const codes = ref([{id:null,title:null,code:null,language:null}])

    function AddInstance(){
        if(count.value<=9 && title.value){
            codes.value.push({id:id.value++,title:null,code:null,language:null})
            count.value++;
        }
        else{
            alert(title.value==='' ? 'Please give the titile' : 'You add upto 10 files only')
        }
    }

   async function CreateCode(){
        const codes1 = codes.value.slice(1);
        //console.log(codes1);
        const docRef = await addDoc(collection(db, "codes"), {
            title : title.value,
            createdby: `${auth.currentUser.uid}`,
            createdate: `${new Date().toString().slice(0,24)}`,
            write_access : [],
            codeitems:[...codes1],
        });
        location.reload();
        //console.log("Document written with ID: ", docRef.id);
    }
</script>

<template>
    
    <template v-for="k in count">
        <el-card class="box-card card1">
            <div class="AllCodes">
                <div class="inp-content">
                    <label for="lang">SELECT LANGUAGE : </label>
                    <select name="lang" v-model="codes[k].language">
                        <option v-for="i in AllLangs" :value="i">{{ i }}</option>
                    </select>
                    <input  placeholder="file name" v-model="codes[k].title" />
                    <MonacoEditor :options="{ theme: 'vs-dark' }" class="editor" v-model="codes[k].code" :lang="codes[k].language" />
                </div>
            </div>
        </el-card>
    </template>

    <div id="actions">
        <p v-if="codes.length<=1">Give the title and click "+ Add File" to start adding files.</p>
        <label v-if="codes.length<=1" for="title">Enter title : </label>
        <input name="title" v-if="codes.length<=1" v-model="title" placeholder="Async/Await in javascript" />
        <el-button type="warning" @click="AddInstance">+ Add File</el-button>
        <el-button v-if="codes.length>1" type="primary" @click="CreateCode">Save</el-button>
    </div>

</template>

<style scoped>
.card1{
    margin: 0.5rem;
}
.inp-content{
    padding: 0.5rem;
}
.inp-content input{
    margin-left: 0.5rem;
    width: 200px;
}
#lang select{
    height: 25px;
    width: 200px;
    background-color: #2D4356;
    color: white;
}

#lang label{
    font-weight: 600;
}
.editor{
    margin-top: 0.4rem;
    width: 800px;
    height: 400px;
}

#actions{
    text-align: center;
    margin: 0.4rem;
}

#actions input{
    margin-right: 0.4rem;
}
</style>