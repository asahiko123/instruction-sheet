
let data = {}

export default class Storage{


    static get data(){
        return data;
    }


    static fetch(){
        const storage = JSON.parse(localStorage.getItem(KEY));
        const isNull = storage == null || storage == undefined

        if(!isNull){
            
        }
    }
}