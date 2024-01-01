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

                const checked = 
                    f.streakEnd 
                    && f.streakEnd.toLocaleDateString() == new Date().toLocaleDateString();

                checkbox.setAttribute('type','checkbox');
                if(checked){
                    checkbox.setAttribute('checked', '');
                }

                checkbox.onchange = function (e){
                    if(e.target.checked){
                        if(f.streakBegin){
                            f.streakEnd = new Date(); 
                        }
                        else {
                            f.streakEnd = f.streakBegin = new Date();
                        }
                    }
                    else {
                        f.streakEnd = null;
                    }
                    context.update(items);
                };
                li.appendChild(checkbox);

                const span = document.createElement('span');
                span.textContent = f.type == 1 ? `🔁${f.title}`: f.title;
                li.appendChild(span);

                if(f.streakEnd){ 
                    const streak_count = document.createElement('span');
                    streak_count.textContent = Math.ceil((f.streakEnd - f.streakBegin) / (1000 * 60 * 60 * 24)) + checked;
                    li.appendChild(streak_count);
                }

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
