class _Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data){
        const node = new _Node(data);

        if(this.first === null) {
            this.first = node;
        }

        if(this.last){
            this.last.next = node;
        }
        this.last = node;
    }

    dequeue() {
        if(this.first === null) {
            return;
        }

        const node = this.first;
        this.first = this.first.next;

        if(node === this.last) {
            this.last = null;
        }
        return node.value;
    }
}

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    inOrder(values=[]) {
        if (this.left) {
            values = this.left.inOrder(values);
        }
        values.push(this.value);

        if (this.right) {
            values = this.right.inOrder(values);
        }
        return values;
    }

    preOrder(values=[]) {
        values.push(this.value);

        if (this.left) {
            values = this.left.preOrder(values);
        }

        if (this.right) {
            values = this.right.preOrder(values);
        }
        return values;
    }

    postOrder(values=[]) {
        if (this.left) {
            values = this.left.postOrder(values);
        }

        if (this.right) {
            values = this.right.postOrder(values);
        }

        values.push(this.value);

        return values;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    _findMax(){
        if(!this.right){
            return this;
        }
        return this.right._findMax();
    }

    // nextInCommand( values = []){
    //     const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    //     const node = this.key;
    //     queue.enqueue(node);
    //     while (queue.length) {
    //         const node = queue.dequeue(); //remove from the queue
    //         values.push(node); // add that value from the queue to an array
    
    //         if (this.left) {
    //             queue.enqueue(this.left); //add left child to the queue
    //         }
    
    //         if (this.right) {
    //             queue.enqueue(this.right); // add right child to the queue
    //         }
    //     }
    
    //     return values;
    // }
}

bfs = (tree, values = []) => {
    const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    const node = tree.value;
    queue.enqueue(node);
    
    while (queue.length) {
        const node = queue.dequeue(); //remove from the queue
        values.push(node.value); // add that value from the queue to an array

        if (tree.left) {
            queue.enqueue(tree.left); //add left child to the queue
        }

        if (tree.right) {
            queue.enqueue(tree.right); // add right child to the queue
        }
    }

    return values;
}

const biTree = new BinarySearchTree();

biTree.insert(25, 25);
biTree.insert(15, 15);
biTree.insert(50, 50);
biTree.insert(10, 10);
biTree.insert(24, 24);
biTree.insert(35, 35);
biTree.insert(70, 70);
biTree.insert(4, 4);
biTree.insert(12, 12);
biTree.insert(18, 18);
biTree.insert(31, 31);
biTree.insert(44, 44);
biTree.insert(66, 66);
biTree.insert(90, 90);
biTree.insert(22, 22);

// console.log(biTree);
// console.log(biTree.inOrder());
// console.log(biTree.preOrder());
// console.log(biTree.postOrder());

const commandRank = new BinarySearchTree();

commandRank.insert(5, 'Captain Picard');
commandRank.insert(3, 'Commander Riker');
commandRank.insert(4, 'Lt. Cmdr. LaForge');
commandRank.insert(2, 'Lt. Cmdr. Worf');
commandRank.insert(1, 'Lieutenant security-officer');
commandRank.insert(6, 'Commander Data');
commandRank.insert(8, 'Lt. Cmdr. Crusher');
commandRank.insert(7, 'Lieutenant Selar');

//console.log(commandRank);

console.log(bfs(commandRank));