import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            memories: [
                { 
                    id: 'item1', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NYCS-bull-trans-1.svg/1024px-NYCS-bull-trans-1.svg.png",
                    title: 'Title of item 1', 
                    description: 'Description of item 1'
                },
                { 
                    id: 'item2', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/NYCS-bull-trans-2.svg/480px-NYCS-bull-trans-2.svg.png",
                    title: 'Title of item 2', 
                    description: 'Description of item 2'
                },
                { 
                    id: 'item3', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NYCS-bull-trans-1.svg/1024px-NYCS-bull-trans-1.svg.png",
                    title: 'Title of item 3', 
                    description: 'Description of item 3'
                },
                { 
                    id: 'item4', 
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/NYCS-bull-trans-4-red.svg/1200px-NYCS-bull-trans-4-red.svg.png",
                    title: 'Title of item 4', 
                    description: 'Description of item 4'
                }
            ],
        };
    },
    getters: {
        memories(state) {
            return state.memories;
        },
        memory(state) {
            return (memoryId) => {
                return state.memories.find((memory) => memory.id == memoryId);
            };
        }
    }
});

export default store;