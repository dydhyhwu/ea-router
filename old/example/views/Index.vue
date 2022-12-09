<template>
    <div>index 页面</div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { Redirect } from '../../old/src';

export default
@Component
@Redirect('/about')
class Index extends Vue {
}
</script>

<style scoped>

</style>
