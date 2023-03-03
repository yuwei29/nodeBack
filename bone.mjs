import {createHash} from 'crypto'
let sha256=x=>createHash('sha256').update(x).digest('hex')
let book=new Map();
let bookToc=[]
function addArticle(title,article){
    bookToc.push(title)
    book.set(title,article)
}
const auth=['1a3f0617d6de8e52b118615b380a998dcf5b35642b485c26a44d2fc3e87a50ba',
'a621ab606db2a11f63edc576a729843b8269250dc324206871d90635ac5e531c'];
function isAdmin(username,password){
    return (sha256(username)==auth[0] && sha256(password)==auth[1])
}
export {isAdmin,book,bookToc,addArticle};