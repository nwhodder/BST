
// Requires \\

const express = require("express");
const path = require("path");
const treeify = require("treeify");

const theport = 4009; //  Setup port

const app = express(); // Express app setup


/*\ MIddleWare \*/

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'BST.html'))
});

app.post("/", async function(req, res) {
    nums = await req.body.numbers
    num_list = JSON.parse(nums)
    console.log(num_list);
    const oak = new Tree();
    try{
        for (let n = 0; n < num_list.length; n++) {
            oak.insert(num_list[n]);
        }
    }catch{
        console.error("Me no work >:(")
    }
    console.log(treeify.asTree(oak, true));
    res.send(`<pre>${treeify.asTree(oak, true)}</pre>`)
})

app.use(express.static(path.join(__dirname, '/')));


/*\ BST Functionality \*/

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor() {
        this.root = null
    }
    insert(value) {
        const recursion = (node) => {
            if(node === null) {
                return new Node(value);
            }else if(value < node.value) {
                node.left = recursion(node.left);
            }else if(value > node.value) {
                node.right = recursion(node.right);
            }else{
                throw new Error("Cannot be equal, try again please!")
            }
            
            if(nodeBalance(node) > 1) {
                return nodeRotateLeft(node);
            }else if(nodeBalance < -1) {
                return nodeRotateRight(node);
            }else{
                return node;
            }
        }
        this.root = recursion(this.root);
        }
            search(value){
            const recursiveSearch = (node) => {
                if(node === null) {
                    return false;
                }else if(value < node.value){
                    return recursiveSearch(node.left);
                }else if (value > node.value){
                    return recursiveSearch(node.right);
                }else{
                    return true;
                }
            }
            return recursiveSearch(this.root)
        }
    }
    function nodeHeight(node){
        if(node === null) {
            return -1;
        }else if(node.left === null && node.right === null){
            return 0;
        }else{
            return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right));
        }
        
    }
    function nodeBalance(node){
        return nodeHeight(node.right) - nodeHeight(node.left);
    }
    function nodeRotateLeft(node){
        if(node === null || node.right === null){
            return node;
        }
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }
    function nodeRotateRight(node){
        if(node === null || node.left === null){
            return node;
        }
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
};


// Port/Exports \\

app.listen(theport, () => {
  console.log(`Listened at http://localhost:${theport}`)
});

module.exports = {
    Node,
    Tree
}