<template>
    <div>test page</div>
</template>

<script lang='js'>
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';
import { RouteName} from '@lib';

export default
@Component
@RouteName('test')
class TestPage extends Vue {
}
</script>
