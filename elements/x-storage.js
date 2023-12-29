(function (){

    console.log('x-storage');

    const list_key = 'valentemesmo-todo-list';

    class XStorage extends HTMLElement{

        save(value) {
            localStorage.setItem(list_key, JSON.stringify(value));
        }

        load(){
            const value = localStorage.getItem(list_key);

            if(value){
                return JSON.parse(value);
            }

            return null;
        }
    }

    customElements.define('x-storage', XStorage);
})();
