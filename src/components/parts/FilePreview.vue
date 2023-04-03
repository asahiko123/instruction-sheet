<template>
    <div class="">
        <img :src="file" style="max-width: 50%">
    </div>
</template>

<script>
import store from '../../store';


export default{
    computed:{
        file(){
            return store.state.filePreview;
        }
    }
}
</script>