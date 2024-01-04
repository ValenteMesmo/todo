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
                const result = JSON.parse(value);
                result.forEach(f=> {

                    if(f.streakBegin){
                        f.streakBegin = new Date(f.streakBegin);
                    }

                    if(f.streakEnd){
                        f.streakEnd = new Date(f.streakEnd);
                    }

                    if(!f.streakBegin || !f.streakEnd){
                        return;
                    }
                    
                    const streakHours = 
                        (new Date() - f.streakEnd) / (1000 * 60 * 60); 

                    if(streakHours > 72) {
                        f.streakBegin = f.streakEnd = null;
                    }
                });

                return result;
            }

            return null;
        }
    }

    customElements.define('x-storage', XStorage);
})();
