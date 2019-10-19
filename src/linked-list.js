const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null; //link first node
        this._tail = null;  //link last node
        this.length = 0;    //list length node
    }

    append(data) {
        const currentNode = new Node(data);
        if (this.length) {
            this._tail.next = currentNode;
            currentNode.previous = this._tail;
            this._tail = currentNode;
        } else {
            this._head = currentNode;
            this._tail = currentNode; 
        }
        this.length += 1;
        return this;
    }

    head() {
        return (this._head && this._head.data);
    }

    tail() {
        return (this._tail && this._tail.data);
    }

    at(index) {
        let indexNode = this._head;

        for (let i = 0; i < index; i += 1) {
            indexNode = indexNode.next;
        }
        return indexNode.data;
    }

    insertAt(index, data) {
        const currentNode = new Node(data);
        
        let current = this._head;
        let i = 1;
        
        if (this.length === 0){
            return this.append(data);
        }
        if (index === 0){
            this._head.previous = currentNode;
            currentNode.next = this._head;
            this._head = currentNode;
        } else {
            while (current){
                current = current.next;
                if (i === index) {
                    currentNode.previous = current.previous;
                    current.previous.next = currentNode;
                    currentNode.next = current;
                    current.previous = currentNode;
                    break;
                }
                i += 1;
            }
        }
        this.length += 1;
    }

    isEmpty() {
        if (this.length) {
            return false;
        }
        return true;
    }

    clear() {
        this._tail = null;
		this._head = null;
		this.length = 0;
		return this;
    }

    deleteAt(index) {
        if (this.length === 1 && !index) {
            this._head = null;
            this._tail = null;
            this.length = 0;
            return this;
        }

        let deletedNode = this._head;
        for (let i = 0; i < index; i += 1) {
            deletedNode = deletedNode.next;
        }

        if (index === 0) {
            deletedNode.next.previous = null;
            this._head = deletedNode.next;
        } 
        
        if (index === this.length) {
            deletedNode.previous.next = null;
            this._tail = deletedNode.previous;
        } else {
            deletedNode.previous.next = deletedNode.next;
            deletedNode.next.previous = deletedNode.previous;
        }

        deletedNode = null;
        return this.length -= 1;
    }

    reverse() {
        let current = this._head;
        let previous = null;
        
        while (current) {
            let next = current.next;
            current.next = previous;
            current.previous = next;
            previous = current;
            current = next;
        }

        this._tail = this._head;
        this._head = previous;
        return this;
    }

    indexOf(data) {
        let curNode = this._head;
        let i = 0;
        while (i < this.length) {
            if (curNode.data === data) {
                return i;
            } else {
                curNode = curNode.next;
                i += 1;
            }
        }
        return -1;
    }
}

module.exports = LinkedList;