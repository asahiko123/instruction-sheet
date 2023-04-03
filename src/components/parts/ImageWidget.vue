<template>
    <div class="upload">                  
        <img :src="widget.image" v-bind:value="widget.image" style="max-width: 50%">                  
        <input type="file" @change="upload($event,widget)" />
    </div>
</template>

<script>


export default{
    props:[
        "widget"
    ],
    method:{
        upload(e,widget){
            let image = e.target.files[0]
            let reader = new FileReader(image)

            reader.readAsDataURL(image)
            reader.onload = (e) => {
                let imageData = e.target.result
                widget.image = imageData
            }
        }
    }
}
</script>

<style scoped lang="scss">

.upload{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>