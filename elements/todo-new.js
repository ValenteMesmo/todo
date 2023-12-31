(function(){
    class TodoNew extends HTMLElement{

        connectedCallback(){
            if(this.shadowRoot){
                return;
            }

            const context = this;

            this.attachShadow({mode:'open'});

            const content = document.createElement('div');
            const input = document.createElement('input');
            const type_select = document.createElement('select');
            input.setAttribute('type', 'text');
            input.onkeyup = function (e) {
                if(e.key == 'Enter'){
                    context.onsave({ title: input.value, type: type_select.value});
                    input.value = '';
                    e.preventDefault();
                }
            };

            ['one-time', 'daily'].forEach((f,i)=>{
                const option = document.createElement('option');
                option.textContent = f;
                option.setAttribute('value',i);
                type_select.appendChild(option);
            });
            type_select.onkeyup = input.onkeyup;
            content.appendChild(input);
            content.appendChild(type_select);
            this.shadowRoot.appendChild(content);
        }

        onsave = function(){ console.warn('onsave not set'); };
    }

    customElements.define('todo-new', TodoNew);
})();
