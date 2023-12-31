(function(){

    console.log('todo-list registered');


    class TodoList extends HTMLElement{

        connectedCallback(){
            if(this.shadowRoot){
                return;
            }

            this.attachShadow({mode:"open"});

            const content = document.createElement('div');
            content.setAttribute('id','content');
            this.shadowRoot.appendChild(content);
        }
        
        update = function () { console.warn('todo-list update handler not set'); };

        setItems(items){
            const context = this;
            this.connectedCallback();

            const content = this.shadowRoot.getElementById('content');
            content.innerHTML='';

            const ul = document.createElement('ul');

            items.forEach(f=>{

                const li = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.setAttribute('type','checkbox');
                if(f.done){
                    checkbox.setAttribute('checked', '');
                }
                checkbox.onchange = function (e){
                    f.done = e.target.checked;
                    context.update(items);
                };
                li.appendChild(checkbox);

                const span = document.createElement('span');
                span.textContent = f.title;
                li.appendChild(span);

                const remove_btn = document.createElement('span');
                remove_btn.onclick = function(){
                    const index = items.indexOf(f);
                    if(index > -1){
                        items.splice(index, 1);
                        context.update(items);

                        context.setItems(items);
                    }
                }
                remove_btn.textContent = '-x-';
                li.appendChild(remove_btn);

                ul.appendChild(li);
            });

            content.appendChild(ul);
        }
    }

    customElements.define('todo-list', TodoList);
})();
