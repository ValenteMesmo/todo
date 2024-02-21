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
                        f.streakBegin = new Date(new Date(f.streakBegin).toDateString());
                    }

                    if(f.streakEnd){
                        f.streakEnd = new Date(new Date(f.streakEnd).toDateString());
                    }

                    f.count = Number(f.count);
                    if(isNaN(f.count)) {
                        f.count = 0;
                    }

                    if(!f.streakBegin){
                        f.streakEnd = null;
                        return;
                    }

                    if(!f.streakEnd) {
                        return;
                    }
                    
                    const streakHours = 
                        (new Date() - f.streakEnd) / (1000 * 60 * 60); 

                    if(streakHours > 24) {
                        f.streakBegin = f.streakEnd = null;
                        f.count = 0;
                    }
                });

                return result; 
            }

            return [];
        }
    }

    customElements.define('x-storage', XStorage);
})();
