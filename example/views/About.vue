<template>
    <div>about</div>
</template>

<script lang='js'>
import { Vue, Component } from 'vue-property-decorator';
import { RedirectByName} from '../../src';

export default
@Component
@RedirectByName('test')
class About extends Vue {
}
</script>
