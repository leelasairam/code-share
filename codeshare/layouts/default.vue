<script setup>
    const activeIndex2 = ref('1')
</script>

<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#9DB2BF" text-color="#213555" active-text-color="brown">
        <el-menu-item index="1"><NuxtLink class="link" to="/home">Home</NuxtLink></el-menu-item>
        <el-menu-item index="2"><NuxtLink class="link" to="/mysnippets">Your Snippets</NuxtLink></el-menu-item>
        <el-menu-item index="3"><NuxtLink class="link" to="/profile">Profile</NuxtLink></el-menu-item>
    </el-menu>

    <div>
        <slot />
    </div>
</template>

<style scoped>
.link{
    font-weight: 600;
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>