(function(){

    console.log('todo-item registered');

    const day_in_milliseconds = 24 * 60 * 60 * 1000;

    class TodoItem extends HTMLElement{
        connectedCallback() {
            if(this.shadowRoot){
                return;
            }

            this.attachShadow({mode:'open'}); 

            const frag = document.createDocumentFragment();
            const style = document.createElement('style');
            style.textContent = `
                .delete-button {
                    cursor: pointer;
                    color: lightgray;
                }

                .delete-button:hover {
                    color: red;
                }

                input[type="checkbox"] {
                    width: 3vh;
                    height: 2.4vh;
                }
            `;

            frag.appendChild(style);
            frag.appendChild(document.createElement('div'));

            this.shadowRoot.appendChild(frag);
        }

        update = function (){};
        delete = function (){};

        setItem(item){
            this.connectedCallback();

            const context = this;
            const content = this.shadowRoot.querySelector('div');
            const checked = 
                item.streakEnd 
                && item.streakEnd.toLocaleDateString() == new Date().toLocaleDateString();

            const frag = document.createDocumentFragment();

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            if(checked){
                checkbox.setAttribute('checked', '');
            }
            checkbox.onchange = function (e) {
                if(e.target.checked){
                    if(item.streakBegin){
                        item.streakEnd = new Date();
                    }
                    else {
                        item.streakEnd= item.streakBegin = new Date();
                    }
                    item.count++;
                }
                else {
                    item.streakEnd = null;
                    item.count--;
                }
                context.update(item);
            };
            frag.appendChild(checkbox);

            const span = document.createElement('span');
            span.textContent = item.title;
            frag.appendChild(span);

            if(item.count > 0){
                const streakCount = document.createElement('span');
                streakCount.textContent = 
                    (!!checked ? ' 🔥' : ' ❗') + item.count;
                frag.appendChild(streakCount);
            }

            const editButton = document.createElement('span');
            editButton.textContent = ' 🗑';
            editButton.title = 'delete';
            editButton.className = 'delete-button';
            editButton.onclick = function (){
                if(confirm('delete?') === true){
                    context.delete(item);
                }
            };
            frag.appendChild(editButton);

            content.innerHTML = '';
            content.appendChild(frag);
        }
    }

    customElements.define('todo-item', TodoItem);
})();
