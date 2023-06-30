<script setup>
    definePageMeta({
        middleware: 'auth'
    })
    const{$firestore:db, $collection:collection, $query:query, $where:where, $getDocs:getDocs, $auth:auth} = useNuxtApp();
    const codes = [];

    const citiesRef = collection(db, "codes");
    const q = query(citiesRef, where("createdby", "==", `${auth.currentUser.uid}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let [data,id] = [doc.data(),doc.id];
        codes.push({...data,id});
    });
    //console.log(codes)
</script>

<template>
   <template v-for="i in codes" :key="i.id">
        <div class="snippets">
            <NuxtLink class="title" :to="`/mysnippets/${i.id}`">{{ i.title }}</NuxtLink>
            <p>{{ i.createdate }}</p>
        </div>
   </template>
</template>

<style scoped>
.title{
    color: rgb(58, 58, 184);
    font-weight: 600;
    text-decoration: none;
}

.snippets{
    background-color: #e9e9e7;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 12px;
}

</style>