<template>
  我是主页
</template>

<script>
import {onBeforeMount} from "vue";
import {useRouter} from 'vue-router'
import {loginAuto} from "@/api/admin";

export default {
  name: "IndexPage",
  setup() {
    let $router = useRouter();
    onBeforeMount(async() => {
      if (await loginAuto()) {
        await $router.push('/layout')
      }else{
        await $router.push('/login')
      }
    })
  }
}
</script>

<style scoped>

</style>