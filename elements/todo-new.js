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
            input.setAttribute('type', 'text');
            input.onkeyup = function (e) {
                if(e.key == 'Enter'){
                    context.onsave(input.value);
                    input.value = '';
                    e.preventDefault();
                }
            };

            content.appendChild(input);
            this.shadowRoot.appendChild(content);
        }

        onsave = function(){ console.warn('onsave not set'); };
    }

    customElements.define('todo-new', TodoNew);
})();
